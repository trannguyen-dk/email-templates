import { Text } from "@react-email/components";

import { CtaButton } from "../components/cta-button.js";
import { EmailLayout, ICONS_CDN, emphasis, paragraphDark } from "../components/layout.js";

/**
 * Approver notification — an account opening application awaits review.
 * Figma: DK.Notif › node 1378:7336, "Email content" frame.
 */
export interface ApprovalRequiredEmailProps {
  companyName?: string;
  reviewUrl?: string;
  supportEmail?: string;
  helpUrl?: string;
  privacyUrl?: string;
  /** Base URL where the files in `static/` are hosted (no trailing slash). */
  assetBaseUrl?: string;
  year?: number;
}

export default function ApprovalRequiredEmail({
  companyName = "{Company Name}",
  reviewUrl = "https://example.com/approvals",
  supportEmail,
  helpUrl,
  privacyUrl,
  assetBaseUrl,
  year,
}: ApprovalRequiredEmailProps) {
  return (
    <EmailLayout
      statusIconUrl={`${ICONS_CDN}/icon-pending.png`}
      supportEmail={supportEmail}
      helpUrl={helpUrl}
      privacyUrl={privacyUrl}
      year={year}
    >
      <Text style={{ ...paragraphDark, marginTop: 20 }}>Dear Approver,</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>
        The account opening application for <strong style={emphasis}>{companyName}</strong> has been
        successfully submitted and now pending your review and approval.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 12 }}>
        Please review the application details and complete the approval process.
      </Text>

      <CtaButton href={reviewUrl} assetBaseUrl={assetBaseUrl}>
        Review application
      </CtaButton>

      <Text style={{ ...paragraphDark, marginTop: 0 }}>
        Thank you for your attention and prompt action.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApprovalRequiredEmail.PreviewProps = {
  companyName: "{Company Name}",
} satisfies ApprovalRequiredEmailProps;
