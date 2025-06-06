import { FormLabel, chakra } from "@chakra-ui/react";
import React from "react";

interface Props {
  text: string;
  icon?: React.ReactNode;
  error?: { message: string; type: string };
  isFancy?: boolean;
}

const FormInputPlaceholder = ({ text, icon, error, isFancy }: Props) => {
  let errorMessage = error?.message;

  if (!errorMessage && error?.type === "pattern") {
    errorMessage = "Invalid format";
  }

  return (
    <FormLabel
      alignItems="center"
      {...(isFancy ? { "data-fancy": true } : {})}
      variant="floating"
    >
      {icon}
      <chakra.span>{text}</chakra.span>
      {errorMessage && (
        <chakra.span order={3} whiteSpace="pre">
          {" "}
          - {errorMessage}
        </chakra.span>
      )}
    </FormLabel>
  );
};

export default React.memo(FormInputPlaceholder);
