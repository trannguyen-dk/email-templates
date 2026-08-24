import { Text } from "@react-email/components";

import { CtaButton } from "../components/cta-button.js";
import {
  EmailLayout,
  ICONS_CDN,
  emphasis,
  paragraph,
  paragraphDark,
} from "../components/layout.js";

/**
 * A payment is waiting for the approver's sign-off.
 * Figma: DK.Notif › node 2354:6745, "Email content" frame.
 */
export interface PaymentApprovalEmailProps {
  approverName?: string;
  paymentRef?: string;
  /** Pre-formatted amount including the currency, e.g. "12,110.00 BTN". */
  amount?: string;
  /** Pre-formatted review deadline, e.g. "13:20 PM, 24 July 2026". */
  reviewBy?: string;
  /** Where the approver lands to review the payment. */
  reviewUrl?: string;
  supportEmail?: string;
  helpUrl?: string;
  privacyUrl?: string;
  /** Base URL where the files in `static/` are hosted (no trailing slash). */
  assetBaseUrl?: string;
  year?: number;
}

export default function PaymentApprovalEmail({
  approverName = "{User’s Name}",
  paymentRef = "{Payment ID}",
  amount = "{Amount}",
  reviewBy = "{Review Deadline}",
  reviewUrl = "https://cibs-gmc.uat.digitalkidu.bt/uatonebank/66666666_default/h5/53000001-1.0.46.0/html/www/index.html#/login",
  supportEmail,
  helpUrl,
  privacyUrl,
  assetBaseUrl,
  year,
}: PaymentApprovalEmailProps) {
  return (
    <EmailLayout
      statusIconUrl={`${ICONS_CDN}/icon-pending.png`}
      statusIconSize={80}
      appPromo
      supportEmail={supportEmail}
      helpUrl={helpUrl}
      privacyUrl={privacyUrl}
      year={year}
    >
      <Text style={{ ...paragraph, marginTop: 20 }}>
        Dear <strong style={emphasis}>{approverName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 20 }}>
        Payment <strong style={emphasis}>{paymentRef}</strong> for{" "}
        <strong style={emphasis}>{amount}</strong> is waiting for your approval.
      </Text>

      <Text style={{ ...paragraph, marginTop: 20 }}>
        Please review <strong style={emphasis}>by {reviewBy}</strong>.
      </Text>

      <CtaButton href={reviewUrl} assetBaseUrl={assetBaseUrl}>
        Review payment
      </CtaButton>

      <Text style={{ ...paragraphDark, marginTop: 0 }}>We appreciate your cooperation.</Text>
      <Text style={{ ...paragraphDark }}>Thank you.</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

PaymentApprovalEmail.PreviewProps = {} satisfies PaymentApprovalEmailProps;
