/**
 * Renders every template in ../emails to static HTML in ../out, preserving the
 * folder grouping (e.g. emails/onboarding/x.tsx -> out/onboarding/x.html,
 * emails/onboarding/bhutan/y.tsx -> out/onboarding/bhutan/y.html).
 *
 *   pnpm export
 *
 * Every image, the CTA arrow included, is an absolute URL, so outputs do not
 * depend on their folder depth and nothing is copied next to them.
 */
import { render } from "@react-email/components";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import AccountStatementEmail from "../emails/account/account-statement.js";
import DocExpiryEmail from "../emails/account/doc-expiry.js";
import FdMonthlySubscriptionEmail from "../emails/account/fd-monthly-subscription.js";
import FdPlacedEmail from "../emails/account/fd-placed.js";
import FixedDepositMaturityEmail from "../emails/account/fd-maturity-alert.js";
import AccountOpenedEmail from "../emails/onboarding/account-opened.js";
import ApplicationApprovedEmail from "../emails/onboarding/application-approved.js";
import ApplicationCancelledApplicantEmail from "../emails/onboarding/application-cancelled-applicant.js";
import ApplicationCancelledEmail from "../emails/onboarding/application-cancelled.js";
import ApplicationDeclinedEmail from "../emails/onboarding/application-declined.js";
import ApplicationPendingApplicantEmail from "../emails/onboarding/application-pending-applicant.js";
import ApplicationPendingApproverEmail from "../emails/onboarding/application-pending-approver.js";
import ApplicationReturnedApplicantEmail from "../emails/onboarding/application-returned-applicant.js";
import ApplicationReturnedApproverEmail from "../emails/onboarding/application-returned-approver.js";
import CompanyProfileResubmissionEmail from "../emails/onboarding/bhutan/company-profile-resubmission.js";
import DocumentResubmissionEmail from "../emails/onboarding/bhutan/document-resubmission.js";
import KycCompletedEmail from "../emails/onboarding/kyc-completed.js";
import LoginSuccessEmail from "../emails/onboarding/login-success.js";
import OtpEmail from "../emails/onboarding/otp.js";
import RelatedPartyIdvResubmissionEmail from "../emails/onboarding/bhutan/related-party-idv-resubmission.js";
import RelatedPartyIdvSubmissionEmail from "../emails/onboarding/bhutan/related-party-idv-submission.js";
import RelatedPartyInfoResubmissionEmail from "../emails/onboarding/bhutan/related-party-info-resubmission.js";
import OpenAdditionalMcaEmail from "../emails/account/open-additional-MCA.js";
import FailedRepaymentEmail from "../emails/loan/failed-repayment.js";
import OverdueReminderEmail from "../emails/loan/overdue-reminder.js";
import PaymentDueReminderEmail from "../emails/loan/payment-due-reminder.js";
import RepaymentReceivedEmail from "../emails/loan/repayment-received.js";
import RepaymentRequestApprovedEmail from "../emails/loan/repayment-request-approved.js";
import RepaymentRequestDeclinedEmail from "../emails/loan/repayment-request-declined.js";
import RepaymentRequestPendingApproverEmail from "../emails/loan/repayment-request-pending-approver.js";
import RepaymentRequestSubmittedEmail from "../emails/loan/repayment-request-submitted.js";
import ApproverBankProcessingEmail from "../emails/payment/approver-bank-processing.js";
import BeneficiaryAccCreditedEmail from "../emails/payment/beneficiary-acc-credited.js";
import FailedEmail from "../emails/payment/failed.js";
import IncomingPaymentEmail from "../emails/payment/incoming-payment.js";
import ModifyPaymentEmail from "../emails/payment/modify-payment.js";
import InterestEmail from "../emails/others/interest.js";
import MinBalanceFeeEmail from "../emails/others/min-balance-fee.js";
import MaintenanceFeeEmail from "../emails/others/maintenance-fee.js";
import ManualAdjustmentEmail from "../emails/others/manual-adjustment.js";
import MerchantSettlementEmail from "../emails/others/merchant-settlement.js";
import DebitedSuccessEmail from "../emails/payment/debited-success.js";
import PendingApprovalEmail from "../emails/payment/pending-approval.js";
import RejectedByApproverEmail from "../emails/payment/rejected-by-approver.js";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const outDir = resolve(root, "out");

const templates = [
  { name: "account/fd-maturity-alert", element: <FixedDepositMaturityEmail /> },
  { name: "account/account-statement", element: <AccountStatementEmail /> },
  { name: "account/doc-expiry", element: <DocExpiryEmail /> },
  {name: "account/fd-monthly-subscription",element: <FdMonthlySubscriptionEmail />},
  { name: "account/fd-placed", element: <FdPlacedEmail /> },
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
  { name: "onboarding/login-success", element: <LoginSuccessEmail /> },
  {
    name: "onboarding/bhutan/company-profile-resubmission",
    element: <CompanyProfileResubmissionEmail />,
  },
  { name: "onboarding/bhutan/document-resubmission", element: <DocumentResubmissionEmail /> },
  {
    name: "onboarding/bhutan/related-party-info-resubmission",
    element: <RelatedPartyInfoResubmissionEmail />,
  },
  {
    name: "onboarding/bhutan/related-party-idv-submission",
    element: <RelatedPartyIdvSubmissionEmail />,
  },
  {
    name: "onboarding/bhutan/related-party-idv-resubmission",
    element: <RelatedPartyIdvResubmissionEmail />,
  },
  {
    name: "account/open-additional-MCA",
    element: <OpenAdditionalMcaEmail />,
  },
  { name: "loan/failed-repayment", element: <FailedRepaymentEmail /> },
  { name: "loan/overdue-reminder", element: <OverdueReminderEmail /> },
  { name: "loan/payment-due-reminder", element: <PaymentDueReminderEmail /> },
  { name: "loan/repayment-received", element: <RepaymentReceivedEmail /> },
  { name: "loan/repayment-request-approved", element: <RepaymentRequestApprovedEmail /> },
  { name: "loan/repayment-request-declined", element: <RepaymentRequestDeclinedEmail /> },
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
  { name: "others/maintenance-fee", element: <MaintenanceFeeEmail /> },
  { name: "others/min-balance-fee", element: <MinBalanceFeeEmail /> },
  { name: "others/manual-adjustment", element: <ManualAdjustmentEmail /> },
  { name: "others/merchant-settlement", element: <MerchantSettlementEmail /> },
  { name: "others/interest", element: <InterestEmail /> },
];

mkdirSync(outDir, { recursive: true });

for (const { name, element } of templates) {
  const html = await render(element, { pretty: true });
  const file = resolve(outDir, `${name}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log(`wrote ${file} (${html.length} bytes)`);
}
