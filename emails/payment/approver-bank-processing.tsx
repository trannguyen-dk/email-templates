import { Text } from "@react-email/components";

import { Block, EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";
import { Table } from "../../components/table.js";

/**
 * Initiator notification — the approver signed off and DK Bank is now
 * processing the payment. Sits between `pending-approval` and
 * `debited-success`; nothing has settled yet.
 * Figma: DK.Notif › node 2464:6143, "Content" frame.
 *
 * The one frame in the set with no status icon: the body goes straight from
 * the wordmark to the greeting, so `statusIconUrl` is deliberately omitted.
 * The summary card carries the signed amount and no date row — the payment
 * has no settlement timestamp yet.
 */
export interface ApproverBankProcessingEmailProps {
  userName?: string;
  /** Reference as it reads in the body copy, rendered after a "#". */
  paymentRef?: string;
  /** Signed amount for the summary card, e.g. "-10,000.00 USD". */
  debitAmount?: string;
  accountName?: string;
  accountMasked?: string;
  beneficiaryName?: string;
  beneficiaryMasked?: string;
  referenceId?: string;
}

export default function ApproverBankProcessingEmail({
  userName = "{User's Name}",
  paymentRef = "{Reference ID}",
  debitAmount = "-{amount}{ccy}",
  accountName = "{account_name}",
  accountMasked = "***{account_last4}",
  beneficiaryName = "{beneficiary_name}",
  beneficiaryMasked = "***{beneficiary_last4}",
  referenceId = "{reference_id}",
}: ApproverBankProcessingEmailProps) {
  return (
    <EmailLayout>
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Payment <strong style={emphasis}>#{paymentRef}</strong> has been approved and submitted to
        the bank. The transaction is currently being processed.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Payment details are below:</Text>

      <Block paddingTop={16} paddingBottom={16}>
        <Table
          rows={[
            { label: "Amount", value: debitAmount },
            { label: "From", value: accountName, sub: accountMasked },
            { label: "To", value: beneficiaryName, sub: beneficiaryMasked },
            { label: "Reference ID", value: referenceId },
          ]}
        />
      </Block>

      <Text style={{ ...paragraph, marginTop: 0 }}>Thank you for choosing DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApproverBankProcessingEmail.PreviewProps = {} satisfies ApproverBankProcessingEmailProps;
