import {
  IconButton,
  Tooltip,
  useClipboard,
  chakra,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import Skeleton from "~/chakra/Skeleton";

import type { IconName } from "./SpriteIcon";
import SpriteIcon from "./SpriteIcon";

export interface Props {
  text: string;
  className?: string;
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  size?: number;
  type?: "link";
  icon?: IconName;
  variant?: string;
  colorScheme?: string;
}

const CopyToClipboard = ({
  text,
  className,
  isLoading,
  onClick,
  size = 5,
  type,
  icon,
  variant = "simple",
  colorScheme,
}: Props) => {
  const { hasCopied, onCopy } = useClipboard(text, 1000);
  const [copied, setCopied] = useState(false);
  // have to implement controlled tooltip because of the issue - https://github.com/chakra-ui/chakra-ui/issues/7107
  const { isOpen, onOpen, onClose } = useDisclosure();
  const iconColor = useColorModeValue("gray.400", "gray.500");
  const colorProps = colorScheme ? {} : { color: iconColor };

  useEffect(() => {
    if (hasCopied) {
      setCopied(true);
    } else {
      setCopied(false);
    }
  }, [hasCopied]);

  const handleClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onCopy();
      onClick?.(event);
    },
    [onClick, onCopy],
  );

  if (isLoading) {
    return (
      <Skeleton
        boxSize={size}
        className={className}
        borderRadius="sm"
        flexShrink={0}
        ml={2}
        display="inline-block"
      />
    );
  }

  return (
    <Tooltip
      label={
        copied
          ? "Copied"
          : `Copy${type === "link" ? " link " : " "}to clipboard`
      }
      isOpen={isOpen || copied}
    >
      <IconButton
        {...colorProps}
        aria-label="copy"
        icon={<SpriteIcon name={icon || ("copy" as IconName)} boxSize={size} />}
        boxSize={size}
        variant={variant}
        colorScheme={colorScheme}
        display="inline-block"
        flexShrink={0}
        onClick={handleClick}
        className={className}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        ml={2}
        borderRadius={0}
      />
    </Tooltip>
  );
};

export default React.memo(chakra(CopyToClipboard));
