import { Skeleton, Flex, Text, Button } from "@chakra-ui/react";

import DashboardCard from "~/components/dashboard/DashboardCard";
import ReadOnlyInputWithCopy from "~/components/ReadOnlyInputWithCopy";

import { useAppContext } from "~/contexts/app";
import useConfigQuery from "~/hooks/useConfigQuery";
import useReferralsQuery from "~/hooks/useReferralsQuery";

export default function ReferralProgramTab() {
  const { apiToken, loginModal } = useAppContext();
  const configQuery = useConfigQuery();
  const referralsQuery = useReferralsQuery();

  if (!apiToken) {
    return (
      <Flex
        w="full"
        justifyContent="center"
        py={12}
        px={2}
        border="1px solid"
        borderColor="divider"
        borderRadius="lg"
      >
        <Flex maxW="400px" flexDir="column" alignItems="center">
          <Text fontSize="lg" fontWeight="medium" mb={2}>
            Referral program
          </Text>
          <Text textAlign="center" mb={4}>
            Refer friends and earn Merits!
            <br />
            Log in to get your referral link and start sharing.
          </Text>
          <Button onClick={loginModal.onOpen}>Log in</Button>
        </Flex>
      </Flex>
    );
  }

  return (
    <DashboardCard
      title="Referral program"
      description={
        <>
          Refer friends and boost your Merits! You receive a{" "}
          <Skeleton as="span" isLoaded={!configQuery.isPending}>
            {configQuery.data?.rewards.referral_share
              ? `${Number(configQuery.data?.rewards.referral_share) * 100}%`
              : "N/A"}
          </Skeleton>{" "}
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
