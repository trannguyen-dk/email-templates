/**
 * Renders every template in ../emails to static HTML in ../out.
 *
 *   pnpm --filter @crypto-dashboard/emails export
 *   EMAIL_ASSET_BASE_URL=https://cdn.example.com/emails pnpm --filter @crypto-dashboard/emails export
 *
 * Without EMAIL_ASSET_BASE_URL the HTML references `static/…` relative to the
 * output file, and `static/` is copied next to it so the file previews locally.
 */
import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "@react-email/components";

import AccountOpenedEmail from "../emails/account-opened.js";
import PaymentDebitEmail from "../emails/payment-debit.js";
import PaymentApprovalEmail from "../emails/payment-approval.js";
import OtpEmail from "../emails/otp.js";
import ApplicationApprovedEmail from "../emails/application-approved.js";
import ApplicationCancelledEmail from "../emails/application-cancelled.js";
import ApplicationCancelledApproverEmail from "../emails/application-cancelled-approver.js";
import ApplicationDeclinedEmail from "../emails/application-declined.js";
import ApplicationPendingEmail from "../emails/application-pending.js";
import ApplicationReturnedApproverEmail from "../emails/application-returned-approver.js";
import ApplicationReturnedEmail from "../emails/application-returned.js";
import ApprovalRequiredEmail from "../emails/approval-required.js";
import KycCompletedEmail from "../emails/kyc-completed.js";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const outDir = resolve(root, "out");
const assetBaseUrl = process.env.EMAIL_ASSET_BASE_URL?.replace(/\/$/, "") ?? "static";

const templates = [
  { name: "kyc-completed", element: <KycCompletedEmail assetBaseUrl={assetBaseUrl} /> },
  { name: "application-pending", element: <ApplicationPendingEmail /> },
  { name: "approval-required", element: <ApprovalRequiredEmail assetBaseUrl={assetBaseUrl} /> },
  {
    name: "application-returned",
    element: <ApplicationReturnedEmail assetBaseUrl={assetBaseUrl} />,
  },
  { name: "application-returned-approver", element: <ApplicationReturnedApproverEmail /> },
  { name: "application-approved", element: <ApplicationApprovedEmail /> },
  { name: "application-declined", element: <ApplicationDeclinedEmail /> },
  { name: "application-cancelled-approver", element: <ApplicationCancelledApproverEmail /> },
  { name: "application-cancelled", element: <ApplicationCancelledEmail /> },
  { name: "account-opened", element: <AccountOpenedEmail assetBaseUrl={assetBaseUrl} /> },
  { name: "otp", element: <OtpEmail /> },
  { name: "payment-debit", element: <PaymentDebitEmail /> },
  {
    name: "payment-approval",
    element: <PaymentApprovalEmail assetBaseUrl={assetBaseUrl} />,
  },
];

mkdirSync(outDir, { recursive: true });
if (assetBaseUrl === "static") {
  cpSync(resolve(root, "static"), resolve(outDir, "static"), { recursive: true });
}

for (const { name, element } of templates) {
  const html = await render(element, { pretty: true });
  const file = resolve(outDir, `${name}.html`);
  writeFileSync(file, html);
  console.log(`wrote ${file} (${html.length} bytes, assets → ${assetBaseUrl}/)`);
}
