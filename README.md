# email-templates

DK Bank transactional email templates, built with
[React Email](https://react.email). Each template renders to a static HTML file
in `out/` for the sending service to use.

| Template                                                                   | Source                                       | Figma node  |
| -------------------------------------------------------------------------- | -------------------------------------------- | ----------- |
| "Form Approved" — company KYC completed                                    | `emails/onboarding/kyc-completed.tsx`                   | `1347-7090` |
| Application received — pending review by the company's approver(s)         | `emails/application-pending.tsx`             | `2464-3892` |
| Approver notification — an account opening application awaits review       | `emails/onboarding/application-pending-approver.tsx`    | `2464-3996` |
| Account opening application returned for revision by an approver           | `emails/onboarding/application-returned-applicant.tsx`  | `2464-4246` |
| Approver notification — the applicant's form was returned for revision     | `emails/onboarding/application-returned-approver.tsx`   | `2464-4339` |
| Applicant notification — signed off by all approvers, in final processing  | `emails/onboarding/application-approved.tsx`            | `2464-4144` |
| Applicant/approver notification — declined by an approver                  | `emails/onboarding/application-declined.tsx`            | `2464-4427` |
| Approver notification — the applicant cancelled the onboarding application | `emails/application-cancelled-approver.tsx`  | `1389-7986` |
| Applicant notification — the onboarding application was cancelled          | `emails/onboarding/application-cancelled-applicant.tsx` | `2464-4525` |
| Corporate account successfully opened — welcome / first log-in             | `emails/onboarding/account-opened.tsx`                  | `2464-4707` |
| One-time password for the DK Onboarding Portal                             | `emails/onboarding/otp.tsx`                             | `2307-2034` |
| Outgoing payment confirmation with a transaction summary                   | `emails/payment-debit.tsx`                   | `2417-2174` |
| A payment is waiting for the approver's sign-off                           | `emails/payment-approval.tsx`                | `2354-6745` |

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

## Placeholders

Every variable value is an optional prop with a placeholder-token default, so a
rendered file doubles as a string template. Tokens follow the surrounding frame:
Title Case in prose (`{Company Name}`, `{User’s Name}`), snake_case inside the
transaction card (`{account_name}`, `{reference_id}`). See the props interface at
the top of each template for the full list.
