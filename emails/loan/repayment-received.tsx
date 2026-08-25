import { Text } from "@react-email/components";

import { Block, EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";
import { Table } from "../../components/table.js";

/**
 * Loan repayment confirmation — a repayment on the company's corporate loan
 * facility was received successfully, with the amount and loan account.
 * Figma: DK.Notif › node 2585:17497, "email-body" frame (2585:17501).
 *
 * The frame is named "loan / payment-due-reminder" in Figma, same as the
 * reminder frame (2585:17309), but its copy is a received confirmation —
 * a naming slip in the design file, flagged per ADDING-A-TEMPLATE.md
 * § Pitfalls. Named for what the email is, not what the frame is called.
 */
export interface RepaymentReceivedEmailProps {
  userName?: string;
  companyName?: string;
  /** Amount as it reads in the summary card, e.g. "10,000.00 BTN". */
  amount?: string;
  accountNumber?: string;
}

export default function RepaymentReceivedEmail({
  userName = "{User's Name}",
  companyName = "{Company Name}",
  amount = "{amount}",
  accountNumber = "{account_number}",
}: RepaymentReceivedEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-success.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        We have successfully received a loan repayment for {companyName}'s corporate loan facility.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Details are below:</Text>

      <Block paddingTop={16} paddingBottom={16}>
        <Table
          rows={[
            { label: "Amount", value: amount },
            { label: "Loan account no.", value: accountNumber },
          ]}
        />
      </Block>

      <Text style={{ ...paragraph, marginTop: 0 }}>Thank you for your payment.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

RepaymentReceivedEmail.PreviewProps = {} satisfies RepaymentReceivedEmailProps;
