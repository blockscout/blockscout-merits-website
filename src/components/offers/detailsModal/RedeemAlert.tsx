import { Alert, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import { apos } from "~/lib/htmlEntities";
import useCheckRedeemQuery from "~/hooks/useCheckRedeemQuery";

type Props = {
  checkRedeemQuery: ReturnType<typeof useCheckRedeemQuery>;
};

export default function OfferDetailsAlert({ checkRedeemQuery }: Props) {
  if (!checkRedeemQuery.data || checkRedeemQuery.data.is_redeemable) {
    return null;
  }

  const reason = checkRedeemQuery.data.reason;
  let text;

  if (reason.includes("user balance too low")) {
    text = (
      <>
        You don{apos}t have enough Merits to redeem this item.{" "}
        <NextLink href="/?tab=campaigns" passHref legacyBehavior>
          <Link>Earn more to proceed</Link>
        </NextLink>
      </>
    );
  } else if (
    reason.includes("offer is unique per address and is already redeemed")
  ) {
    text = `You${apos}ve already redeemed this item. Each address can only claim it once`;
  } else if (reason.includes("passport score too low")) {
    const score = reason.split(" < ")[1];
    text = (
      <>
        Your Gitcoin Passport score is below {score}.{" "}
        <Link href="https://app.passport.xyz/?utm_source=blockscout" isExternal>
          Add more credentials to qualify
        </Link>
      </>
    );
  } else if (reason.includes("offer not available")) {
    text = "This offer is no longer available. Please check for new rewards";
  }

  return (
    <Alert
      status="warning"
      mb={4}
      py={2}
      px={3}
      borderRadius="base"
      display="block"
    >
      {text}
    </Alert>
  );
}
