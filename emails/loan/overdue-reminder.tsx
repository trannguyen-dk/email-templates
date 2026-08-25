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
 * Loan overdue notice — the company's corporate loan facility has an overdue
 * repayment, with a "Make a repayment" CTA to the banking portal.
 * Figma: DK.Notif › node 2590:17928, "email-body" ("Content") frame.
 *
 * The frame writes the company placeholder as square-bracket
 * "[Company name]"; shipped as {Company Name}, the token style every other
 * frame and CONVENTIONS.md § Content use. The button instance exports the
 * component-default label ("Default"); the frame renders "Make a repayment",
 * which is what ships.
 */
export interface OverdueReminderEmailProps {
  userName?: string;
  companyName?: string;
  accountNumber?: string;
  /** Amount as it reads in the summary card, e.g. "10,000.00 BTN". */
  amountDue?: string;
  repaymentUrl?: string;
  supportEmail?: string;
}

export default function OverdueReminderEmail({
  userName = "{User's Name}",
  companyName = "{Company Name}",
  accountNumber = "{account_number}",
  amountDue = "{amount}",
  repaymentUrl = "https://cibs-gmc.uat.digitalkidu.bt/uatonebank/66666666_default/h5/53000001-1.0.46.0/html/www/index.html#/login",
  supportEmail = SUPPORT_EMAIL,
}: OverdueReminderEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-warning.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Please note that {companyName}'s corporate loan facility is currently overdue.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Details are below:</Text>

      <Block paddingTop={16} paddingBottom={16}>
        <Table
          rows={[
            { label: "Loan account no.", value: accountNumber },
            { label: "Amount due", value: amountDue },
          ]}
        />
      </Block>

      <Text style={{ ...paragraph, marginTop: 0 }}>
        Please arrange settlement as soon as possible to avoid late payment charges and any impact
        to your facility status.
      </Text>

      <Button href={repaymentUrl}>Make a repayment</Button>

      <Text style={{ ...paragraph, marginTop: 0 }}>
        If you have already made payment, please disregard this notice.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        For any questions, please contact our team at{" "}
        <Link href={`mailto:${supportEmail}`} style={inlineLink}>
          {supportEmail}
        </Link>
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Thank you for your prompt attention to this matter.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

OverdueReminderEmail.PreviewProps = {} satisfies OverdueReminderEmailProps;
