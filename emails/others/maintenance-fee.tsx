import { Text } from "@react-email/components";

import { EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";

/**
 * Account-holder notification — the monthly maintenance fee was debited, with
 * the billing period. No summary card and no CTA.
 * Figma: DK.Notif › node 2464:6494, "email-body" ("Content") frame.
 *
 * The frame writes placeholders in square brackets ([User's Name], [Amount],
 * [Account No.]); shipped as curly-brace tokens per CONVENTIONS.md § Content.
 * The period line shows sample data ("September 2026"), replaced with
 * {Month YYYY}. The status icon is `icon-fee` — the stacked-coins glyph the
 * frame draws, hosted but previously unused (128x128, rendered at the
 * standard 64x64).
 */
export interface MaintenanceFeeEmailProps {
  userName?: string;
  /** Fee as it reads in the body copy, e.g. "5.00 USD". */
  amount?: string;
  accountNo?: string;
  /** Billing period as it reads in the body copy, e.g. "September 2026". */
  period?: string;
}

export default function MaintenanceFeeEmail({
  userName = "{User's Name}",
  amount = "{Amount}",
  accountNo = "{Account No.}",
  period = "{Month YYYY}",
}: MaintenanceFeeEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-fee.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        The monthly maintenance fee of <strong style={emphasis}>{amount}</strong> for your account{" "}
        <strong style={emphasis}>{accountNo}</strong> has been debited.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Period: {period}</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Thank you for choosing DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

MaintenanceFeeEmail.PreviewProps = {} satisfies MaintenanceFeeEmailProps;
