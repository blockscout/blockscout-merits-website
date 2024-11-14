import {
  Skeleton,
  Flex,
  Link,
  Image,
  Alert,
  Button,
  Text,
} from "@chakra-ui/react";

import DashboardCard from "~/components/dashboard/DashboardCard";
import SpriteIcon from "~/components/SpriteIcon";

import { apos } from "~/lib/htmlEntities";

export default function ReferralProgramTab() {
  return (
    <>
      <Alert status="warning" w="fit-content" gap={3} py={2} px={3} mb={8}>
        <SpriteIcon name="info-circle" boxSize={5} />
        <Text fontWeight="semibold">
          Bangkok Hacker Badge - Earned at ETHGlobal Thailand & DevCon Bangkok!
        </Text>
        <Button
          variant="outline"
          size="sm"
          as="a"
          href="https://badges.blockscout.com/mint/bangkokHacker"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mint badge
        </Button>
      </Alert>
      <DashboardCard
        title="Badges"
        description={
          <Flex flexDir="column" gap={2}>
            <span>
              Collect limited and legendary badges by completing different
              Blockscout related tasks. Go to the badges website to see what
              {apos}s available and start your collection today.
            </span>
            <Link
              href="https://badges.blockscout.com?utm_source=blockscout&utm_medium=merits-dashboard"
              fontSize="md"
              fontWeight="500"
              isExternal
            >
              Go to website
            </Link>
          </Flex>
        }
        direction="row"
        availableSoon
      >
        <Flex
          flex={1}
          px={{ base: 4, md: 6 }}
          py={{ base: 4, md: 0 }}
          justifyContent="space-between"
          gap={2}
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Image
                key={index}
                display={{ base: index > 2 ? "none" : "block", sm: "block" }}
                src={`/badges/badge_${index + 1}.svg`}
                alt={`Badge ${index + 1}`}
                w={{
                  base: "calc((100% - 16px) / 3)",
                  sm: "calc((100% - 32px) / 5)",
                }}
                maxW={{ base: "80px", md: "100px" }}
                maxH={{ base: "80px", md: "100px" }}
                fallback={
                  <Skeleton
                    display={{
                      base: index > 2 ? "none" : "block",
                      sm: "block",
                    }}
                    w={{
                      base: "calc((100% - 16px) / 3)",
                      sm: "calc((100% - 32px) / 5)",
                    }}
                    maxW={{ base: "80px", md: "100px" }}
                    maxH={{ base: "80px", md: "100px" }}
                    aspectRatio={1}
                  />
                }
              />
            ))}
        </Flex>
      </DashboardCard>
    </>
  );
}
