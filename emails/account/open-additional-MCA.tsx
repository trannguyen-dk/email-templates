import { Text } from "@react-email/components";

import { Table } from "../../components/table.js";
import { Block, EmailLayout, paragraph, paragraphDark } from "../../components/layout.js";

/**
 * An additional multi-currency account has been opened and is ready to use.
 * Summary card only — no CTA.
 */
export interface OpenAdditionalMcaEmailProps {
  businessName?: string;
  accountNumber?: string;
  /** Comma-separated currency codes held by the account. */
  currencies?: string;
  openedOn?: string;
}

export default function OpenAdditionalMcaEmail({
  businessName = "{business_name}",
  accountNumber = "{account_number}",
  currencies = "{currencies}",
  openedOn = "{opened_on}",
}: OpenAdditionalMcaEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-success.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear Customer,</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Your new multi-currency account has been opened and is ready to use.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Account details are below:</Text>

      <Block paddingTop={16} paddingBottom={16}>
        <Table
          rows={[
            { label: "Account name", value: businessName },
            { label: "Account number", value: accountNumber },
            { label: "Currency", value: currencies },
            { label: "Opened on", value: openedOn },
          ]}
        />
      </Block>

      <Text style={{ ...paragraph, marginTop: 0 }}>Thank you for banking with us.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

OpenAdditionalMcaEmail.PreviewProps = {} satisfies OpenAdditionalMcaEmailProps;
