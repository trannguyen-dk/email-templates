import { Text } from "@react-email/components";

import { Block, EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";
import { Table } from "../../components/table.js";

/**
 * Maker confirmation — a loan repayment request was submitted and is pending
 * review by the company's approver(s). No status icon and no CTA; the frame
 * goes straight from the logo to the greeting.
 * Figma: DK.Notif › node 2590:18072, "email-body" ("Content") frame.
 *
 * Four loan frames share the name "repayment-request-submitted"; this is the
 * maker's copy. The approver notification (2590:18424) and the approved /
 * declined outcomes (2590:18193, 2590:18308) are separate templates.
 */
export interface RepaymentRequestSubmittedEmailProps {
  userName?: string;
  companyName?: string;
  accountNumber?: string;
  /** Amount as it reads in the summary card, e.g. "10,000.00 BTN". */
  repaymentAmount?: string;
}

export default function RepaymentRequestSubmittedEmail({
  userName = "{User's Name}",
  companyName = "{Company Name}",
  accountNumber = "{account_number}",
  repaymentAmount = "{amount}",
}: RepaymentRequestSubmittedEmailProps) {
  return (
    <EmailLayout>
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Your loan repayment request for <strong style={emphasis}>{companyName}</strong> has been
        submitted and is now pending review by your designated approver(s).
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Details are below:</Text>

      <Block paddingTop={16} paddingBottom={16}>
        <Table
          rows={[
            { label: "Loan account no.", value: accountNumber },
            { label: "Repayment amount", value: repaymentAmount },
          ]}
        />
      </Block>

      <Text style={{ ...paragraph, marginTop: 0 }}>Thank you.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

RepaymentRequestSubmittedEmail.PreviewProps = {} satisfies RepaymentRequestSubmittedEmailProps;
