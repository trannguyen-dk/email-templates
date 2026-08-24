import { Text } from "@react-email/components";

import { type DetailRow, DetailRows } from "../components/detail-rows.js";
import {
  Block,
  EmailLayout,
  ICONS_CDN,
  emphasis,
  paragraph,
  paragraphDark,
} from "../components/layout.js";

/**
 * Outgoing payment confirmation with a transaction summary.
 * Figma: DK.Notif › node 2417:2174, "Email content" frame.
 */
export interface PaymentDebitEmailProps {
  accountHolder?: string;
  /** Pre-formatted debit amount including the currency. */
  amount?: string;
  fromAccount?: string;
  fromAccountMask?: string;
  beneficiary?: string;
  beneficiaryMask?: string;
  /** Pre-formatted balance after the debit. */
  balance?: string;
  referenceId?: string;
  /** Pre-formatted timestamp, e.g. "24 Jun 2026, 12:58 PM". */
  dateTime?: string;
  supportEmail?: string;
  helpUrl?: string;
  privacyUrl?: string;
  year?: number;
}

export default function PaymentDebitEmail({
  accountHolder = "{User’s Name}",
  amount = "{amount}{ccy}",
  fromAccount = "{account_name}",
  fromAccountMask = "{account_mask}",
  beneficiary = "{beneficiary_name}",
  beneficiaryMask = "{beneficiary_mask}",
  balance = "{balance}{ccy}",
  referenceId = "{reference_id}",
  dateTime = "{date_time}",
  supportEmail,
  helpUrl,
  privacyUrl,
  year,
}: PaymentDebitEmailProps) {
  const rows: readonly DetailRow[] = [
    { label: "Amount", value: amount },
    { label: "From", value: fromAccount, sub: fromAccountMask },
    { label: "To", value: beneficiary, sub: beneficiaryMask },
    { label: "Current balance", value: balance },
    { label: "Reference ID", value: referenceId },
    { label: "Date & time", value: dateTime },
  ];

  return (
    <EmailLayout
      statusIconUrl={`${ICONS_CDN}/icon-outgoing.png`}
      statusIconSize={80}
      appPromo
      supportEmail={supportEmail}
      helpUrl={helpUrl}
      privacyUrl={privacyUrl}
      year={year}
    >
      <Text style={{ ...paragraph, marginTop: 20 }}>
        Dear <strong style={emphasis}>{accountHolder}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 20 }}>
        A payment has been made from your DK Bank account.
      </Text>

      <Block paddingTop={20}>
        <DetailRows rows={rows} />
      </Block>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Thank you for banking with us.</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

PaymentDebitEmail.PreviewProps = {} satisfies PaymentDebitEmailProps;
