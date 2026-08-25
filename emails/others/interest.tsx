import { Text } from "@react-email/components";

import { EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";

/**
 * Account-holder notification — interest for a period was credited to the
 * account, with the net amount inline. No summary card and no CTA.
 * Figma: DK.Notif › node 2464:15521, "email-body" ("Content") frame.
 *
 * The frame writes placeholders in square brackets ([User's Name],
 * [Start Date], [End Date], [Amount]); shipped as curly-brace tokens per
 * CONVENTIONS.md § Content. Same green inbound `icon-processing` as the
 * incoming-payment and merchant-settlement frames.
 */
export interface InterestEmailProps {
  userName?: string;
  /** Period start as it reads in the body copy, e.g. "1 June 2026". */
  startDate?: string;
  /** Period end as it reads in the body copy, e.g. "30 June 2026". */
  endDate?: string;
  /** Net interest as it reads in the body copy, e.g. "125.00 USD". */
  amount?: string;
}

export default function InterestEmail({
  userName = "{User's Name}",
  startDate = "{Start Date}",
  endDate = "{End Date}",
  amount = "{Amount}",
}: InterestEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-processing.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Interest for the period <strong style={emphasis}>{startDate}</strong> to{" "}
        <strong style={emphasis}>{endDate}</strong> has been credited to your account.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Net amount: <strong style={emphasis}>{amount}</strong>
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Thank you for banking with us.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

InterestEmail.PreviewProps = {} satisfies InterestEmailProps;
