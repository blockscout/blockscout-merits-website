import {
  Text,
  Button,
  useColorModeValue,
  Image,
  Box,
  Flex,
  Switch,
  useBoolean,
  Input,
  FormControl,
  Skeleton,
  Divider,
  Link,
} from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import React, { useCallback, useState, useEffect, useMemo } from "react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

import * as cookies from "~/lib/cookies";
import FormInputPlaceholder from "~/components/FormInputPlaceholder";
import useCheckUserQuery from "~/hooks/useCheckUserQuery";
import useLogin from "~/hooks/useLogin";

type Props = {
  goNext: (isReferral: boolean) => void;
  closeModal: () => void;
};

const LoginStepContent = ({ goNext, closeModal }: Props) => {
  const { open } = useAppKit();
  const { isConnected } = useAppKitAccount();
  const savedRefCode = cookies.get(cookies.NAMES.REFERRAL_CODE);
  const [isRefCodeUsed, setIsRefCodeUsed] = useBoolean(Boolean(savedRefCode));
  const [isLoading, setIsLoading] = useBoolean(false);
  const [refCode, setRefCode] = useState(savedRefCode || "");
  const [refCodeError, setRefCodeError] = useBoolean(false);
  const login = useLogin();
  const checkUserQuery = useCheckUserQuery();

  const isSignUp = useMemo(
    () =>
      isConnected && !checkUserQuery.isFetching && !checkUserQuery.data?.exists,
    [isConnected, checkUserQuery],
  );

  const handleConnectModalOpen = useCallback(() => open(), [open]);

  const handleRefCodeChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRefCode(event.target.value);
    },
    [],
  );

  const handleLogin = useCallback(async () => {
    try {
      setRefCodeError.off();
      setIsLoading.on();
      const { isNewUser, invalidRefCodeError } = await login(
        isSignUp && isRefCodeUsed ? refCode : "",
      );
      if (invalidRefCodeError) {
        setRefCodeError.on();
      } else {
        if (isNewUser) {
          goNext(Boolean(refCode));
        } else {
          closeModal();
        }
      }
    } catch (error) {} // eslint-disable-line no-empty
    setIsLoading.off();
  }, [
    login,
    goNext,
    setIsLoading,
    closeModal,
    refCode,
    setRefCodeError,
    isRefCodeUsed,
    isSignUp,
  ]);

  useEffect(() => {
    if (
      isSignUp &&
      isRefCodeUsed &&
      refCode.length > 0 &&
      refCode.length !== 6
    ) {
      setRefCodeError.on();
    } else {
      setRefCodeError.off();
    }
  }, [refCode, isRefCodeUsed, isSignUp]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Image
        src="/merits_program.png"
        alt="Merits program"
        mb={3}
        fallback={<Skeleton w="full" h="120px" mb={3} />}
      />
      <Box mb={6}>
        Merits are awarded for a variety of different Blockscout activities.
        Connect a wallet to get started.
        <Link
          href="https://docs.blockscout.com/using-blockscout/merits"
          ml={1}
          fontWeight="500"
          isExternal
        >
          More about Blockscout Merits
        </Link>
      </Box>
      {isSignUp && (
        <Box mb={6}>
          <Divider bgColor="divider" mb={6} />
          <Flex w="full" alignItems="center" justifyContent="space-between">
            I have a referral code
            <Switch
              colorScheme="blue"
              size="md"
              isChecked={isRefCodeUsed}
              onChange={setIsRefCodeUsed.toggle}
              aria-label="Referral code switch"
            />
          </Flex>
          {isRefCodeUsed && (
            <>
              <FormControl variant="floating" id="referral-code" mt={3}>
                <Input
                  fontWeight="500"
                  value={refCode}
                  onChange={handleRefCodeChange}
                  isInvalid={refCodeError}
                />
                <FormInputPlaceholder text="Code" />
              </FormControl>
              <Text
                fontSize="sm"
                variant="secondary"
                mt={1}
                color={refCodeError ? "red.500" : undefined}
              >
                {refCodeError
                  ? "Incorrect code or format"
                  : "The code should be in format XXXXXX"}
              </Text>
            </>
          )}
        </Box>
      )}
      <Button
        variant="solid"
        colorScheme="blue"
        w="full"
        whiteSpace="normal"
        mb={4}
        onClick={isConnected ? handleLogin : handleConnectModalOpen}
        isLoading={isLoading || checkUserQuery.isFetching}
        loadingText={isLoading ? "Sign message in your wallet" : undefined}
        isDisabled={refCodeError}
      >
        {isConnected ? "Get started" : "Connect wallet"}
      </Button>
      <Text
        fontSize="sm"
        color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
        textAlign="center"
      >
        Already registered for Blockscout Merits on another network or chain?
        Connect the same wallet here.
      </Text>
    </>
  );
};

export default LoginStepContent;
