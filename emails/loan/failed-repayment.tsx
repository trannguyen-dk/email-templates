import { Link, Text } from "@react-email/components";

import { Button } from "../../components/button.js";
import {
  Block,
  EmailLayout,
  SUPPORT_EMAIL,
  emphasis,
  inlineLink,
  paragraph,
  paragraphDark,
} from "../../components/layout.js";
import { Table } from "../../components/table.js";

/**
 * Loan repayment failure — a scheduled repayment on the company's corporate
 * loan facility could not be processed for insufficient funds, with an
 * "Add fund" CTA to the banking portal.
 * Figma: DK.Notif › node 2590:17626, "email-body" ("Content") frame.
 *
 * The frame's button instance exports its label as the component default
 * ("Default"); the frame itself renders "Add fund", which is what ships.
 */
export interface FailedRepaymentEmailProps {
  userName?: string;
  companyName?: string;
  accountNumber?: string;
  /** Amount as it reads in the summary card, e.g. "10,000.00 BTN". */
  amountDue?: string;
  /** Attempted date as it reads in the summary card, e.g. "05 09 2026". */
  attemptedDate?: string;
  addFundUrl?: string;
  supportEmail?: string;
}

export default function FailedRepaymentEmail({
  userName = "{User's Name}",
  companyName = "{Company Name}",
  accountNumber = "{account_number}",
  amountDue = "{amount}",
  attemptedDate = "{DD MM YYYY}",
  addFundUrl = "https://cibs-gmc.uat.digitalkidu.bt/uatonebank/66666666_default/h5/53000001-1.0.46.0/html/www/index.html#/login",
  supportEmail = SUPPORT_EMAIL,
}: FailedRepaymentEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-warning.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        We were unable to process a scheduled loan repayment for {companyName}'s corporate loan
        facility due to insufficient funds in the designated repayment account.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Details are below:</Text>

      <Block paddingTop={16} paddingBottom={16}>
        <Table
          rows={[
            { label: "Loan account no.", value: accountNumber },
            { label: "Amount due", value: amountDue },
            { label: "Attempted date", value: attemptedDate },
          ]}
        />
      </Block>

      <Text style={{ ...paragraph, marginTop: 0 }}>
        Please ensure sufficient funds are available as soon as possible to avoid late payment
        charges and potential impact to your facility status.
      </Text>

      <Button href={addFundUrl}>Add fund</Button>

      <Text style={{ ...paragraph, marginTop: 0 }}>
        If you believe this is an error or need assistance, please contact our team at{" "}
        <Link href={`mailto:${supportEmail}`} style={inlineLink}>
          {supportEmail}
        </Link>
        .
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Thank you for your prompt attention to this matter.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

FailedRepaymentEmail.PreviewProps = {} satisfies FailedRepaymentEmailProps;
