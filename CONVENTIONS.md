# Email conventions

Decisions that govern the templates in this package, collected from review so
far. They override both the Figma frames and the React Email defaults — where a
rule contradicts a design, the rule wins and the frame should be updated.

## Typography

**Inter is the typeface.** The stack keeps a system fallback for clients that
block `@font-face` (Gmail, Outlook Windows), where a bare `Inter` would drop to
a serif:

```
Inter, ui-sans-serif, system-ui, sans-serif,
'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'
```

**Every text style carries the full Figma text spec**, not just family and size
— see `textBase` in `components/email-base.tsx`:

```css
font-style: normal;
font-variant-numeric: lining-nums proportional-nums;
font-feature-settings:
  "cv01" on,
  "cv03" on,
  "cv04" on,
  "cv05" on,
  "cv09" on,
  "cv11" on;
```

The body default is `14px / 22px / -0.084px / #262A2E`.

**Weights map to the Figma styles**, nothing in between:

| Weight | Used for                                                                       |
| ------ | ------------------------------------------------------------------------------ |
| 400    | body copy                                                                      |
| 500    | CTA button label, footer support link — Figma "Inter Medium"                   |
| 600    | inline emphasis, sign-off, headings, the OTP warning — Figma "Inter Semi Bold" |

The `@font-face` range must cover every weight in use (currently `400 600`),
otherwise the variable font clamps and clients synthesise the bold.

**All text content is `#262A2E`** — body copy, headings, the sign-off pair, and
inline body links alike. There is no second, darker tone: `#1D2A3D` was
retired. Inline body links keep the underline, not a different colour.

The only text that is *not* `#262A2E` is footer chrome (`#60646C` for the note
and legal block, `#56606C` for Help / Privacy Policy) and the CTA button label,
which is white on the brand pill.

`paragraphDark` survives as a separate style only for its slightly tighter
tracking (`-0.09px` vs `-0.084px`) on the sign-off; it is no longer a different
colour.

**The support address in the footer note** is `#262A2E` at weight 500, no
underline — the same colour as body copy, so it reads as emphasis against the
`#60646C` note around it. Set it on the `<a>` itself: clients that auto-link a
bare address will otherwise restyle it blue.

**Monospace** is the project's `font-mono` face, for the OTP code:
`"JetBrains Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas,
"Liberation Mono", monospace`. Applied inline, because React Email's `<Font>`
emits a `* { font-family }` rule that a second `<Font>` would override globally.

## Assets

**Serve images from the hosted buckets, by absolute URL.** Do not commit local
copies to swap in — that was tried and reverted.

| Asset                            | Location                                                                 |
| -------------------------------- | ------------------------------------------------------------------------ |
| Logo, status icons               | `notification-email-s3.s3.ap-southeast-1.amazonaws.com`                  |
| App Store / Google Play badges   | `prod-terlogo.s3.ap-southeast-1.amazonaws.com` (only host that has them) |
| CTA arrow                        | `static/arrow-right.png`, rasterised from the supplied 16px vector       |

**Dividers are HTML, never images**, even when Figma exports them as an SVG
asset. Read the stroke colour off the asset, composite any opacity against the
panel background, and draw the line with `border-top`.

**Status icons are written as absolute URLs** on `statusIconUrl` — do not
introduce a constant or a lookup map for them. The canonical set is 96x96 and
renders at 64x64:

| Key          | URL                                                                              |
| ------------ | -------------------------------------------------------------------------------- |
| `success`    | https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-success.png    |
| `pending`    | https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-pending.png    |
| `processing` | https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-processing.png |
| `blocked`    | https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-blocked.png    |
| `outgoing`   | https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-outgoing.png   |

Glyphs, since the names are not reliable descriptions: `success` is a green
filled circle with a white check, `pending` an hourglass, `blocked` a red
prohibition mark, `outgoing` an arrow leaving a box, `processing` an arrow
entering one. `processing` is hosted but not yet used by any template.

Because the URL is spelled out rather than resolved from a map, a mistyped
icon name ships as a broken image instead of failing `pnpm typecheck` — check
the rendered HTML against the bucket before claiming done.

**`icon-cancelled` and `icon-warning` are retired.** Both are still hosted, and
both are off-grid (100x100 and 84x84 rather than 96x96), but no template
references either one. Cancellation frames use `blocked` — the pale circle with
a diagonal slash — not `cancelled`, which is a circle with an X. The
returned-for-revision frames show no status icon at all.

**Some frames have no status icon.** Omit `statusIconUrl` entirely rather than
substituting a near-enough glyph; the returned-for-revision pair go straight
from the logo to the greeting.

## Spacing

**Spacing uses the 4px Tailwind scale** — a token like `gap-4` means 16px, `mt-11`
means 44px. Every shared value is a named entry in the `M` object in
`components/email-base.tsx`; do not inline raw numbers in the shell.

| Measurement                      | Value      | Token       |
| -------------------------------- | ---------- | ----------- |
| Container padding                | 32 / 16    | `py-8 px-4` |
| Logo → status icon               | 32         | `gap-8`     |
| Body paragraph gaps              | 16         | `gap-4`     |
| Body content → footer            | 44         | `mt-11`     |
| Footer rule → legal block        | 24         | `gap-6`     |
| Legal block → Help / Privacy row | 8          | `gap-2`     |

**Tokens are applied as `padding` on a `<td>`, never `margin`.** Outlook's Word
engine ignores margins on table cells and margins collapse unpredictably
elsewhere, so `mt-11` is implemented as `padding-top: 44px` on the cell. The
token names the intent; the `Block` helper decides the mechanism.

**Sign-off lines are the one deliberate exception** — "DK Bank Team" sits tight
under "Best regards," at 2px, not `gap-4`, because the frame shows them as a
single pair.

## Content

**Variable values are placeholder tokens, not sample data.** Figma supplies
realistic samples; replace them. Match the token style the surrounding frame
uses — Title Case for prose (`{Company Name}`, `{User's Name}`,
`{Payment ID}`), snake_case inside the transaction card (`{account_name}`,
`{reference_id}`, `{date_time}`). Per-record links are `{url}`.

**Fixed destinations use the real URL**; only per-record links are tokens.

| Link                  | Destination                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Footer Help           | `mailto:business.care@dk.bt` — derived from `SUPPORT_EMAIL`, never repeated                                       |
| Footer Privacy Policy | `https://www.dk.bt/privacy-policy`                                                                                |
| Onboarding portal     | `https://onboarding.uat.digitalkidu.bt/auth/login`                                                                |
| Banking portal        | `https://cibs-gmc.uat.digitalkidu.bt/uatonebank/66666666_default/h5/53000001-1.0.46.0/html/www/index.html#/login` |

**No hidden inbox-preview block.** React Email's `<Preview>` is not used — it
emits a `display:none` div plus a run of zero-width filler characters. Clients
derive the snippet from the visible copy instead.

**No Unsubscribe link.** The footer is Help / Privacy Policy only, even where a
frame shows a third link.

## Structure

One template per Figma frame. Where two frames carry the same copy at
different widths, build the phone frame only — the layout is fluid
(`max-width: 600px`, collapsing on narrow screens), so one render serves both.
Never duplicate copy across two templates.

Shared shell is split by section, over a common foundation:

| File                         | Holds                                              |
| ---------------------------- | -------------------------------------------------- |
| `components/email-base.tsx`  | hosts, `M` measurements, `Block`, text styles      |
| `components/email-header.tsx`| the DK logo, 93x24, centred                        |
| `components/email-body.tsx`  | optional status icon, then the template's copy      |
| `components/email-footer.tsx`| rules, note, legal block, app promo, footer links   |
| `components/layout.tsx`      | document/font/panel shell composing the three      |

Templates import from `components/layout.js` only — it re-exports the whole
foundation, so the split is invisible to callers. Sections import from
`email-base.js`, never from `layout.js`, which keeps the graph acyclic.

**The footer owns its own props.** `appPromo`, `supportEmail`, `helpUrl`,
`privacyUrl` and `year` are `EmailFooter`'s, with defaults there; `EmailLayout`
does not thread them, and templates must not pass them.

**The footer is rule → note → rule → legal block → Help / Privacy Policy.** It
carries no logo and no social icons; both were removed to match the Figma
footer frame. The app-promo block (store badges) stays opt-in via `appPromo`.

**Status icons render at 64x64 in every template.** The hosted assets are
larger — 96x96 across the whole set in use — and are scaled down, which keeps
them crisp on high-DPI
displays. There is no per-template size override and no fixed icon slot; the
gap above the icon is `iconGap` alone.

Spacing goes on a `<td>`, never a `<table>` — Outlook's Word engine ignores
padding on tables. That is what the `Block` helper is for.

## Working agreement

- Regenerate `out/*.html` and commit it alongside the source; every output must
  come from an export target, with no orphaned files.
- Verify with `pnpm typecheck` and by reading the rendered HTML before
  claiming done.
- Commit and push to the open PR as work lands, one commit per change.
- Visual checks are done by opening the HTML — no automated browser screenshots.
