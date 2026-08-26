import { Text } from "@react-email/components";

import { Block, EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";
import { Table } from "../../components/table.js";

/**
 * Payment received by the beneficiary — the outgoing transfer has landed.
 * Figma: DK.Notif › node 2464:5610, "Content" frame (343x1046).
 */
export interface BeneficiaryAccCreditedEmailProps {
  userName?: string;
  /** Amount as it reads in the body copy, e.g. "10,000.00 USD". */
  amount?: string;
  /** Signed amount for the summary card, e.g. "-10,000.00 USD". */
  debitAmount?: string;
  accountName?: string;
  accountMasked?: string;
  beneficiaryName?: string;
  beneficiaryMasked?: string;
  currentBalance?: string;
  referenceId?: string;
  dateTime?: string;
}

export default function BeneficiaryAccCreditedEmail({
  userName = "{User's Name}",
  amount = "{Amount}",
  debitAmount = "-{amount}{ccy}",
  accountName = "{account_name}",
  accountMasked = "***{account_last4}",
  beneficiaryName = "{beneficiary_name}",
  beneficiaryMasked = "***{beneficiary_last4}",
  currentBalance = "{balance}{ccy}",
  referenceId = "{reference_id}",
  dateTime = "{date_time}",
}: BeneficiaryAccCreditedEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-success.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        <strong style={emphasis}>{amount}</strong> from your DK Bank Business account has been
        successfully credited to your beneficiary. No further action is needed.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Details are below:</Text>

      <Block paddingTop={16} paddingBottom={16}>
        <Table
          rows={[
            { label: "Amount", value: debitAmount },
            { label: "From", value: accountName, sub: accountMasked },
            { label: "To", value: beneficiaryName, sub: beneficiaryMasked },
            { label: "Current balance", value: currentBalance },
            { label: "Reference ID", value: referenceId },
            { label: "Date & time", value: dateTime },
          ]}
        />
      </Block>

      <Text style={{ ...paragraph, marginTop: 0 }}>Thank you for banking with us.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

BeneficiaryAccCreditedEmail.PreviewProps = {} satisfies BeneficiaryAccCreditedEmailProps;
