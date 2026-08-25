/**
 * Renders every template in ../emails to static HTML in ../out, preserving the
 * folder grouping (e.g. emails/onboarding/x.tsx -> out/onboarding/x.html).
 *
 *   pnpm export
 *
 * The only local asset is the CTA arrow. Output HTML points at the repo's single
 * `static/arrow-right.png` via `../../`, so nothing is copied — which assumes an
 * output path of `out/<flow>/<name>.html`. Every other image is an absolute URL.
 */
import { render } from "@react-email/components";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import AccountOpenedEmail from "../emails/onboarding/account-opened.js";
import ApplicationApprovedEmail from "../emails/onboarding/application-approved.js";
import ApplicationCancelledApplicantEmail from "../emails/onboarding/application-cancelled-applicant.js";
import ApplicationCancelledEmail from "../emails/onboarding/application-cancelled.js";
import ApplicationDeclinedEmail from "../emails/onboarding/application-declined.js";
import ApplicationPendingApplicantEmail from "../emails/onboarding/application-pending-applicant.js";
import ApplicationPendingApproverEmail from "../emails/onboarding/application-pending-approver.js";
import ApplicationReturnedApplicantEmail from "../emails/onboarding/application-returned-applicant.js";
import ApplicationReturnedApproverEmail from "../emails/onboarding/application-returned-approver.js";
import KycCompletedEmail from "../emails/onboarding/kyc-completed.js";
import OtpEmail from "../emails/onboarding/otp.js";
import OpenAdditionalMcaEmail from "../emails/account/open-additional-MCA.js";
import FailedRepaymentEmail from "../emails/loan/failed-repayment.js";
import OverdueReminderEmail from "../emails/loan/overdue-reminder.js";
import PaymentDueReminderEmail from "../emails/loan/payment-due-reminder.js";
import RepaymentReceivedEmail from "../emails/loan/repayment-received.js";
import RepaymentRequestPendingApproverEmail from "../emails/loan/repayment-request-pending-approver.js";
import RepaymentRequestSubmittedEmail from "../emails/loan/repayment-request-submitted.js";
import ApproverBankProcessingEmail from "../emails/payment/approver-bank-processing.js";
import BeneficiaryAccCreditedEmail from "../emails/payment/beneficiary-acc-credited.js";
import FailedEmail from "../emails/payment/failed.js";
import IncomingPaymentEmail from "../emails/payment/incoming-payment.js";
import ModifyPaymentEmail from "../emails/payment/modify-payment.js";
import DebitedSuccessEmail from "../emails/payment/debited-success.js";
import PendingApprovalEmail from "../emails/payment/pending-approval.js";
import RejectedByApproverEmail from "../emails/payment/rejected-by-approver.js";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const outDir = resolve(root, "out");

const templates = [
  { name: "onboarding/account-opened", element: <AccountOpenedEmail /> },
  { name: "onboarding/kyc-completed", element: <KycCompletedEmail /> },
  { name: "onboarding/application-cancelled", element: <ApplicationCancelledEmail /> },
  {
    name: "onboarding/application-pending-applicant",
    element: <ApplicationPendingApplicantEmail />,
  },
  {
    name: "onboarding/application-pending-approver",
    element: <ApplicationPendingApproverEmail />,
  },
  {
    name: "onboarding/application-returned-applicant",
    element: <ApplicationReturnedApplicantEmail />,
  },
  { name: "onboarding/application-returned-approver", element: <ApplicationReturnedApproverEmail /> },
  { name: "onboarding/application-approved", element: <ApplicationApprovedEmail /> },
  { name: "onboarding/application-declined", element: <ApplicationDeclinedEmail /> },
  {
    name: "onboarding/application-cancelled-applicant",
    element: <ApplicationCancelledApplicantEmail />,
  },
  { name: "onboarding/otp", element: <OtpEmail /> },
  {
    name: "account/open-additional-MCA",
    element: <OpenAdditionalMcaEmail />,
  },
  { name: "loan/failed-repayment", element: <FailedRepaymentEmail /> },
  { name: "loan/overdue-reminder", element: <OverdueReminderEmail /> },
  { name: "loan/payment-due-reminder", element: <PaymentDueReminderEmail /> },
  { name: "loan/repayment-received", element: <RepaymentReceivedEmail /> },
  {
    name: "loan/repayment-request-pending-approver",
    element: <RepaymentRequestPendingApproverEmail />,
  },
  { name: "loan/repayment-request-submitted", element: <RepaymentRequestSubmittedEmail /> },
  { name: "payment/debited-success", element: <DebitedSuccessEmail /> },
  {
    name: "payment/beneficiary-acc-credited",
    element: <BeneficiaryAccCreditedEmail />,
  },
  { name: "payment/pending-approval", element: <PendingApprovalEmail /> },
  { name: "payment/modify-payment", element: <ModifyPaymentEmail /> },
  { name: "payment/rejected-by-approver", element: <RejectedByApproverEmail /> },
  { name: "payment/approver-bank-processing", element: <ApproverBankProcessingEmail /> },
  { name: "payment/failed", element: <FailedEmail /> },
  { name: "payment/incoming-payment", element: <IncomingPaymentEmail /> },
];

mkdirSync(outDir, { recursive: true });

for (const { name, element } of templates) {
  const html = await render(element, { pretty: true });
  const file = resolve(outDir, `${name}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log(`wrote ${file} (${html.length} bytes)`);
}
