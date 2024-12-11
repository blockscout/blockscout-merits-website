import { Flex, Button } from "@chakra-ui/react";

import Skeleton from "~/chakra/Skeleton";
import DashboardCard from "~/components/dashboard/DashboardCard";
import ReadOnlyInputWithCopy from "~/components/shared/ReadOnlyInputWithCopy";
import EmptyState from "~/components/shared/EmptyState";

import { useAppContext } from "~/contexts/app";
import useConfigQuery from "~/hooks/useConfigQuery";
import useReferralsQuery from "~/hooks/useReferralsQuery";

export default function ReferralProgramTab() {
  const { apiToken, loginModal } = useAppContext();
  const configQuery = useConfigQuery();
  const referralsQuery = useReferralsQuery();

  const referralShare = (
    <Skeleton as="span" isLoaded={!configQuery.isPending}>
      {configQuery.data?.rewards.referral_share
        ? `${Number(configQuery.data?.rewards.referral_share) * 100}%`
        : "N/A"}
    </Skeleton>
  );

  if (!apiToken) {
    return (
      <EmptyState
        image={{
          src: "/static/empty_wallet.svg",
          width: "266px",
          height: "210px",
        }}
        title="Refer friends and boost your Merits!"
        description={
          <>
            Receive a {referralShare} bonus on all Merits earned by your
            referrals. Login to start
          </>
        }
        contentAfter={<Button onClick={loginModal.onOpen}>Log in</Button>}
        maxW="320px"
      />
    );
  }

  return (
    <DashboardCard
      title="Referral program"
      description={
        <>
          Refer friends and boost your Merits! You receive a {referralShare}{" "}
          bonus on all Merits earned by your referrals.
        </>
      }
      direction="row"
    >
      <Flex
        flex={1}
        gap={{ base: 2, md: 6 }}
        px={{ base: 4, md: 6 }}
        py={{ base: 4, md: 0 }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <ReadOnlyInputWithCopy
          label="Referral link"
          value={referralsQuery.data?.link || "N/A"}
          isLoading={referralsQuery.isPending}
          flex={2}
        />
        <ReadOnlyInputWithCopy
          label="Referral code"
          value={referralsQuery.data?.code || "N/A"}
          isLoading={referralsQuery.isPending}
          flex={1}
        />
      </Flex>
    </DashboardCard>
  );
}
