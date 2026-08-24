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
— see `textBase` in `components/layout.tsx`:

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

**The sign-off** — "DK Bank Team" — is `#1D2A3D` at weight 600.

**Monospace** is the project's `font-mono` face, for the OTP code:
`"JetBrains Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas,
"Liberation Mono", monospace`. Applied inline, because React Email's `<Font>`
emits a `* { font-family }` rule that a second `<Font>` would override globally.

## Assets

**Serve images from the hosted buckets, by absolute URL.** Do not commit local
copies to swap in — that was tried and reverted.

| Asset                            | Location                                                                 |
| -------------------------------- | ------------------------------------------------------------------------ |
| Logo, status icons, social icons | `notification-email-s3.s3.ap-southeast-1.amazonaws.com`                  |
| App Store / Google Play badges   | `prod-terlogo.s3.ap-southeast-1.amazonaws.com` (only host that has them) |
| CTA arrow                        | `static/arrow-right.png`, rasterised from the supplied 16px vector       |

**Dividers are HTML, never images**, even when Figma exports them as an SVG
asset. Read the stroke colour off the asset, composite any opacity against the
panel background, and draw the line with `border-top`.

## Content

**Variable values are placeholder tokens, not sample data.** Figma supplies
realistic samples; replace them. Match the token style the surrounding frame
uses — Title Case for prose (`{Company Name}`, `{User's Name}`,
`{Payment ID}`), snake_case inside the transaction card (`{account_name}`,
`{reference_id}`, `{date_time}`). Per-record links are `{url}`.

**Fixed destinations use the real URL**; only per-record links are tokens.

| Link                  | Destination                                                                 |
| --------------------- | --------------------------------------------------------------------------- |
| Footer Help           | `mailto:business.care@dk.bt` — derived from `SUPPORT_EMAIL`, never repeated |
| Footer Privacy Policy | `https://www.dk.bt/privacy-policy`                                          |
| Onboarding portal     | `https://onboarding.uat.digitalkidu.bt`                                     |
| Banking portal        | `https://cibs-gmc.uat.digitalkidu.bt/uatonebank/…#/login`                   |

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

Shared shell lives in `components/layout.tsx`: font, logo, optional status
icon, optional app-promo block, footer. Templates supply body copy only.

Spacing goes on a `<td>`, never a `<table>` — Outlook's Word engine ignores
padding on tables. That is what the `Block` helper is for.

## Working agreement

- Regenerate `out/*.html` and commit it alongside the source; every output must
  come from an export target, with no orphaned files.
- Verify with `pnpm typecheck` and by reading the rendered HTML before
  claiming done.
- Commit and push to the open PR as work lands, one commit per change.
- Visual checks are done by opening the HTML — no automated browser screenshots.
