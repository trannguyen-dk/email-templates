import { Link, Text } from "@react-email/components";

import {
  Block,
  EmailLayout,
  emphasis,
  inlineLink,
  paragraph,
  paragraphDark,
} from "../../components/layout.js";
import { Table } from "../../components/table.js";


export interface DocumentExpiryEmailProps {
  userName?: string;
  companyName?: string;
  documentType?: string;
  expiryDate?: string;
  supportEmail?: string;
}

export default function DocumentExpiryEmail({
  userName = "{User's Name}",
  companyName = "[Company Name]",
  documentType = "{document_type}",
  expiryDate = "{DD MM YYYY}",
  supportEmail = "business.care@dk.bt",
}: DocumentExpiryEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-warning.png">
      <Text style={{ ...paragraph, marginTop: 20 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        We&apos;re writing to you in your capacity as a key personnel of {companyName}, a customer
        of DK Bank.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Our records indicate that the following document of the company is due to expire soon.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Details are below:</Text>

      <Block paddingTop={16} paddingBottom={16}>
        <Table
          rows={[
            { label: "Document", value: documentType },
            { label: "Expiry date", value: expiryDate },
          ]}
        />
      </Block>

      <Text style={{ ...paragraph, marginTop: 0 }}>
        To ensure uninterrupted access to DK Bank services, please submit the updated document(s)
        to{" "}
        <Link href={`mailto:${supportEmail}`} style={inlineLink}>
          {supportEmail}
        </Link>{" "}
        before the expiry date.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        We appreciate your cooperation.
        <br />
        Thank you.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

DocumentExpiryEmail.PreviewProps = {} satisfies DocumentExpiryEmailProps;