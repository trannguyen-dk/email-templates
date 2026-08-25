import { Text } from "@react-email/components";

import { EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";

/**
 * Account-holder notification — a fee was applied because the account's
 * average balance for the month fell below the required minimum. No summary
 * card and no CTA.
 * Figma: DK.Notif › node 2464:6768, "email-body" ("Content") frame.
 *
 * The frame is named "outgoing-payment / maintenance-fee" like the monthly
 * fee frame (2464:6490, built as `maintenance-fee.tsx`), but its copy is the
 * minimum-balance fee — a naming slip; named for what the email is.
 * Placeholders are written in square brackets in the frame; shipped as
 * curly-brace tokens per CONVENTIONS.md § Content. Same stacked-coins
 * `icon-fee` as the monthly fee.
 */
export interface MinBalanceFeeEmailProps {
  userName?: string;
  /** Fee as it reads in the body copy, e.g. "5.00 USD". */
  amount?: string;
  /** Month whose average balance fell short, e.g. "September". */
  month?: string;
  /** Required minimum average balance, as it reads in the body copy. */
  minBalance?: string;
}

export default function MinBalanceFeeEmail({
  userName = "{User's Name}",
  amount = "{Amount}",
  month = "{Month}",
  minBalance = "{Min. Amount}",
}: MinBalanceFeeEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-fee.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        A fee of <strong style={emphasis}>{amount}</strong> was applied because the average balance
        for {month} was below the required {minBalance}.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Thank you for choosing DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

MinBalanceFeeEmail.PreviewProps = {} satisfies MinBalanceFeeEmailProps;
