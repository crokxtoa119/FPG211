// Shared navigation builders and state helpers. Initialization stays in script.js.

const navIconMarkup = {
  search:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></svg>',
  chevron:
    '<svg class="nav-flyout-chevron" aria-hidden="true" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6" /></svg>',
  help:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M9.2 9a3 3 0 1 1 5.6 1.5c-.6.8-1.5 1.1-2.1 1.8-.5.5-.7.9-.7 1.7" /><path d="M12 17h.01" /></svg>',
  keyboard:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 10h.01" /><path d="M11 10h.01" /><path d="M15 10h.01" /><path d="M19 10h.01" /><path d="M7 14h.01" /><path d="M11 14h6" /></svg>',
  home:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></svg>',
  discover:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z" /></svg>',
  creator:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3 3 8l9 5 9-5-9-5Z" /><path d="m3 14 9 5 9-5" /><path d="m3 11 9 5 9-5" /></svg>',
  bio:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" /></svg>',
  about:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>',
  faq:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5.9-1.4 1.3-2.1 1.9-.6.5-.8.9-.8 2.1" /><path d="M12 17h.01" /></svg>',
  community:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /><path d="M8.5 11h.01" /><path d="M12 11h.01" /><path d="M15.5 11h.01" /></svg>',
  feedback:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 9h8" /><path d="M8 12h5" /></svg>',
  share:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 10.8 6.8-4.1" /><path d="m8.6 13.2 6.8 4.1" /></svg>',
  settings:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1A2 2 0 1 1 4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3h.1A1.7 1.7 0 0 0 10 3.1V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1A1.7 1.7 0 0 0 20.9 10h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></svg>',
  personalization:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3v4" /><path d="M12 17v4" /><path d="M3 12h4" /><path d="M17 12h4" /><circle cx="12" cy="12" r="4" /><path d="m5.6 5.6 2.8 2.8" /><path d="m15.6 15.6 2.8 2.8" /><path d="m18.4 5.6-2.8 2.8" /><path d="m8.4 15.6-2.8 2.8" /></svg>',
  store:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 10h16" /><path d="M5 10l1-5h12l1 5" /><path d="M6 10v9h12v-9" /><path d="M9 14h6" /><path d="M9 19v-5" /><path d="M15 19v-5" /></svg>',
  support:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 4.4 2.8 8.4 7 10 4.2-1.6 7-5.6 7-10V6l-7-3Z" /><path d="M9.8 12.2 11.4 14l3.2-4" /></svg>',
  analytics:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 20V10" /><path d="M10 20V6" /><path d="M16 20v-8" /><path d="M22 20H2" /></svg>',
  updates:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 5h10" /><path d="M4 12h16" /><path d="M4 19h10" /><path d="m17 4 3 3-3 3" /></svg>',
  activity:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 15l3-4 3 2 4-6" /><circle cx="8" cy="15" r="1" /><circle cx="11" cy="11" r="1" /><circle cx="14" cy="13" r="1" /><circle cx="18" cy="7" r="1" /></svg>',
  terms:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M6 3h9l3 3v15H6z" /><path d="M15 3v4h4" /><path d="M9 11h6" /><path d="M9 15h6" /><path d="M9 19h4" /></svg>',
  accessibility:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="4" r="2" /><path d="M5 8h14" /><path d="M12 8v13" /><path d="M8 21l4-8 4 8" /></svg>',
  privacy:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 4.4 2.8 8.4 7 10 4.2-1.6 7-5.6 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-5" /></svg>',
  license:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v6h5" /><path d="M9 14h6" /><path d="M9 18h4" /><path d="M5 7v14" /></svg>',
  trust:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 4.4 2.8 8.4 7 10 4.2-1.6 7-5.6 7-10V6l-7-3Z" /><path d="M8.5 12.5 11 15l4.5-5" /></svg>',
  status:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 13h4l3-7 4 13 3-6h2" /><path d="M4 20h16" /></svg>',
  security:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><rect x="6" y="10" width="12" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><path d="M12 14v2" /></svg>',
  login:
    '<svg class="nav-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><path d="m10 17 5-5-5-5" /><path d="M15 12H3" /></svg>',
};

const normalizeNavPath = (path) => {
  const normalized = path.replace(/\/index\.html$/i, "").replace(/\/+$/, "");
  return normalized || "/";
};

const isCurrentNavPath = (href) => {
  const currentPath = normalizeNavPath(window.location.pathname).toLowerCase();
  const targetPath = normalizeNavPath(href).toLowerCase();
  return currentPath === targetPath || (targetPath !== "/" && currentPath.startsWith(`${targetPath}/`));
};

const createNavAnchor = ({ href, icon, labelKey, fallback }) => {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.innerHTML = `${icon}<span data-i18n="${labelKey}">${fallback}</span>`;
  if (isCurrentNavPath(href)) {
    anchor.classList.add("is-active");
    anchor.setAttribute("aria-current", "page");
  }
  return anchor;
};

const createNavSearchButton = () => {
  const button = document.createElement("button");
  button.className = "nav-search-button";
  button.type = "button";
  button.dataset.siteSearchOpen = "";
  button.innerHTML = `${navIconMarkup.search}<span data-i18n="nav.search">Search</span><kbd>Ctrl+K</kbd>`;
  return button;
};

let navFlyoutId = 0;

const createNavFlyout = ({ icon, labelKey, fallback, items = [] }) => {
  const wrapper = document.createElement("div");
  const flyoutId = `nav-flyout-${navFlyoutId++}`;
  wrapper.className = "nav-flyout";

  const trigger = document.createElement("button");
  trigger.className = "nav-flyout-trigger";
  trigger.type = "button";
  trigger.dataset.navFlyoutTrigger = "";
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-haspopup", "menu");
  trigger.setAttribute("aria-controls", flyoutId);
  trigger.innerHTML = `${icon}<span data-i18n="${labelKey}">${fallback}</span>${navIconMarkup.chevron}`;

  const panel = document.createElement("div");
  panel.className = "nav-flyout-panel";
  panel.id = flyoutId;
  panel.hidden = true;
  panel.setAttribute("role", "menu");

  items.forEach((item) => {
    const anchor = createNavAnchor(item);
    anchor.setAttribute("role", "menuitem");
    if (item.className) anchor.classList.add(item.className);
    panel.append(anchor);
  });

  if (panel.querySelector(".is-active")) wrapper.classList.add("has-active-item");
  wrapper.append(trigger, panel);
  return wrapper;
};

const createTopSearchButton = () => {
  if (isSystemRecoveryPage) return;
  if (document.body.classList.contains("official-home-body")) return;
  if (document.body.classList.contains("search-body")) return;
  if (document.querySelector("[data-top-search]")) return;

  const button = document.createElement("button");
  button.className = "top-search-button";
  button.type = "button";
  button.dataset.topSearch = "";
  button.dataset.siteSearchOpen = "";
  button.innerHTML = `${navIconMarkup.search}<span data-i18n="nav.search">Search</span><kbd>Ctrl+K</kbd>`;
  document.body.append(button);
};

const createSidebarAccountItem = ({ href, action, icon, labelKey, fallback, className }) => {
  const item = document.createElement(href ? "a" : "button");
  item.className = "sidebar-account-item";
  if (className) item.classList.add(className);
  if (href) {
    item.href = href;
    if (isCurrentNavPath(href)) item.classList.add("is-active");
  } else {
    item.type = "button";
    if (action) item.dataset.sidebarAccountAction = action;
  }
  item.innerHTML = `${icon}<span data-i18n="${labelKey}">${fallback}</span>`;
  return item;
};

const createSidebarHelpMenu = () => {
  const wrapper = document.createElement("div");
  wrapper.className = "sidebar-help-menu";

  const trigger = document.createElement("button");
  trigger.className = "sidebar-account-item sidebar-help-trigger";
  trigger.type = "button";
  trigger.dataset.sidebarHelpTrigger = "";
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-haspopup", "menu");
  trigger.innerHTML = `${navIconMarkup.help}<span data-i18n="nav.help">Help</span>${navIconMarkup.chevron}`;
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const willOpen = !wrapper.classList.contains("is-open");
    closeSidebarHelpMenus(wrapper);
    closeNavFlyouts();
    setSidebarHelpOpen(wrapper, willOpen);
  });
  trigger.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    event.stopPropagation();
    closeContextMenu();
    closeSidebarHelpMenus(wrapper);
    setSidebarHelpOpen(wrapper, true);
  });

  const panel = document.createElement("div");
  panel.className = "sidebar-help-panel";
  panel.hidden = true;
  panel.setAttribute("role", "menu");

  [
    { href: "/FAQ", icon: navIconMarkup.faq, labelKey: "nav.faq", fallback: "FAQ" },
    { href: "/feedback", icon: navIconMarkup.support, labelKey: "nav.support", fallback: "Support" },
    { href: "/status", icon: navIconMarkup.status, labelKey: "nav.status", fallback: "Status" },
    { divider: true },
    { href: "/trust", icon: navIconMarkup.trust, labelKey: "nav.trustCenter", fallback: "Trust Center" },
    { href: "/security", icon: navIconMarkup.security, labelKey: "nav.security", fallback: "Security" },
    { href: "/privacy", icon: navIconMarkup.privacy, labelKey: "nav.privacy", fallback: "Privacy Policy" },
    { divider: true },
    { href: "/terms", icon: navIconMarkup.terms, labelKey: "nav.terms", fallback: "Terms" },
    { href: "/license", icon: navIconMarkup.license, labelKey: "nav.license", fallback: "License" },
  ].forEach((item) => {
    if (item.divider) {
      const divider = document.createElement("div");
      divider.className = "sidebar-help-divider";
      divider.setAttribute("role", "separator");
      panel.append(divider);
      return;
    }

    const element = createNavAnchor(item);
    element.classList.add("sidebar-help-link");
    element.setAttribute("role", "menuitem");
    panel.append(element);
  });

  if (panel.querySelector(".is-active")) wrapper.classList.add("has-active-item");
  wrapper.append(trigger, panel);
  return wrapper;
};

const createSidebarAccountMenu = () => {
  if (isSystemRecoveryPage) return;
  if (document.querySelector("[data-sidebar-account]")) return;

  document.querySelectorAll(".topbar:not([data-official-home-nav])").forEach((topbar, index) => {
    const menuId = `sidebar-account-menu-${index}`;
    const account = document.createElement("div");
    account.className = "sidebar-account";
    account.dataset.sidebarAccount = "";

    const panel = document.createElement("div");
    panel.className = "sidebar-account-panel";
    panel.id = menuId;
    panel.hidden = true;
    panel.setAttribute("role", "menu");

    [
      { action: "profile", icon: navIconMarkup.bio, labelKey: "sidebar.profile", fallback: "Profile", className: "is-auth-required" },
      { action: "google-auth", icon: navIconMarkup.login, labelKey: "auth.signIn", fallback: "Sign in with Google", className: "sidebar-auth-action" },
      { href: "/settings", icon: navIconMarkup.settings, labelKey: "nav.settings", fallback: "Settings" },
    ].forEach((item) => panel.append(createSidebarAccountItem(item)));

    panel.append(createSidebarHelpMenu());

    const trigger = document.createElement("button");
    trigger.className = "sidebar-account-trigger";
    trigger.type = "button";
    trigger.dataset.sidebarAccountTrigger = "";
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-haspopup", "menu");
    trigger.setAttribute("aria-controls", menuId);
    trigger.innerHTML = `
      <img class="sidebar-account-avatar" src="/assets/well-avatar.webp" alt="" width="192" height="192" loading="lazy" decoding="async" />
      <span class="sidebar-account-copy">
        <strong data-sidebar-account-name>Sign in with Google</strong>
        <small data-sidebar-account-plan>Optional</small>
      </span>
    `;

    account.append(panel, trigger);
    topbar.append(account);
  });
};

const createMobileQuickActionButton = ({
  type = "button",
  href,
  action,
  icon,
  labelKey,
  fallback,
  authRequired = false,
}) => {
  const element = document.createElement(href ? "a" : "button");
  element.className = "mobile-quick-action";
  element.dataset.i18nAriaLabel = labelKey;
  element.setAttribute("aria-label", translate(labelKey));
  if (authRequired) {
    element.dataset.mobileProfileAction = "";
    element.hidden = true;
    element.setAttribute("aria-hidden", "true");
  }
  if (href) {
    element.href = href;
    if (isCurrentNavPath(href)) {
      element.classList.add("is-active");
      element.setAttribute("aria-current", "page");
    }
  } else {
    element.type = type;
    if (action) element.dataset.mobileQuickAction = action;
  }
  element.innerHTML = `${icon}<span class="sr-only" data-i18n="${labelKey}">${fallback}</span>`;
  return element;
};

const createMobileQuickActions = () => {
  if (isSystemRecoveryPage) return;
  if (document.querySelector("[data-mobile-quick-actions]")) return;

  const bar = document.createElement("nav");
  bar.className = "mobile-quick-actions";
  bar.dataset.mobileQuickActions = "";
  bar.setAttribute("aria-label", translate("quickActions.label"));
  bar.innerHTML = '<div class="mobile-quick-actions-inner"></div>';

  const inner = bar.querySelector(".mobile-quick-actions-inner");
  [
    {
      href: "/",
      icon: navIconMarkup.home,
      labelKey: "quickActions.home",
      fallback: "Home",
    },
    {
      action: "search",
      icon: navIconMarkup.search,
      labelKey: "quickActions.search",
      fallback: "Search",
    },
    {
      action: "share",
      icon: navIconMarkup.share,
      labelKey: "quickActions.share",
      fallback: "Share",
    },
    {
      href: "/settings",
      icon: navIconMarkup.settings,
      labelKey: "quickActions.settings",
      fallback: "Settings",
    },
    {
      action: "profile",
      icon: navIconMarkup.bio,
      labelKey: "quickActions.profile",
      fallback: "Profile",
      authRequired: true,
    },
  ].forEach((item) => inner.append(createMobileQuickActionButton(item)));

  document.body.append(bar);
};

const enhanceSidebarBrand = () => {
  document.querySelectorAll(".topbar:not([data-official-home-nav]) .brand-logo").forEach((brand) => {
    if (brand.querySelector(".workspace-copy")) return;
    const copy = document.createElement("span");
    copy.className = "workspace-copy";
    copy.innerHTML = '<strong>First PrizeGames</strong><small data-i18n="nav.workspaceTagline">Official site</small>';
    brand.classList.add("workspace-brand");
    brand.append(copy);
  });
};

// macOS System Settings pattern: grouped rows with coloured icon tiles, no section headings.
const createSidebarSearch = () => {
  document.querySelectorAll(".topbar:not([data-official-home-nav])").forEach((topbar) => {
    if (topbar.querySelector(".sidebar-search")) return;
    const search = createNavSearchButton();
    search.classList.add("sidebar-search");
    topbar.querySelector(".brand-logo")?.after(search);
  });
};

const enhanceSidebarNavigation = () => {
  if (isSystemRecoveryPage) return;
  const navGroups = [
    {
      id: "main",
      label: "MAIN",
      labelKey: "nav.groupMain",
      items: [
        { href: "/", icon: navIconMarkup.home, labelKey: "nav.home", fallback: "Home", tint: "blue" },
        { href: "/portal", icon: navIconMarkup.analytics, labelKey: "nav.portal", fallback: "Portal", tint: "indigo" },
        { href: "/updates", icon: navIconMarkup.updates, labelKey: "nav.updates", fallback: "Updates", tint: "red" },
        { href: "/activity", icon: navIconMarkup.activity, labelKey: "nav.activity", fallback: "Activity", tint: "orange" },
      ],
    },
    {
      id: "explore",
      label: "EXPLORE",
      labelKey: "nav.groupExplore",
      items: [
        { href: "/discover", icon: navIconMarkup.discover, labelKey: "nav.discover", fallback: "Discover", tint: "teal" },
        { href: "/Creator", icon: navIconMarkup.creator, labelKey: "nav.creator", fallback: "Creator", tint: "purple" },
        { href: "/Bio", icon: navIconMarkup.bio, labelKey: "nav.bio", fallback: "Bio", tint: "green" },
        { href: "/about", icon: navIconMarkup.about, labelKey: "nav.aboutUs", fallback: "About us", tint: "gray" },
      ],
    },
    {
      id: "support",
      label: "SUPPORT",
      labelKey: "nav.groupResources",
      items: [
        { href: "/FAQ", icon: navIconMarkup.faq, labelKey: "nav.faq", fallback: "FAQ", tint: "blue" },
        { href: "/community", icon: navIconMarkup.community, labelKey: "nav.community", fallback: "Community", tint: "green" },
        { href: "/feedback", icon: navIconMarkup.feedback, labelKey: "nav.feedback", fallback: "Feedback", tint: "orange" },
        { href: "/status", icon: navIconMarkup.status, labelKey: "nav.status", fallback: "Status", tint: "teal" },
      ],
    },
    {
      id: "policies",
      label: "POLICIES",
      labelKey: "nav.groupPolicies",
      items: [
        { href: "/trust", icon: navIconMarkup.trust, labelKey: "nav.trustCenter", fallback: "Trust Center", tint: "blue" },
        { href: "/security", icon: navIconMarkup.security, labelKey: "nav.security", fallback: "Security", tint: "gray" },
        { href: "/privacy", icon: navIconMarkup.privacy, labelKey: "nav.privacy", fallback: "Privacy Policy", tint: "blue" },
        { href: "/terms", icon: navIconMarkup.terms, labelKey: "nav.terms", fallback: "Terms", tint: "gray" },
        { href: "/license", icon: navIconMarkup.license, labelKey: "nav.license", fallback: "License", tint: "gray" },
        { href: "/accessibility", icon: navIconMarkup.accessibility, labelKey: "nav.accessibility", fallback: "Accessibility", tint: "blue" },
        { href: "/settings", icon: navIconMarkup.settings, labelKey: "nav.settings", fallback: "Settings", tint: "gray" },
      ],
    },
  ];

  enhanceSidebarBrand();
  createSidebarSearch();

  document.querySelectorAll(".nav-links:not([data-official-home-menu])").forEach((nav, navIndex) => {
    nav.replaceChildren();

    navGroups.forEach((group, index) => {
      const groupElement = document.createElement("div");
      groupElement.className = "nav-menu-group";
      groupElement.dataset.navMenuGroup = group.id;
      const triggerId = `nav-group-${group.id}-${navIndex}-${index}`;

      const trigger = document.createElement("button");
      trigger.className = "nav-group-trigger";
      trigger.type = "button";
      trigger.id = triggerId;
      trigger.setAttribute("aria-expanded", "false");
      trigger.innerHTML = `<span data-i18n="${group.labelKey}">${group.label}</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>`;

      const menu = document.createElement("div");
      menu.className = "nav-group-menu";
      menu.setAttribute("aria-labelledby", triggerId);

      const sectionLabel = document.createElement("span");
      sectionLabel.className = "nav-section-label";
      sectionLabel.textContent = group.label;
      sectionLabel.dataset.i18n = group.labelKey;
      sectionLabel.setAttribute("aria-hidden", "true");
      menu.append(sectionLabel);

      group.items.forEach((item) => {
        const anchor = createNavAnchor(item);
        if (item.tint) anchor.dataset.tint = item.tint;
        menu.append(anchor);
      });

      if (menu.querySelector(".is-active")) groupElement.classList.add("has-active-item");
      groupElement.append(trigger, menu);
      nav.append(groupElement);
    });
  });
};

// Title bar above the content, like a macOS window toolbar: back/forward and the page name.
const createContentToolbar = () => {
  if (isSystemRecoveryPage) return;
  const main = document.querySelector("main.shell");
  const topbar = main?.querySelector(".topbar:not([data-official-home-nav])");
  if (!main || !topbar || main.querySelector("[data-content-toolbar]")) return;

  const toolbar = document.createElement("div");
  toolbar.className = "content-toolbar";
  toolbar.dataset.contentToolbar = "";

  const chevron = (d) => `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="${d}" /></svg>`;
  const back = document.createElement("button");
  back.type = "button";
  back.className = "content-toolbar-button";
  back.setAttribute("aria-label", "Back");
  back.dataset.i18nAriaLabel = "context.back";
  back.innerHTML = chevron("m15 18-6-6 6-6");
  back.disabled = window.history.length <= 1;
  back.addEventListener("click", () => window.history.back());

  const forward = document.createElement("button");
  forward.type = "button";
  forward.className = "content-toolbar-button";
  forward.setAttribute("aria-label", "Forward");
  forward.dataset.i18nAriaLabel = "context.forward";
  forward.innerHTML = chevron("m9 18 6-6-6-6");
  forward.addEventListener("click", () => window.history.forward());

  const title = document.createElement("span");
  title.className = "content-toolbar-title";
  const activeLabel = topbar.querySelector(".nav-links a.is-active span[data-i18n]");
  if (activeLabel) {
    title.dataset.i18n = activeLabel.dataset.i18n;
    title.textContent = activeLabel.textContent;
  } else {
    title.textContent = (document.querySelector("main h1")?.textContent || document.title.split("|")[0]).trim();
  }

  const nav = document.createElement("div");
  nav.className = "content-toolbar-nav";
  nav.append(back, forward);
  toolbar.append(nav, title);
  topbar.after(toolbar);
};

const createStandardFooter = () => {
  if (isSystemRecoveryPage) return;
  if (document.querySelector("[data-site-footer]")) return;

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.dataset.siteFooter = "";
  footer.innerHTML = `
    <div class="site-footer-brand">
      <strong data-i18n="footer.brand">First PrizeGames</strong>
      <span data-i18n="footer.tagline">Trust, status, privacy, and support links in one place.</span>
    </div>
    <nav class="site-footer-links" aria-label="Footer links" data-i18n-aria-label="aria.footerLinks">
      <a href="/trust" data-i18n="nav.trustCenter">Trust Center</a>
      <a href="/status" data-i18n="nav.status">Status</a>
      <a href="/security" data-i18n="nav.security">Security</a>
      <a href="/privacy" data-i18n="nav.privacy">Privacy Policy</a>
      <a href="/terms" data-i18n="nav.terms">Terms</a>
      <a href="/accessibility" data-i18n="nav.accessibility">Accessibility</a>
      <a href="/sitemap" data-i18n="nav.sitemap">Sitemap</a>
    </nav>
  `;

  document.body.append(footer);
};

const setNavFlyoutOpen = (flyout, isOpen) => {
  if (!(flyout instanceof HTMLElement)) return;
  const trigger = flyout.querySelector("[data-nav-flyout-trigger]");
  const panel = flyout.querySelector(".nav-flyout-panel");

  flyout.classList.toggle("is-open", isOpen);
  trigger?.setAttribute("aria-expanded", String(isOpen));
  if (panel instanceof HTMLElement) panel.hidden = !isOpen;
};

const closeNavFlyouts = (exceptFlyout = null) => {
  document.querySelectorAll(".nav-flyout.is-open").forEach((flyout) => {
    if (flyout !== exceptFlyout) setNavFlyoutOpen(flyout, false);
  });
};

const setSidebarAccountOpen = (account, isOpen) => {
  if (!(account instanceof HTMLElement)) return;
  if (!isOpen) account.querySelectorAll(".sidebar-help-menu.is-open").forEach((menu) => setSidebarHelpOpen(menu, false));
  const trigger = account.querySelector("[data-sidebar-account-trigger]");
  const panel = account.querySelector(".sidebar-account-panel");
  account.classList.toggle("is-open", isOpen);
  trigger?.setAttribute("aria-expanded", String(isOpen));
  if (panel instanceof HTMLElement) panel.hidden = !isOpen;
};

const closeSidebarAccountMenus = (exceptAccount = null) => {
  document.querySelectorAll(".sidebar-account.is-open").forEach((account) => {
    if (account !== exceptAccount) setSidebarAccountOpen(account, false);
  });
};

const resetSidebarHelpPanelPosition = (panel) => {
  if (!(panel instanceof HTMLElement)) return;
  ["position", "top", "right", "bottom", "left", "transform", "maxHeight"].forEach((property) => {
    panel.style.removeProperty(property);
  });
};

const positionSidebarHelpPanel = (menu) => {
  if (!(menu instanceof HTMLElement)) return;
  const trigger = menu.querySelector("[data-sidebar-help-trigger]");
  const panel = menu.querySelector(".sidebar-help-panel");
  if (!(trigger instanceof HTMLElement) || !(panel instanceof HTMLElement) || panel.hidden) return;

  const margin = 12;
  const gap = 12;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const maxPanelHeight = Math.max(220, viewportHeight - margin * 2);

  panel.style.position = "fixed";
  panel.style.right = "auto";
  panel.style.bottom = "auto";
  panel.style.left = "0px";
  panel.style.top = "0px";
  panel.style.transform = "none";
  panel.style.maxHeight = `${maxPanelHeight}px`;

  const triggerRect = trigger.getBoundingClientRect();
  const panelRect = panel.getBoundingClientRect();
  const panelWidth = panelRect.width || 246;
  const panelHeight = Math.min(panel.scrollHeight || panelRect.height || 320, maxPanelHeight);
  const preferredLeft = triggerRect.right + gap;
  const fallbackLeft = triggerRect.left - panelWidth - gap;
  const left =
    preferredLeft + panelWidth <= viewportWidth - margin
      ? preferredLeft
      : Math.max(margin, Math.min(fallbackLeft, viewportWidth - panelWidth - margin));
  const centeredTop = triggerRect.top + triggerRect.height / 2 - panelHeight / 2;
  const top = Math.max(margin, Math.min(centeredTop, viewportHeight - panelHeight - margin));

  panel.style.left = `${Math.round(left)}px`;
  panel.style.top = `${Math.round(top)}px`;
};

const setSidebarHelpOpen = (menu, isOpen) => {
  if (!(menu instanceof HTMLElement)) return;
  const trigger = menu.querySelector("[data-sidebar-help-trigger]");
  const panel = menu.querySelector(".sidebar-help-panel");
  menu.classList.toggle("is-open", isOpen);
  trigger?.setAttribute("aria-expanded", String(isOpen));
  if (panel instanceof HTMLElement) {
    panel.hidden = !isOpen;
    if (isOpen) {
      positionSidebarHelpPanel(menu);
    } else {
      resetSidebarHelpPanelPosition(panel);
    }
  }
};

const closeSidebarHelpMenus = (exceptMenu = null) => {
  document.querySelectorAll(".sidebar-help-menu.is-open").forEach((menu) => {
    if (menu !== exceptMenu) setSidebarHelpOpen(menu, false);
  });
};

const repositionOpenSidebarHelpMenus = () => {
  document.querySelectorAll(".sidebar-help-menu.is-open").forEach((menu) => positionSidebarHelpPanel(menu));
};

const setActiveLink = () => {
  if (!sections.length) return;

  const midpoint = window.scrollY + window.innerHeight * 0.42;
  const activeSection =
    sections.findLast((section) => section.offsetTop <= midpoint) || sections[0];

  navLinks.forEach((link) => {
    link.classList.toggle(
      "is-active",
      link.getAttribute("href") === `#${activeSection.id}`,
    );
  });
};

const setOfficialMenuOpen = (activeItem, isOpen) => {
  officialMenuItems.forEach((item) => {
    const shouldOpen = item === activeItem && Boolean(isOpen);
    item.classList.toggle("is-open", shouldOpen);
    item.querySelector("button")?.setAttribute("aria-expanded", String(shouldOpen));
  });
};

const closeOfficialMenus = () => setOfficialMenuOpen(null, false);

const setupOfficialHomeMenus = () => {
  if (!officialHomeMenu || !officialMenuItems.length) return;

  officialHomeMenu.classList.add("is-click-managed");
  officialMenuItems.forEach((item, index) => {
    const button = item.querySelector("button");
    const panel = item.querySelector(".official-mega-panel");
    if (!button || !panel) return;

    if (!panel.id) panel.id = `official-menu-panel-${index + 1}`;
    button.setAttribute("aria-haspopup", "true");
    button.setAttribute("aria-controls", panel.id);
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      setOfficialMenuOpen(item, !item.classList.contains("is-open"));
    });
  });

  officialHomeMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeOfficialMenus);
  });

  document.addEventListener("click", (event) => {
    if (event.target instanceof Element && officialHomeMenu.contains(event.target)) return;
    closeOfficialMenus();
  });
};

const syncNavigationToggleLabel = () => {
  if (!mobileMenuButton) return;
  const visibleLabel = mobileMenuButton.querySelector("span");

  const isDesktopSidebar =
    desktopSidebarQuery.matches &&
    document.documentElement.dataset.navLayout === "sidebar" &&
    !document.body.classList.contains("official-home-body");

  if (isDesktopSidebar) {
    const isCollapsed = document.documentElement.dataset.sidebarCollapsed === "true";
    const labelKey = isCollapsed ? "nav.expandSidebar" : "nav.collapseSidebar";
    mobileMenuButton.setAttribute("aria-expanded", String(!isCollapsed));
    mobileMenuButton.setAttribute("aria-label", translate(labelKey));
    if (visibleLabel) {
      visibleLabel.dataset.i18n = labelKey;
      visibleLabel.textContent = translate(labelKey);
    }
    return;
  }

  const isOpen = mobileMenuButton.closest(".topbar")?.classList.contains("is-open") ?? false;
  const labelKey = isOpen ? "nav.closeMenu" : "nav.menu";
  mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
  mobileMenuButton.setAttribute("aria-label", translate(labelKey));
  if (visibleLabel) {
    visibleLabel.dataset.i18n = labelKey;
    visibleLabel.textContent = translate(labelKey);
  }
};

const setMobileMenuOpen = (isOpen) => {
  const topbar = mobileMenuButton?.closest(".topbar");

  topbar?.classList.toggle("is-open", isOpen);
  if (!isOpen) closeOfficialMenus();
  syncNavigationToggleLabel();
};

const setSidebarCollapsed = (isCollapsed, persist = true) => {
  if (document.body.classList.contains("official-home-body")) {
    setMobileMenuOpen(false);
    return;
  }

  const resolved = Boolean(isCollapsed);

  document.documentElement.dataset.sidebarCollapsed = String(resolved);
  if (persist) localStorage.setItem("profile-sidebar-collapsed", String(resolved));

  syncNavigationToggleLabel();
};

const toggleSidebarCollapsed = () => {
  setMobileMenuOpen(false);
  setSidebarCollapsed(document.documentElement.dataset.sidebarCollapsed !== "true");
};

const setupBrandLogo = () => {
  if (!brandLogoImage) return;

  brandLogoImage.setAttribute("draggable", "false");

  brandLogoImage.addEventListener("load", () => {
    brandLogoImage.closest(".brand-logo")?.classList.add("has-image");
  });

  brandLogoImage.addEventListener("error", () => {
    brandLogoImage.closest(".brand-logo")?.classList.remove("has-image");
  });

  brandLogoImage.addEventListener("dragstart", (event) => event.preventDefault());
  brandLogoImage.addEventListener("contextmenu", (event) => event.preventDefault());
};
