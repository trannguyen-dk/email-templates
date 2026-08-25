import { Text } from "@react-email/components";

import { Block, EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";
import { Table } from "../../components/table.js";

/**
 * Maker notification — the loan repayment request was declined by an
 * approver. The declined outcome of the request built as
 * `repayment-request-submitted.tsx`; no CTA. The frame's "declined" icon is
 * the pale circle with a diagonal slash — `icon-blocked`, the same asset the
 * application-declined and rejected-by-approver templates use.
 * Figma: DK.Notif › node 2590:18312, "email-body" ("Content") frame.
 */
export interface RepaymentRequestDeclinedEmailProps {
  userName?: string;
  companyName?: string;
  accountNumber?: string;
  /** Amount as it reads in the summary card, e.g. "10,000.00 BTN". */
  repaymentAmount?: string;
}

export default function RepaymentRequestDeclinedEmail({
  userName = "{User's Name}",
  companyName = "{Company Name}",
  accountNumber = "{account_number}",
  repaymentAmount = "{amount}",
}: RepaymentRequestDeclinedEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-blocked.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Your loan repayment request for <strong style={emphasis}>{companyName}</strong> has been
        declined.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Please contact your approver for further details on this decision. You may submit a new
        repayment request if needed.
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

RepaymentRequestDeclinedEmail.PreviewProps = {} satisfies RepaymentRequestDeclinedEmailProps;
