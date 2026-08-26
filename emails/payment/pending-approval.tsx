import { Text } from "@react-email/components";

import { Button } from "../../components/button.js";
import { Block, EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";
import { Table } from "../../components/table.js";

/**
 * Approver notification — a payment is held awaiting authorisation, with a
 * review deadline. The approval gate that precedes `debited-success`.
 * Figma: DK.Notif › node 2464:5233, "Content" frame.
 *
 * Matched to the frame. One deliberate divergence: the frame annotates the
 * logo -> status icon gap as `gap/20`, but the shell uses `M.iconGap = 32`
 * (CONVENTIONS.md § Spacing, which overrides the frame and is shared by every
 * template). Left at 32; the frame should be updated.
 */
export interface PendingApprovalEmailProps {
  userName?: string;
  /** Reference as it reads in the body copy, rendered after a "#". */
  paymentRef?: string;
  /** Amount as it reads in the body copy, e.g. "10,000.00 USD". */
  amount?: string;
  /** Deadline as it reads in the body copy, e.g. "13:20 PM, 24 July 2026". */
  reviewBy?: string;
  /** Signed amount for the summary card, e.g. "-10,000.00 USD". */
  debitAmount?: string;
  accountName?: string;
  accountMasked?: string;
  beneficiaryName?: string;
  beneficiaryMasked?: string;
  currentBalance?: string;
  referenceId?: string;
  dateTime?: string;
  approveUrl?: string;
}

export default function PendingApprovalEmail({
  userName = "{User's Name}",
  paymentRef = "{Reference ID}",
  amount = "{Amount}",
  reviewBy = "{Review Deadline}",
  debitAmount = "-{amount}{ccy}",
  accountName = "{account_name}",
  accountMasked = "***{account_last4}",
  beneficiaryName = "{beneficiary_name}",
  beneficiaryMasked = "***{beneficiary_last4}",
  currentBalance = "{balance}{ccy}",
  referenceId = "{reference_id}",
  dateTime = "{date_time}",
  approveUrl = "https://cibs-gmc.uat.digitalkidu.bt/uatonebank/66666666_default/h5/53000001-1.0.46.0/html/www/index.html#/login",
}: PendingApprovalEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-pending.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Payment <strong style={emphasis}>#{paymentRef}</strong> for{" "}
        <strong style={emphasis}>{amount}</strong> is waiting for your approval.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Please review <strong style={emphasis}>by {reviewBy}</strong>.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Payment details are below:</Text>

      <Block paddingTop={16} paddingBottom={0}>
        <Table
          rows={[
            { label: "Amount", value: debitAmount },
            { label: "From", value: accountName, sub: accountMasked },
            { label: "To", value: beneficiaryName, sub: beneficiaryMasked },
            { label: "Current balance", value: currentBalance },
            { label: "Reference ID", value: referenceId },
            { label: "Date & time", value: dateTime },
          ]}
        />
      </Block>

      <Button href={approveUrl}>Review payment</Button>

      <Text style={{ ...paragraphDark, marginTop: 0 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

PendingApprovalEmail.PreviewProps = {} satisfies PendingApprovalEmailProps;
