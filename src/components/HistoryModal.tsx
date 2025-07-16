import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { format } from "date-fns";

import Skeleton from "~/chakra/Skeleton";
import LoginModal from "~/components/login/LoginModal";
import Thead from "~/components/shared/TheadSticky";
import useIsMobile from "~/hooks/useIsMobile";
import { useAppContext } from "~/contexts/app";
import useHistoryQuery from "~/hooks/useHistoryQuery";
import type { HistoryItem } from "~/types/api/history";

type Props = {
  onClose: () => void;
};

function getDescription(item: HistoryItem) {
  if (item.details.description) {
    return item.details.description;
  }
  switch (item.action) {
    case "redeem_offer":
      return `Redeem offer (${item.details.offer_id})`;
    case "activity":
      return "Activity";
    case "daily_reward":
      return "Daily reward";
    case "register":
      return "Join the program";
    default:
      return item.details.description;
  }
}

export default function HistoryModal({ onClose }: Props) {
  const isMobile = useIsMobile();
  const { address } = useAppContext();
  const historyQuery = useHistoryQuery();

  if (!address) {
    return <LoginModal onClose={onClose} onConfirm={() => {}} />;
  }

  return (
    <Modal
      isOpen
      onClose={onClose}
      size={isMobile ? "full" : "md"}
      isCentered
      autoFocus={false}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent width="600px" maxH="600px" p={6}>
        <ModalHeader fontWeight="500" textStyle="h3" mb={4} pr={12}>
          Merits history
        </ModalHeader>
        <ModalCloseButton top={6} right={6} boxSize={10} />
        <ModalBody
          mb={0}
          mr="-14px"
          overflowY="auto"
          css={{
            scrollbarGutter: "stable",
            scrollbarWidth: "auto",
            scrollbarColor: "auto",

            "&::-webkit-scrollbar": {
              display: "block",
              width: "14px",
            },

            "&::-webkit-scrollbar-track": {
              background: "transparent",
              marginTop: "36px",
            },

            "&::-webkit-scrollbar-thumb": {
              borderRadius: "16px",
              border: "4px solid transparent",
              backgroundClip: "padding-box",
              transition: "background 0.2s ease-in-out",
              background: "transparent",
            },

            "&:hover::-webkit-scrollbar-thumb": {
              background: "#DADADA",
              backgroundClip: "padding-box",
            },
          }}
        >
          <Table marginBottom={{ base: "80px", md: 0 }}>
            <Thead top={0}>
              <Tr
                sx={{
                  "& > th": {
                    color: "blackAlpha.800",
                  },
                }}
              >
                <Th w="100%">Description</Th>
                <Th isNumeric w="100px">
                  Date
                </Th>
                <Th isNumeric w={{ base: "120px", md: "140px" }}>
                  Amount
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {historyQuery.data?.items?.map((item, index) => (
                <Tr key={index}>
                  <Td>
                    <Skeleton
                      isLoaded={!historyQuery.isPlaceholderData}
                      display="inline-block"
                      wordBreak="break-all"
                    >
                      {getDescription(item)}
                    </Skeleton>
                  </Td>
                  <Td isNumeric>
                    <Skeleton
                      isLoaded={!historyQuery.isPlaceholderData}
                      display="inline-block"
                    >
                      <Tooltip
                        label={format(item.timestamp, "dd.MM.yyyy HH:mm:ss")}
                      >
                        {format(item.timestamp, "dd.MM.yyyy")}
                      </Tooltip>
                    </Skeleton>
                  </Td>
                  <Td isNumeric>
                    <Skeleton
                      isLoaded={!historyQuery.isPlaceholderData}
                      display="inline-block"
                    >
                      {item.action === "redeem_offer" ? "" : "+"}
                      {Number(item.details.amount).toLocaleString("en-US")}{" "}
                      Merits
                    </Skeleton>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {!historyQuery.data?.items?.length && (
            <Text textAlign="center" mt={4}>
              History is empty.
            </Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
