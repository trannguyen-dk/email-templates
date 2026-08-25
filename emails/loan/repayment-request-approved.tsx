import { Text } from "@react-email/components";

import { Block, EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";
import { Table } from "../../components/table.js";

/**
 * Maker notification — the loan repayment request was approved and will be
 * processed against the facility. The approved outcome of the request built
 * as `repayment-request-submitted.tsx`; no CTA.
 * Figma: DK.Notif › node 2590:18197, "email-body" ("Content") frame.
 */
export interface RepaymentRequestApprovedEmailProps {
  userName?: string;
  companyName?: string;
  accountNumber?: string;
  /** Amount as it reads in the summary card, e.g. "10,000.00 BTN". */
  repaymentAmount?: string;
}

export default function RepaymentRequestApprovedEmail({
  userName = "{User's Name}",
  companyName = "{Company Name}",
  accountNumber = "{account_number}",
  repaymentAmount = "{amount}",
}: RepaymentRequestApprovedEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-success.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Your loan repayment request for <strong style={emphasis}>{companyName}</strong> has been
        approved.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        This repayment will now be processed against the loan facility.
      </Text>

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

RepaymentRequestApprovedEmail.PreviewProps = {} satisfies RepaymentRequestApprovedEmailProps;
