import { Link, ListItem, UnorderedList } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TermContentProps {
  title: ReactNode | string;
  body: ReactNode | string;
}

export const termsContent: TermContentProps[] = [
  {
    title: "",
    body: (
      <>
        <b>Last Updated:</b> November 8, 2024
        <br />
        <b>Version:</b> 1.0
      </>
    ),
  },
  {
    title: "",
    body: (
      <>
        Blockscout Limited, a company incorporated under the laws of Seychelles,
        (“Blockscout,” “we,” “our”, or “us”) provides an interface for accessing
        and participating in the Merits Program, a gamified loyalty rewards
        program (the “Program”) designed for user engagement within the
        Blockscout ecosystem. The Program includes Merits, an off-chain reward
        system, and Badges, which are NFT serving solely as a confirmation of
        user achievements
      </>
    ),
  },
  {
    title: "Acceptance of Program Terms",
    body: (
      <>
        By participating in the Program, connecting your Wallet, or minting any
        Badges, you agree to these Terms of Use (the “Program Terms”) in
        addition to{" "}
        <Link href="https://www.blockscout.com/terms-and-conditions" isExternal>
          {" "}
          Blockscout Terms & Conditions
        </Link>{" "}
        (the “Terms”) without any modifications or reservations, which form a
        legally binding agreement between you and Blockscout, and acknowledge
        our{" "}
        <Link href="https://www.blockscout.com/privacy-notice" isExternal>
          Privacy Notice
        </Link>
        . We may update these Program Terms at any time. If we make changes, we
        will update the date above. Your continued participation after changes
        are posted constitutes acceptance of those changes. If you do not agree,
        you may discontinue your participation in the Program. For the sake of
        clarity, these Program Terms are an integral part of the Terms, and your
        participation in the Program is subject to both. Capitalised terms not
        defined herein shall have the meanings assigned to them in the Terms. In
        the event of any conflict, these Program Terms shall prevail with
        respect to their respective subject matter, while the Terms will govern
        all other matters
      </>
    ),
  },
  {
    title: "Eligibility and Participation",
    body: (
      <>
        To participate, you must meet the eligibility requirements set forth in
        the Terms, as well as all other Program participation requirements or
        criteria that may be established by us from time to time at our sole and
        absolute discretion. The time to complete them may be limited. We will
        decide, at our sole discretion, whether you have completed and/or met
        the applicable requirements, and whether you can participate in the
        Program. We reserve the right to deny your participation at our sole
        discretion if you do not meet these requirements. In each case, our
        decision will be final and cannot be disputed
      </>
    ),
  },
  {
    title: "Access and Participation in the Program",
    body: (
      <>
        The Program includes:
        <UnorderedList>
          <ListItem>
            Merits: Off-chain points earned through activities like signing up,
            daily claims, referrals, and completing specific tasks
          </ListItem>
          <ListItem>
            Badges: NFTs serving as a confirmation of achievements earned by
            meeting specified milestones. Requirements for each Badge are listed
            on{" "}
            <Link href="https://badges.blockscout.com" isExternal>
              badges.blockscout.com
            </Link>
            , where users can also mint Badges upon completion of requirements.
            The Blockscout Parties shall not be responsible for or held liable
            in connection with your failure to successfully mint or receive any
            Badges
          </ListItem>
        </UnorderedList>
        In each case, we will decide, at our sole discretion, whether you have
        successfully completed the required tasks, milestones and other
        activities, and whether you can receive the respective rewards,
        including Merits and/or Badges. Participation in the Program is intended
        solely for gamified engagement within the Blockscout ecosystem, and
        neither Merits nor Badges are backed by any physical or other assets, or
        hold any monetary or intrinsic value
      </>
    ),
  },
  {
    title: "Usage Requirements and Limitations",
    body: (
      <>
        As a participant, you agree to comply with these Program Terms and the
        Terms Blockscout reserves the right to restrict access to the Program or
        revoke Merits and Badges if you violate, or we reasonably believe that
        you have violated, these Program Terms and/or the Terms. In this case,
        our obligations on transfer and delivery of Merits, Badges or other
        rewards will end immediately
      </>
    ),
  },
  {
    title: "Modification and Termination of the Program",
    body: (
      <>
        Blockscout may modify, suspend or terminate any aspect of the Program,
        whether in specific cases or altogether, including, without limitation,
        limit the number of Program participants, limit or change the number,
        form, or other parameters of Merits, Badges, rewards, as well as cancel
        thereof, or introduce certain eligibility criteria, etc., at any time
        and without prior notice and any liability to you. Changes to the
        Program will be posted on the dedicated page or communicated by us
        through the Communication Channels or otherwise
      </>
    ),
  },
  {
    title: "Privacy and Data Handling",
    body: (
      <>
        Your personal data is processed in accordance with our{" "}
        <Link href="https://www.blockscout.com/privacy-notice" isExternal>
          Privacy Notice
        </Link>
      </>
    ),
  },
  {
    title: "Disclaimers",
    body: (
      <>
        Your participation in the Program is at your own risk. The Program and
        associated rewards (including Merits and Badges) are provided “as-is”
        without any express or implied warranties, including warranties of
        title, utility, rarity, integration, merchantability, fitness for a
        particular purpose, or non-infringement, all of which are expressly
        disclaimed and denied. The participation in the Program and any related
        activities does not promise or guarantee any benefits, financial
        returns, gains, or positive outcomes, and may not meet your
        expectations. Neither Merits nor Badges entitle you to receive any
        return, passive income, interest, or similar payments or benefits, nor
        represent or confer any ownership right or stake, share, security, or
        equivalent rights, or any right to receive future revenue shares,
        intellectual property rights or any other form of participation in or
        relating to Blockscout, Affiliates or Products. All rewards, including
        Merits and Badges, are envisioned and intended solely for fun and
        entertainment, and we have no obligation and do not intend to do
        anything to provide them with any value, utility or functionality.
        Participation in the Program and completion of any related quests, tasks
        or other activities is entirely at your discretion and may not lead to
        any desired outcome other than participating in a fun experience
      </>
    ),
  },
  {
    title: "Entertainment and No Gambling",
    body: (
      <>
        The Program and any related quests, tasks or other activities are not,
        and shall not be interpreted as, a gambling activity, lottery, or any
        other form of regulated betting or gaming under any applicable laws or
        regulations. Participation in the Program is free of charge. There is no
        monetary exchange or wagering involved, and participation is open to all
        eligible persons. The Program and any related activities are organised
        purely for entertainment and are designed to foster engagement,
        enjoyment, and support within the Blockscout ecosystem
      </>
    ),
  },
];
