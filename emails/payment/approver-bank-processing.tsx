import { Text } from "@react-email/components";

import { Block, EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";
import { Table } from "../../components/table.js";

/**
 * Initiator notification — the approver signed off and DK Bank is now
 * processing the payment. Sits between `pending-approval` and
 * `debited-success`; nothing has settled yet.
 * Figma: DK.Notif › node 2464:6143, "Content" frame.
 *
 * UNVERIFIED against the frame — the Figma MCP was unreachable when this was
 * written, so the copy follows the sibling payment frames and the spacing
 * follows CONVENTIONS.md.
 *
 * On the icon: `icon-processing` was tried here first on the strength of the
 * name, but its glyph is an arrow entering a box — the inbound counterpart to
 * `icon-outgoing`, and it belongs to `incoming-payment`. This frame is an
 * outbound payment mid-flight, so it uses `icon-pending` (the hourglass),
 * which is direction-neutral and already carries "in progress" elsewhere in
 * the set. Re-check against the frame.
 */
export interface ApproverBankProcessingEmailProps {
  userName?: string;
  /** Amount as it reads in the body copy, e.g. "10,000.00 USD". */
  amount?: string;
  /** Amount for the summary card — unsigned; nothing has settled. */
  paymentAmount?: string;
  accountName?: string;
  accountMasked?: string;
  beneficiaryName?: string;
  beneficiaryMasked?: string;
  referenceId?: string;
  dateTime?: string;
}

export default function ApproverBankProcessingEmail({
  userName = "{User's Name}",
  amount = "{Amount}",
  paymentAmount = "{amount}{ccy}",
  accountName = "{account_name}",
  accountMasked = "***{account_last4}",
  beneficiaryName = "{beneficiary_name}",
  beneficiaryMasked = "***{beneficiary_last4}",
  referenceId = "{reference_id}",
  dateTime = "{date_time}",
}: ApproverBankProcessingEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-pending.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Your payment of <strong style={emphasis}>{amount}</strong> has been approved and is now being
        processed by DK Bank. We will notify you once it has been completed.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Details are below:</Text>

      <Block paddingTop={16} paddingBottom={16}>
        <Table
          rows={[
            { label: "Amount", value: paymentAmount },
            { label: "From", value: accountName, sub: accountMasked },
            { label: "To", value: beneficiaryName, sub: beneficiaryMasked },
            { label: "Reference ID", value: referenceId },
            { label: "Date & time", value: dateTime },
          ]}
        />
      </Block>

      <Text style={{ ...paragraph, marginTop: 0 }}>Thank you for banking with us.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApproverBankProcessingEmail.PreviewProps = {} satisfies ApproverBankProcessingEmailProps;
