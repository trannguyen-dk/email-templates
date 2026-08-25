import { Img } from "@react-email/components";

import { Block, LOGO_URL, M } from "./email-base.js";

/**
 * Email header — the centred DK Bank wordmark, and nothing else.
 * Figma: DK.Notif › "Content" frames, 98x28 at the top of every email.
 */
export function EmailHeader() {
  return (
    <Block align="center">
      <Img src={LOGO_URL} alt="DK Bank" {...M.headerLogo} style={logo} />
    </Block>
  );
}

const logo: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  border: 0,
};
