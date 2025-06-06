import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  chakra,
} from "@chakra-ui/react";
import React from "react";

import Skeleton from "~/chakra/Skeleton";

import CopyToClipboard from "./CopyToClipboard";
import FormInputPlaceholder from "./FormInputPlaceholder";

type Props = {
  label: string;
  value: string;
  className?: string;
  isLoading?: boolean;
  onCopy?: () => void;
};

const RewardsReadOnlyInputWithCopy = ({
  label,
  value,
  className,
  isLoading,
  onCopy,
}: Props) => (
  <FormControl variant="floating" id={label} className={className}>
    <Skeleton isLoaded={!isLoading}>
      <InputGroup>
        <Input
          readOnly
          fontWeight="500"
          value={value}
          overflow="hidden"
          textOverflow="ellipsis"
          sx={{
            "&:not(:placeholder-shown)": {
              pr: "40px",
            },
          }}
        />
        <FormInputPlaceholder text={label} />
        <InputRightElement
          w="40px"
          display="flex"
          justifyContent="flex-end"
          pr={2}
        >
          <CopyToClipboard text={value} onClick={onCopy} />
        </InputRightElement>
      </InputGroup>
    </Skeleton>
  </FormControl>
);

export default chakra(RewardsReadOnlyInputWithCopy);
