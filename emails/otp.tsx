import { Text } from "@react-email/components";

import {
  Block,
  EmailLayout,
  emphasis,
  monoStack,
  paragraph,
  paragraphDark,
} from "../components/layout.js";

/**
 * One-time password for the DK Onboarding Portal.
 * Figma: DK.Notif › node 2307:2034, "Email content" frame.
 *
 * This frame has no status icon — the copy follows straight on from the logo.
 */
export interface OtpEmailProps {
  /** The one-time code. Rendered verbatim, so pass it already formatted. */
  code?: string;
  /** How long the code stays valid, e.g. "10 minutes". */
  validFor?: string;
  supportEmail?: string;
  helpUrl?: string;
  privacyUrl?: string;
  year?: number;
}

export default function OtpEmail({
  code = "FUDXUL",
  validFor = "10 minutes",
  supportEmail,
  helpUrl,
  privacyUrl,
  year,
}: OtpEmailProps) {
  return (
    <EmailLayout supportEmail={supportEmail} helpUrl={helpUrl} privacyUrl={privacyUrl} year={year}>
      <Text style={{ ...paragraph, marginTop: 20 }}>Dear Customer,</Text>

      <Text style={{ ...paragraph, marginTop: 20 }}>
        Here is your DK Onboarding Portal authentication code:
      </Text>

      <Block paddingTop={12} paddingBottom={12}>
        <table role="presentation" cellPadding={0} cellSpacing={0} border={0} align="center">
          <tbody>
            <tr>
              <td style={codeChip}>
                <span style={codeText}>{code}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </Block>

      <Text style={{ ...paragraph, marginTop: 0 }}>
        This code is valid for <strong style={emphasis}>{validFor}</strong> and can only be used
        once.
      </Text>

      <Text style={{ ...paragraph, fontWeight: 600, marginTop: 12 }}>
        Please don’t share this code with anyone.
      </Text>

      <Text style={{ ...paragraph, marginTop: 12 }}>
        If you did not request this, you can safely ignore this email.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 4 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

OtpEmail.PreviewProps = {} satisfies OtpEmailProps;

/* ── styles (values lifted from Figma) ─────────────────────────── */

const codeChip: React.CSSProperties = {
  backgroundColor: "#f0f2f5",
  borderRadius: 4,
  padding: "4px 16px",
  textAlign: "center",
};

const codeText: React.CSSProperties = {
  fontFamily: monoStack,
  fontSize: 24,
  lineHeight: "30px",
  letterSpacing: "3px",
  color: "#262a2e",
  whiteSpace: "nowrap",
};
