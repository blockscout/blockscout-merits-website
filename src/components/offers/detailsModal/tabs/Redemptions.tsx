import { Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";
import { format } from "date-fns";

import Skeleton from "~/chakra/Skeleton";
import CopyToClipboard from "~/components/shared/CopyToClipboard";
import useOfferRedemptionsQuery from "~/hooks/useOfferRedemptions";

type Props = {
  redemptionsQuery: ReturnType<typeof useOfferRedemptionsQuery>;
};

export default function Redemptions({ redemptionsQuery }: Props) {
  return (
    <>
      <Table>
        <Thead top={80}>
          <Tr
            sx={{
              "& > th": {
                color: "blackAlpha.800",
              },
            }}
          >
            <Th w="10%">#</Th>
            <Th w="30%">Code</Th>
            <Th isNumeric w="30%">
              Date
            </Th>
            <Th isNumeric w="30%">
              Price
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {redemptionsQuery.data?.items?.map((redemption, index) => (
            <Tr key={index}>
              <Td>
                <Skeleton
                  isLoaded={!redemptionsQuery.isPlaceholderData}
                  display="inline-block"
                >
                  {index + 1}
                </Skeleton>
              </Td>
              <Td>
                <Skeleton
                  isLoaded={!redemptionsQuery.isPlaceholderData}
                  display="inline-block"
                >
                  {redemption.secret ? (
                    <>
                      {redemption.secret}
                      <CopyToClipboard text={redemption.secret} />
                    </>
                  ) : (
                    "-"
                  )}
                </Skeleton>
              </Td>
              <Td isNumeric>
                <Skeleton
                  isLoaded={!redemptionsQuery.isPlaceholderData}
                  display="inline-block"
                >
                  {format(redemption.redeemed_at, "dd.MM.yyyy")}
                </Skeleton>
              </Td>
              <Td isNumeric>
                <Skeleton
                  isLoaded={!redemptionsQuery.isPlaceholderData}
                  display="inline-block"
                >
                  {Number(redemption.price).toLocaleString("en-US")} Merits
                </Skeleton>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {!redemptionsQuery.data?.items?.length && (
        <Text textAlign="center" mt={4}>
          You have no redemptions yet.
        </Text>
      )}
    </>
  );
}
