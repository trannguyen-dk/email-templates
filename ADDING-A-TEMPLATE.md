# Adding an email template

How to turn a Figma frame into a template in this package. Read
[CONVENTIONS.md](CONVENTIONS.md) first — it is the _what_; this is the _how_.

New to React Email? Start at [Getting started](#getting-started-with-react-email)
at the bottom, then come back to step 0.

## 0. Before you start

You need the Figma **node URL**, not just the file link:

```
https://www.figma.com/design/QFmDccHeoFb2EPpk0VRmZ0/DK.Notif?node-id=2417-2174
                                                              ^^^^^^^^^^^^^^^^
```

Without `node-id` there is nothing to implement — ask for a node-specific link
rather than guessing which frame is meant.

Implement the **"Email content"** frame only. Most designs are drawn inside a
phone mockup; the status bar, navbar, subject line and sender row are the mail
client's chrome, not the email. The subject line in the mockup is what you'd
set on the send.

## 1. Decide what you are actually building

Before writing anything, work out which of these it is:

| Situation                                       | What to do                                                            |
| ----------------------------------------------- | --------------------------------------------------------------------- |
| A new notification                              | New file in `emails/`                                                 |
| Same copy, wide frame of an email already built | Nothing to build — the layout is fluid and already serves both widths |
| A frame that supersedes one already built       | Update the existing template, don't add a second                      |

Two frames with identical copy are one email at two widths. Check the existing
templates for the same wording before assuming it's new.

## 2. Pull the design context

Use the Figma MCP `get_design_context` on the node. Treat what comes back as a
**reference, not code to paste** — it is React + Tailwind with absolute
positioning and will not survive an email client.

What to take from it:

- **Copy** — verbatim, including punctuation and curly apostrophes.
- **Numbers** — sizes, line heights, letter spacing, gaps, colours.
- **Structure** — which lines are grouped, what's emphasised inline.

What to ignore:

- Its layout mechanism (flex, `gap`, absolute insets).
- Its image assets for anything you can draw in CSS — see dividers in
  CONVENTIONS.md.

## 3. Check what already exists

Most frames need no new components. Available from `components/`:

| Import                                 | Use                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------ |
| `EmailLayout`                          | The shell — font, logo, status icon, footer. Every template wraps in it. |
| `Block`                                | Vertical spacing (puts padding on a `<td>`)                              |
| `CtaButton`                            | The brand pill button with trailing arrow                                |
| `DetailRows`                           | The bordered transaction summary card                                    |
| `paragraph` / `paragraphDark`          | Body copy — `#262A2E` and `#1D2A3D`                                      |
| `heading`                              | 18px semibold                                                            |
| `emphasis`                             | Inline `<strong>` weight                                                 |
| `inlineLink`                           | Underlined mailto/link inside copy                                       |
| `textBase` / `fontStack` / `monoStack` | Building a new style                                                     |
| `ICONS_CDN` / `SUPPORT_EMAIL`          | Asset host, support address                                              |

`EmailLayout` props worth knowing: `statusIconUrl` (omit for no icon),
`statusIconSize` (default 100; frames also use 80 and 84), `appPromo`, `supportEmail`, `helpUrl`, `privacyUrl`, `year`.

If the frame needs something genuinely new, put it in `components/` as its own
file rather than inline in the template — that is where `DetailRows` came from.

## 4. Source the status icon

Icons are hosted, not committed. Probe the bucket before inventing anything:

```sh
B=https://notification-email-s3.s3.ap-southeast-1.amazonaws.com
for f in icon-success icon-pending icon-warning icon-blocked icon-cancelled icon-outgoing; do
  printf "%-18s %s\n" $f "$(curl -s -o /dev/null -w '%{http_code}' $B/$f.png)"
done
```

`200` means it exists; `403` means it doesn't. Guess a few plausible names for
what the frame shows (`icon-declined`, `icon-refunded`, …). If nothing matches,
**stop and ask for the icon to be uploaded** — do not hand-draw an SVG or
commit a local PNG, and never leave a placeholder.

Download and view a candidate before using it; names are not reliable
descriptions of the glyph.

## 5. Write the template

```tsx
import { Text } from "@react-email/components";

import { EmailLayout, ICONS_CDN, paragraph, paragraphDark } from "../components/layout.js";

/**
 * One-line description of when this fires.
 * Figma: DK.Notif › node 1234:5678, "Email content" frame.
 */
export interface ThingHappenedEmailProps {
  companyName?: string;
  supportEmail?: string;
  helpUrl?: string;
  privacyUrl?: string;
  year?: number;
}

export default function ThingHappenedEmail({
  companyName = "{Company Name}",
  supportEmail,
  helpUrl,
  privacyUrl,
  year,
}: ThingHappenedEmailProps) {
  return (
    <EmailLayout
      statusIconUrl={`${ICONS_CDN}/icon-success.png`}
      supportEmail={supportEmail}
      helpUrl={helpUrl}
      privacyUrl={privacyUrl}
      year={year}
    >
      <Text style={{ ...paragraph, marginTop: 20 }}>Dear Applicant,</Text>

      <Text style={{ ...paragraph, marginTop: 20 }}>Something happened to {companyName}.</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ThingHappenedEmail.PreviewProps = {} satisfies ThingHappenedEmailProps;
```

Notes on that shape:

- **Every value is an optional prop with a placeholder default.** Callers
  override at render time; the tokens let the HTML be used as a string template.
- **`marginTop` on each `Text`** reproduces Figma's group gaps — usually 20px
  between blocks, 12px within a group.
- **`assetBaseUrl` goes to `CtaButton`, not `EmailLayout`.** Only templates with
  a button need it. Passing it to the layout is a type error.
- **`PreviewProps`** is sample data for the `email dev` server, unrelated to the
  removed `<Preview>` component.

## 6. Register it

Two places, or the file will never be built:

1. `scripts/export.tsx` — add the import and an entry to `templates`. Templates
   with a CTA also get `assetBaseUrl={assetBaseUrl}`.
2. `README.md` — add a row to the template table with the Figma node id.

The output filename comes from the `name` in the export entry. Renaming the
generated HTML by hand does not work — the next build regenerates the old name
and leaves your renamed copy behind as a stale orphan.

## 7. Build and verify

```sh
pnpm typecheck
pnpm export
```

Then actually check the output. `tsc` passing proves nothing about the render:

```sh
# the values you expect, and nothing hardcoded
grep -o 'src="[^"]*"' out/your-template.html | sort -u
grep -o 'href="[^"]*"' out/your-template.html | sort -u

# outputs and export targets agree — no orphans
diff <(ls out/*.html | xargs -n1 basename | sed 's/.html//' | sort) \
     <(grep -o 'name: "[a-z-]*"' scripts/export.tsx | sed 's/name: "//;s/"//' | sort)
```

Open it in a browser to compare against Figma side by side:

```sh
open out/your-template.html
```

**Beware grep false negatives.** The export is pretty-printed, so attributes
land on separate lines — `grep 'height="80" src="..."'` will not match even
when the markup is correct. Grep for one attribute at a time, or parse the
block.

There is no linter in this repo; `pnpm typecheck` plus reading the rendered
HTML is the whole gate.

## 8. Commit

One commit per change, pushed to the open PR. Say in the message which Figma
node it implements, and call out anything that deliberately differs from the
design — those divergences are the part reviewers can't see for themselves.

## Pitfalls

- **`<hr>` and `border-radius` degrade in Outlook.** The Word engine adds its
  own margins to `<hr>` and ignores rounded corners. Acceptable today; if
  Outlook fidelity becomes a requirement the fixes are a one-row table and VML.
- **Don't add a second `<Font>`.** React Email emits a `* { font-family }` rule
  per `<Font>`, so a second one overrides Inter everywhere. Apply other faces
  inline — see `monoStack`.
- **Widen the `@font-face` range when you introduce a weight.** A weight outside
  the declared range gets synthesised instead of using the real cut.
- **Padding on a `<table>` is ignored by Outlook.** Use `Block`, or put it on a
  `<td>`.
- **Figma frames disagree with each other.** The same email's phone and wide
  frames have used different placeholder spellings, logo sizes and gaps. Pick
  one, apply it consistently, and say which you picked.
- **A value repeated in two rows is usually a design slip**, not a spec — the
  balance row labelled `{amount}{ccy}` was one. Flag it rather than shipping
  output that reads wrong.

## Getting started with React Email

[React Email](https://react.email/docs/introduction) lets you write an email as
a React component and renders it to the nested-table HTML that mail clients
actually accept. You write JSX; it emits `<table>` soup. Nothing ships to the
browser — React is a build-time tool here, so there is no client bundle, no
hydration, no hooks and no state.

This package pins `react-email` 6 and `@react-email/components` 1.

### Run the preview server

```sh
pnpm install                                     # once, from the repo root
pnpm dev       # http://localhost:3030
```

It lists every file in `emails/`, hot-reloads as you type, and renders each one
using its `PreviewProps`. Use this while building; it is far faster than
exporting and reopening a file. It also has a plain-text view and a "source"
tab showing the generated HTML.

When the design is matched, export the real artefact:

```sh
pnpm export    # writes out/*.html
```

`out/*.html` is what gets committed and handed to whatever sends the mail. The
preview server is a development tool only — never copy HTML out of it.

### The components we use

All from `@react-email/components`. Each one renders to table markup with inline
styles; you style them with a `style` prop, never CSS classes.

| Component                | Renders as                                | Notes                                   |
| ------------------------ | ----------------------------------------- | --------------------------------------- |
| `Html` / `Head` / `Body` | document shell                            | `Html` sets `lang` and `dir`            |
| `Container`              | centred fixed-max-width table             | our shell caps it at 600px              |
| `Row` / `Column`         | `<tr>` / `<td>`                           | the only layout primitive — see `Block` |
| `Text`                   | `<p>` with margins reset                  | body copy                               |
| `Link`                   | `<a target="_blank">`                     |                                         |
| `Img`                    | `<img>`                                   | always pass `width` and `height`        |
| `Button`                 | styled `<a>` plus MSO padding hacks       | not a `<button>`                        |
| `Hr`                     | `<hr>`                                    | we style it with `border-top`           |
| `Font`                   | `@font-face` + a `* { font-family }` rule | one per document, no more               |

### How email HTML differs from web HTML

The constraints that shape everything in this package:

- **Tables for layout.** No flexbox, no grid, no positioning. Vertical rhythm is
  padding on a `<td>` — that is the whole reason `Block` exists.
- **Inline styles only.** A `<style>` block in `<head>` is stripped by Gmail;
  only the `@font-face` and MSO conditionals survive.
- **Outlook uses Word to render.** It ignores `border-radius`, mishandles `<hr>`
  margins, and ignores padding on `<table>`. Assume the Word engine, then let
  better clients look better.
- **Images need explicit dimensions** or they render at intrinsic size, and they
  may be blocked entirely — so never put text in an image, and always set `alt`.
- **No JavaScript, no `:hover` you can rely on, no dark-mode media queries** you
  can count on across clients.
- **Percentages and `max-width` for responsiveness.** Our shell is
  `max-width: 600px; width: 100%`, which is why one render serves phone and
  desktop.

### Rendering outside the export script

`render()` from `@react-email/components` turns a component into a string, which
is what `scripts/export.tsx` does and what a backend would do to send:

```tsx
import { render } from "@react-email/components";
import OtpEmail from "./emails/otp.js";

const html = await render(<OtpEmail code="FUDXUL" />, { pretty: true });
const text = await render(<OtpEmail code="FUDXUL" />, { plainText: true });
```

Pass real values as props at send time rather than string-replacing the
placeholder tokens, if you have the choice — it is type-checked.

### Where to look when stuck

- [react.email/docs](https://react.email/docs/introduction) — component
  reference and per-client support notes.
- [caniemail.com](https://www.caniemail.com) — whether a CSS property actually
  works in Outlook/Gmail. Check here before reaching for anything clever.
- `components/layout.tsx` in this package — the worked example of all of the
  above.
