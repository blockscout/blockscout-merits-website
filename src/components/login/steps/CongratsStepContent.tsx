import {
  Text,
  Box,
  Flex,
  Button,
  Skeleton,
  useColorModeValue,
  Tag,
} from "@chakra-ui/react";
import React from "react";

import SpriteIcon from "~/components/SpriteIcon";
import MeritsIcon from "~/components/MeritsIcon";
import ReadOnlyInputWithCopy from "~/components/ReadOnlyInputWithCopy";

import useReferralsQuery from "~/hooks/useReferralsQuery";
import useConfigQuery from "~/hooks/useConfigQuery";

type Props = {
  isReferral: boolean;
  closeModal: () => void;
};

const CongratsStepContent = ({ isReferral, closeModal }: Props) => {
  const configQuery = useConfigQuery();
  const referralsQuery = useReferralsQuery();

  const registrationReward = configQuery.data?.rewards.registration;
  const registrationWithReferralReward =
    configQuery.data?.rewards.registration_with_referral;
  const referralReward =
    Number(registrationWithReferralReward) - Number(registrationReward);

  const refLink = referralsQuery.data?.link || "N/A";
  const shareText = `I joined the @blockscoutcom Merits Program and got my first ${registrationReward || "N/A"} #Merits! Use this link for a sign-up bonus and start earning rewards with @blockscoutcom block explorer.\n\n${refLink}`; // eslint-disable-line max-len

  const textColor = useColorModeValue("blue.700", "blue.100");
  const dividerColor = useColorModeValue("whiteAlpha.800", "whiteAlpha.100");

  return (
    <>
      <Flex
        alignItems="center"
        background={useColorModeValue(
          "linear-gradient(254.96deg, #9CD8FF 9.09%, #D0EFFF 88.45%)",
          "linear-gradient(255deg, #1B253B 9.09%, #222C3F 88.45%)",
        )}
        borderRadius="md"
        p={2}
        pl={{ base: isReferral ? 4 : 8, md: 8 }}
        mb={8}
        h="90px"
      >
        <MeritsIcon
          boxSize={{ base: isReferral ? 8 : 12, md: 12 }}
          mr={{ base: isReferral ? 1 : 2, md: 2 }}
        />
        <Skeleton isLoaded={!configQuery.isLoading}>
          <Text
            fontSize={{ base: isReferral ? "24px" : "30px", md: "30px" }}
            fontWeight="700"
            color={textColor}
          >
            +
            {configQuery.data?.rewards[
              isReferral ? "registration_with_referral" : "registration"
            ] || "N/A"}
          </Text>
        </Skeleton>
        {isReferral && (
          <Flex alignItems="center" h="56px">
            <Box
              w="1px"
              h="full"
              bgColor={dividerColor}
              mx={{ base: 3, md: 8 }}
            />
            <Flex flexDirection="column" justifyContent="space-between" gap={2}>
              {[
                {
                  title: "Registration",
                  value: registrationReward || "N/A",
                },
                {
                  title: "Referral program",
                  value: referralReward || "N/A",
                },
              ].map(({ title, value }) => (
                <Flex key={title} alignItems="center" gap={{ base: 1, md: 2 }}>
                  <MeritsIcon boxSize={{ base: 5, md: 6 }} />
                  <Skeleton isLoaded={!configQuery.isLoading}>
                    <Text fontSize="sm" fontWeight="700" color={textColor}>
                      +{value}
                    </Text>
                  </Skeleton>
                  <Text fontSize="sm" color={textColor}>
                    {title}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex flexDirection="column" alignItems="flex-start" px={3} mb={8}>
        <Flex alignItems="center" gap={2}>
          <Tag
            colorScheme="blue"
            w={8}
            h={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
          >
            <SpriteIcon name="profile" boxSize={5} />
          </Tag>
          <Text fontSize="lg" fontWeight="500">
            Referral program
          </Text>
        </Flex>
        <Text fontSize="md" mt={2}>
          Receive a{" "}
          <Skeleton as="span" isLoaded={!configQuery.isLoading}>
            {configQuery.data?.rewards.referral_share
              ? `${Number(configQuery.data?.rewards.referral_share) * 100}%`
              : "N/A"}
          </Skeleton>{" "}
          bonus on all Merits earned by your referrals
        </Text>
        <ReadOnlyInputWithCopy
          label="Referral link"
          value={refLink}
          isLoading={referralsQuery.isLoading}
          mt={3}
        />
        <Button
          as="a"
          target="_blank"
          mt={6}
          isLoading={referralsQuery.isLoading}
          href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
        >
          Share on <SpriteIcon name="social/x" boxSize={6} ml={1} />
        </Button>
      </Flex>
      <Flex flexDirection="column" alignItems="flex-start" px={3}>
        <Flex alignItems="center" gap={2}>
          <Tag
            colorScheme="blue"
            w={8}
            h={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
          >
            <SpriteIcon name="stats" boxSize={6} />
          </Tag>
          <Text fontSize="lg" fontWeight="500">
            Dashboard
          </Text>
        </Flex>
        <Text fontSize="md" mt={2}>
          Explore your current Merits balance, find activities to boost your
          Merits, and view your capybara NFT badge collection on the dashboard
        </Text>
        <Button mt={3} onClick={closeModal}>
          Got it!
        </Button>
      </Flex>
    </>
  );
};

export default CongratsStepContent;
