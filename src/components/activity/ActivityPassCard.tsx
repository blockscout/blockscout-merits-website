import {
  Flex,
  Text,
  Heading,
  Image,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";

import Skeleton from "~/chakra/Skeleton";
import useConfigQuery from "~/hooks/useConfigQuery";

export default function RewardsActivityPassCard() {
  const configQuery = useConfigQuery();
  const backgroundImage = useColorModeValue(
    "/static/cells.svg",
    "/static/cells_dark.svg",
  );

  return (
    <Flex
      p={{ base: 1.5, md: 2 }}
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "whiteAlpha.200")}
      borderRadius="lg"
      gap={{ base: 1, md: 10 }}
      flexDirection={{ base: "column", md: "row" }}
    >
      <Flex flex={1} flexDirection="column" p={3} gap={2}>
        <Heading fontSize={{ base: "md", md: "lg" }} lineHeight={1.5}>
          Activity pass
        </Heading>
        <Text fontSize="sm">
          Grab your{" "}
          <Skeleton isLoaded={!configQuery.isLoading} display="inline">
            <NextLink
              href={`/?tab=spend&id=${configQuery.data?.rewards?.blockscout_activity_pass_id}`}
              passHref
              legacyBehavior
            >
              <Link>Activity pass</Link>
            </NextLink>
          </Skeleton>{" "}
          then engage with various Blockscout products and features to earn
          Merits every day!{" "}
          <Link
            isExternal
            href="https://docs.blockscout.com/using-blockscout/merits/activity-pass"
          >
            Learn more
          </Link>
        </Text>
      </Flex>
      <Flex
        flex={{ base: "none", md: 1 }}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        h={{ base: "160px", md: "120px" }}
        pr={{ base: 0, md: 8 }}
        pl={{ base: 0, md: "86px" }}
        pt={{ base: 4, md: 0 }}
        pb={{ base: 3, md: 0 }}
        borderRadius="base"
        backgroundColor={useColorModeValue("#FFEFCE", "#E1910E")}
        overflow="hidden"
        position="relative"
      >
        <Image
          src={backgroundImage}
          alt="Background"
          width="268px"
          height="184px"
          position="absolute"
          top="-20px"
          left={{ base: "calc(50% - 134px)", md: "-8px" }}
        />
        <Image
          src="/static/activity_pass.svg"
          alt="Activity pass"
          width="79px"
          height="86px"
          zIndex={1}
        />
        <NextLink
          href={`/?tab=spend&id=${configQuery.data?.rewards?.blockscout_activity_pass_id}`}
          passHref
          legacyBehavior
        >
          <Link
            px={2}
            py={1.5}
            borderRadius="base"
            fontSize="sm"
            fontWeight="500"
            backgroundColor={useColorModeValue("#FFD57C", "#FFBA0D")}
            color="#2B1A3F"
            _hover={{ color: "link_hovered" }}
            flexShrink={0}
            zIndex={1}
          >
            Grab Activity pass
          </Link>
        </NextLink>
      </Flex>
    </Flex>
  );
}
