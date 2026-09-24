(() => {
  const statusPage = document.querySelector(".status-page");
  if (!statusPage) return;

  const refreshButton = document.querySelector("[data-status-refresh]");
  const overallCard = document.querySelector(".status-overall-card");
  const overallValue = document.querySelector("[data-status-overall]");
  const overallSummary = document.querySelector("[data-status-summary]");
  const checkedValue = document.querySelector("[data-status-checked]");
  const latencyValue = document.querySelector("[data-status-latency]");
  const itemElements = new Map(
    [...document.querySelectorAll("[data-status-item]")].map((element) => [element.dataset.statusItem, element]),
  );

  const routePaths = ["/", "/Pricing", "/settings", "/privacy"];
  const assetPaths = ["/assets/css/styles.css", "/assets/js/script.js"];
  const refreshIntervalMs = 30_000;
  const requestTimeoutMs = 8_000;
  let checkInProgress = false;
  let refreshTimer = 0;
  let lastResults = null;
  let lastCheckedAt = null;

  const currentLanguage = () => (document.documentElement.lang === "en" ? "en" : "ko");
  const translate = (key) => {
    const language = currentLanguage();
    return window.profileTranslations?.[language]?.[key] || window.profileTranslations?.ko?.[key] || key;
  };

  const formatTime = (date) =>
    new Intl.DateTimeFormat(currentLanguage() === "ko" ? "ko-KR" : "en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);

  const formatLatency = (value) => `${Math.max(1, Math.round(value))} ms`;

  const probe = async (path, options = {}) => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), requestTimeoutMs);
    const startedAt = performance.now();
    const url = new URL(path, window.location.origin);
    url.searchParams.set("__status_probe", String(Date.now()));

    try {
      const response = await fetch(url, {
        method: options.method || "HEAD",
        cache: "no-store",
        credentials: "same-origin",
        headers: { "X-Status-Probe": "1" },
        signal: controller.signal,
      });
      const latency = performance.now() - startedAt;
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      if (options.json) {
        const payload = await response.json();
        if (payload?.status !== "operational") throw new Error("Invalid health response");
      }

      return { ok: true, latency };
    } catch (error) {
      return {
        ok: false,
        latency: performance.now() - startedAt,
        reason: error?.name === "AbortError" ? "timeout" : "request",
      };
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const checkGroup = async (paths) => {
    const responses = await Promise.all(paths.map((path) => probe(path)));
    const passed = responses.filter((response) => response.ok).length;
    const successfulLatencies = responses.filter((response) => response.ok).map((response) => response.latency);
    const latency = successfulLatencies.length
      ? successfulLatencies.reduce((total, value) => total + value, 0) / successfulLatencies.length
      : null;

    return {
      state: passed === paths.length ? "operational" : passed > 0 ? "degraded" : "unavailable",
      passed,
      total: paths.length,
      latency,
    };
  };

  const statusLabelKey = (state) => `status.state${state.charAt(0).toUpperCase()}${state.slice(1)}`;

  const renderItem = (name, result) => {
    const element = itemElements.get(name);
    if (!element) return;
    element.dataset.statusState = result.state;
    const label = element.querySelector("[data-status-label]");
    const detail = element.querySelector("[data-status-detail]");
    if (label) label.textContent = translate(statusLabelKey(result.state));

    if (!detail) return;
    if (name === "health") {
      detail.textContent = result.state === "operational"
        ? translate("status.healthDetailOk").replace("{latency}", formatLatency(result.latency))
        : translate("status.healthDetailFail");
      return;
    }
    if (name === "network") {
      detail.textContent = result.state === "operational"
        ? translate("status.networkDetailOk")
        : translate("status.networkDetailFail");
      return;
    }

    detail.textContent = translate("status.groupDetail")
      .replace("{passed}", String(result.passed))
      .replace("{total}", String(result.total));
  };

  const setCheckingState = () => {
    overallCard.dataset.statusState = "checking";
    overallValue.textContent = translate("status.stateChecking");
    overallSummary.textContent = translate("status.checkingBody");
    refreshButton.disabled = true;
    refreshButton.setAttribute("aria-busy", "true");
    itemElements.forEach((element) => {
      element.dataset.statusState = "checking";
      const label = element.querySelector("[data-status-label]");
      const detail = element.querySelector("[data-status-detail]");
      if (label) label.textContent = translate("status.stateChecking");
      if (detail) detail.textContent = translate("status.checkingShort");
    });
  };

  const getOverallState = (results) => {
    const serviceStates = [results.health.state, results.routes.state, results.assets.state];
    if (results.network.state === "unavailable" && serviceStates.every((state) => state === "unavailable")) {
      return "unavailable";
    }
    if (serviceStates.every((state) => state === "operational")) return "operational";
    if (serviceStates.some((state) => state === "operational" || state === "degraded")) return "degraded";
    return "unavailable";
  };

  const renderResults = (results) => {
    const overallState = getOverallState(results);
    overallCard.dataset.statusState = overallState;
    overallValue.textContent = translate(statusLabelKey(overallState));
    overallSummary.textContent = translate(`status.summary${overallState.charAt(0).toUpperCase()}${overallState.slice(1)}`);
    checkedValue.textContent = lastCheckedAt ? formatTime(lastCheckedAt) : "--";
    latencyValue.textContent = results.health.latency == null ? "--" : formatLatency(results.health.latency);
    Object.entries(results).forEach(([name, result]) => renderItem(name, result));
  };

  const scheduleNextCheck = () => {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => {
      if (document.visibilityState === "visible") runChecks();
      else scheduleNextCheck();
    }, refreshIntervalMs);
  };

  const runChecks = async () => {
    if (checkInProgress) return;
    checkInProgress = true;
    window.clearTimeout(refreshTimer);
    setCheckingState();

    const [healthProbe, routes, assets] = await Promise.all([
      probe("/api/health", { method: "GET", json: true }),
      checkGroup(routePaths),
      checkGroup(assetPaths),
    ]);
    const anyRemoteResponse = healthProbe.ok || routes.passed > 0 || assets.passed > 0;
    const results = {
      health: {
        state: healthProbe.ok ? "operational" : "unavailable",
        latency: healthProbe.ok ? healthProbe.latency : null,
      },
      routes,
      assets,
      network: {
        state: navigator.onLine && anyRemoteResponse ? "operational" : "unavailable",
      },
    };

    lastCheckedAt = new Date();
    lastResults = results;
    renderResults(results);
    refreshButton.disabled = false;
    refreshButton.removeAttribute("aria-busy");
    checkInProgress = false;
    scheduleNextCheck();
  };

  refreshButton?.addEventListener("click", runChecks);
  window.addEventListener("online", runChecks);
  window.addEventListener("offline", runChecks);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") runChecks();
  });

  new MutationObserver(() => {
    if (lastResults) renderResults(lastResults);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  runChecks();
})();
