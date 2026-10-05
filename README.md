# email-templates

DK Bank transactional email templates, built with
[React Email](https://react.email). Each template renders to a static HTML file
in `out/` for the sending service to use.

Shared shell (font, logo, status icon, footer with Help/Privacy links) lives in
`components/layout.tsx` (split into `email-header` / `email-body` / `email-footer`
over `email-base`), the brand pill CTA in `components/cta-button.tsx`; templates only
supply the body copy.

Adding a template? Start with [ADDING-A-TEMPLATE.md](ADDING-A-TEMPLATE.md) for
the workflow, and [CONVENTIONS.md](CONVENTIONS.md) for the typography, asset and
content rules these templates follow.

## Commands

```sh
pnpm dev      # live preview at http://localhost:3030
pnpm export   # renders every template to out/<name>.html
```

`export` copies `static/` next to the HTML so `out/*.html` opens locally with
images. The DK logo and the status icons are absolute URLs
on the `notification-email-s3` bucket. Only the button arrow
(`static/arrow-right.png`, a 2x PNG rasterised from the Figma vector) is
local, referenced as `static/arrow-right.png` relative to each output. `export`
copies `static/` next to every HTML file, so previews resolve it. To send these,
host the arrow and update the `src` in `components/cta-button.tsx`.

## Subjects

The subject line is set by the sender, not the HTML. Each template's docblock
carries its subject; the Bhutan Corporate-Onboarding-Portal set, from Figma
file `p06bg93MnerHujJnq1osbQ`:

| Template                                            | Subject                                                                 | Figma node   |
| --------------------------------------------------- | ----------------------------------------------------------------------- | ------------ |
| `onboarding/bhutan/company-profile-resubmission`    | Action Required: Resubmit the Company Profile - DK Bank Application     | `6009-13060` |
| `onboarding/bhutan/document-resubmission`           | Action Required: Documents Needed - DK Bank Application                 | `6006-12588` |
| `onboarding/bhutan/related-party-info-resubmission` | Action Required: Related Party Information Update - DK Bank Application | `6006-12662` |
| `onboarding/bhutan/related-party-idv-submission`    | Please Verify Your Profile - DK Bank                                    | `6009-13349` |
| `onboarding/bhutan/related-party-idv-resubmission`  | Action Required: Re-verify Your Profile – DK Bank Application           | `6009-13444` |

The last subject uses an en dash (`–`) where the others use a hyphen; it is
copied verbatim from the frame.

## Placeholders

Every variable value is an optional prop with a placeholder-token default, so a
rendered file doubles as a string template. Tokens follow the surrounding frame:
Title Case in prose (`{Company Name}`, `{User’s Name}`), snake_case inside the
transaction card (`{account_name}`, `{reference_id}`). See the props interface at
the top of each template for the full list.
