"""Generate light-appearance overrides for hard-coded neutral colours in legacy CSS.

Neutral colours (low saturation) are inverted; saturated accents are kept.
Selectors are prefixed with :where(html[data-theme="light"]) so the generated
rule has exactly the original specificity and simply follows it in the cascade.

Requires tinycss2 (pip install tinycss2). Run from 2026-05-22/ui/assets/css/sections:
  python3 ../../../../tools/gen_light_css.py 45-light-legacy.css 00-foundation.css 05-themes.css \
    10-layout-navigation.css 20-pages-components.css 25-context-menu.css 30-dialogs-usage.css \
    35-settings-modal.css 40-responsive-polish.css
  python3 ../../../../tools/gen_light_css.py 58-light-modern.css 50-modern.css 55-sidebar.css
"""
import sys, re, colorsys
import tinycss2

TEXTISH = {'color', '-webkit-text-fill-color', 'caret-color', 'fill', 'stroke'}
PAINT = TEXTISH | {'background', 'background-color', 'background-image', 'border', 'border-color',
         'border-top', 'border-right', 'border-bottom', 'border-left', 'border-top-color',
         'border-right-color', 'border-bottom-color', 'border-left-color', 'outline', 'outline-color',
         'box-shadow', 'text-shadow', 'text-decoration-color', 'column-rule-color', 'accent-color'}
SHADOWS = {'box-shadow', 'text-shadow'}
HTML_ATTRS = ('[data-theme', '[data-nav-layout', '[data-sidebar-collapsed', '[data-kid-mode', '[data-auth-state',
              '[data-settings-redesign', '[data-theme-preference', '[lang', '[data-initial-language')
NAMED = {'white': (255, 255, 255, 1.0), 'black': (0, 0, 0, 1.0)}

def parse_hex(h):
    h = h.lower()
    if len(h) in (3, 4): h = ''.join(c * 2 for c in h)
    if len(h) == 6: return tuple(int(h[i:i+2], 16) for i in (0, 2, 4)) + (1.0,)
    if len(h) == 8: return tuple(int(h[i:i+2], 16) for i in (0, 2, 4)) + (int(h[6:8], 16) / 255,)
    return None

def is_neutral(r, g, b):
    return (max(r, g, b) - min(r, g, b)) <= 40

def lum(r, g, b):
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

def invert(rgba, shadow=False):
    r, g, b, a = rgba
    if not is_neutral(r, g, b): return None
    if shadow and lum(r, g, b) < 0.5: return None      # keep dark shadows as they are
    grey = 255 - round((r + g + b) / 3)   # warm/cool tints become plain grey, like macOS light
    return (grey, grey, grey, a)

def fmt(rgba):
    r, g, b, a = rgba
    if a >= 0.999: return '#%02x%02x%02x' % (int(r), int(g), int(b))
    return 'rgba(%d, %d, %d, %s)' % (int(r), int(g), int(b), ('%.3f' % a).rstrip('0').rstrip('.'))

def convert_tokens(tokens, shadow):
    """Return (serialized value, changed?)."""
    out = []; changed = False
    for t in tokens:
        if t.type == 'hash':
            c = parse_hex(t.value)
            if c:
                n = invert(c, shadow)
                if n: out.append(fmt(n)); changed = True; continue
            out.append(t.serialize())
        elif t.type == 'ident' and t.lower_value in NAMED:
            n = invert(NAMED[t.lower_value], shadow)
            if n: out.append(fmt(n)); changed = True
            else: out.append(t.serialize())
        elif t.type == 'function' and t.lower_name in ('rgb', 'rgba'):
            nums = [a for a in t.arguments if a.type in ('number', 'percentage')]
            if len(nums) >= 3 and all(n.type == 'number' for n in nums[:3]):
                vals = [n.value for n in nums[:3]]
                alpha = 1.0
                if len(nums) >= 4: alpha = nums[3].value / 100 if nums[3].type == 'percentage' else nums[3].value
                n = invert(tuple(vals) + (alpha,), shadow)
                if n: out.append(fmt(n)); changed = True; continue
            out.append(t.serialize())
        elif t.type == 'function':
            inner, ch = convert_tokens(t.arguments, shadow)
            if ch: out.append(f'{t.name}({inner})'); changed = True
            else: out.append(t.serialize())
        elif t.type in ('() block', '[] block', '{} block'):
            out.append(t.serialize())
        else:
            out.append(t.serialize())
    return ''.join(out), changed

def uses_var(tokens):
    for t in tokens:
        if t.type == 'function':
            if t.lower_name == 'var': return True
            if uses_var(t.arguments): return True
    return False

def light_selector(sel):
    sel = sel.strip()
    if re.search(r'\[data-theme\s*=', sel): return None     # already theme-specific
    if sel.startswith(':root'):
        return ':root:where([data-theme="light"])' + sel[5:]
    if re.match(r'html(?![\w-])', sel):
        return 'html:where([data-theme="light"])' + sel[4:]
    if sel.startswith(HTML_ATTRS):
        return ':where(html[data-theme="light"])' + sel
    return ':where(html[data-theme="light"]) ' + sel

def collect(rules, media, order):
    """Record (media, selector, property) for every declaration, in cascade order."""
    for rule in rules:
        if rule.type == 'qualified-rule':
            decls = tinycss2.parse_declaration_list(rule.content, skip_whitespace=True, skip_comments=True)
            props = {d.lower_name for d in decls if d.type == 'declaration'}
            for sel in split_selectors(tinycss2.serialize(rule.prelude)):
                for prop in props:
                    order.setdefault((sel, prop), []).append((len(order_seq), media))
            order_seq.append(1)
        elif rule.type == 'at-rule' and rule.lower_at_keyword in ('media', 'supports') and rule.content:
            prelude = tinycss2.serialize(rule.prelude).strip()
            collect(tinycss2.parse_rule_list(rule.content, skip_whitespace=True, skip_comments=True),
                    prelude if not media else media + ' & ' + prelude, order)

order_seq = []

def overridden_later(sel, prop, position, media, order):
    """True when a later rule with the same selector sets the same property in the same context."""
    for pos, m in order.get((sel, prop), []):
        if pos > position and (m == media or m == ''):
            return True
    return False

def process(rules, order, media='', counter=None):
    out = []
    for rule in rules:
        if rule.type == 'qualified-rule':
            position = counter[0]; counter[0] += 1
            decls = tinycss2.parse_declaration_list(rule.content, skip_whitespace=True, skip_comments=True)
            sels = split_selectors(tinycss2.serialize(rule.prelude))
            by_sel = {}
            for d in decls:
                if d.type != 'declaration': continue
                custom = d.name.startswith('--')      # colour tokens such as --settings-modal-ink
                if not custom and d.lower_name not in PAINT: continue
                if uses_var(d.value): continue
                shadow = d.lower_name in SHADOWS or (custom and 'shadow' in d.lower_name)
                val, ch = convert_tokens(d.value, shadow)
                if not ch: continue
                line = f'  {d.name}: {val.strip()}{" !important" if d.important else ""};'
                for sel in sels:
                    if overridden_later(sel, d.lower_name, position, media, order): continue
                    by_sel.setdefault(sel, []).append(line)
            # group selectors that ended up with identical declarations
            groups = {}
            for sel, lines in by_sel.items():
                ls = light_selector(sel)
                if ls: groups.setdefault(tuple(lines), []).append(ls)
            for lines, ls in groups.items():
                out.append(',\n'.join(ls) + ' {\n' + '\n'.join(lines) + '\n}')
        elif rule.type == 'at-rule' and rule.lower_at_keyword in ('media', 'supports') and rule.content:
            prelude = tinycss2.serialize(rule.prelude).strip()
            inner = process(tinycss2.parse_rule_list(rule.content, skip_whitespace=True, skip_comments=True),
                            order, prelude if not media else media + ' & ' + prelude, counter)
            if inner:
                out.append(f'@{rule.at_keyword} {prelude} {{\n' + '\n\n'.join(inner) + '\n}')
    return out

def split_selectors(s):
    parts, depth, cur = [], 0, ''
    for ch in s:
        if ch in '([': depth += 1
        elif ch in ')]': depth -= 1
        if ch == ',' and depth == 0: parts.append(cur); cur = ''
        else: cur += ch
    parts.append(cur)
    return [p for p in (x.strip() for x in parts) if p]

if __name__ == '__main__':
    out_path, *inputs = sys.argv[1:]
    sheets = []
    for path in inputs:
        css = open(path, encoding='utf-8').read()
        sheets.append((path, tinycss2.parse_stylesheet(css, skip_whitespace=True, skip_comments=True)))
    order = {}
    for _, rules in sheets:
        collect(rules, '', order)
    counter = [0]
    blocks = []
    for path, rules in sheets:
        got = process(rules, order, '', counter)
        blocks.append(f'/* from {path.rsplit("/",1)[-1]}: {len(got)} rules */\n' + '\n\n'.join(got))
    header = ('/* GENERATED by 2026-05-22/tools/gen_light_css.py - light-appearance overrides for hard-coded neutral colours.\n'
              '   Do not edit by hand; regenerate from the source stylesheets instead. */\n\n')
    open(out_path, 'w', encoding='utf-8').write(header + '\n\n'.join(blocks) + '\n')
    print(out_path, sum(b.count(' {\n') for b in blocks), 'rules')
