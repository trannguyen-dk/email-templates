import { Text } from "@react-email/components";

import { Block, EmailLayout, paragraph, paragraphDark } from "../../components/layout.js";
import { Table } from "../../components/table.js";

/**
 * Loan repayment reminder — a repayment on the company's corporate loan
 * facility is coming due, with the loan account, amount and due date.
 * Figma: DK.Notif › node 2585:17309, "email-body" frame (2585:17339).
 * The section's second payment-due-reminder frame (2585:17497) is the same
 * copy at a wider width — one fluid render serves both.
 *
 * The status icon is `icon-warning` — the dark exclamation-mark circle the
 * frame draws. CONVENTIONS.md § Assets lists it as retired because no frame
 * used it at the time; the loan section now does, so it is back in use. The
 * hosted asset is currently 128x128 (off the 96x96 grid) and renders at the
 * standard 64x64.
 */
export interface PaymentDueReminderEmailProps {
  companyName?: string;
  accountNumber?: string;
  /** Amount as it reads in the summary card, e.g. "10,000.00 BTN". */
  amountDue?: string;
  /** Due date as it reads in the summary card, e.g. "05 09 2026". */
  dueDate?: string;
}

export default function PaymentDueReminderEmail({
  companyName = "{Company Name}",
  accountNumber = "{account_number}",
  amountDue = "{amount}",
  dueDate = "{DD MM YYYY}",
}: PaymentDueReminderEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-warning.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear Customer,</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        This is a reminder that a repayment is due on the corporate loan facility held by{" "}
        {companyName} with DK Bank.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Details are below:</Text>

      <Block paddingTop={16} paddingBottom={16}>
        <Table
          rows={[
            { label: "Loan account no.", value: accountNumber },
            { label: "Amount due", value: amountDue },
            { label: "Due date", value: dueDate },
          ]}
        />
      </Block>

      <Text style={{ ...paragraph, marginTop: 0 }}>
        Please ensure sufficient funds are available in the designated repayment account by the due
        date to avoid any late payment charges.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Alternatively, if payment has already been arranged, please disregard this notice.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Thank you.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

PaymentDueReminderEmail.PreviewProps = {} satisfies PaymentDueReminderEmailProps;
