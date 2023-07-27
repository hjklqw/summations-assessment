import { TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSearch, IconArrowRight, IconLoader2 } from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./styles.module.css";

type Props = {
  onSearch: (doi: string) => void;
  isLoading: boolean;
  errorMessage?: string;
};

export function SearchInput({
  onSearch,
  isLoading,
  errorMessage: otherErrorMessage,
}: Props) {
  const theme = useMantineTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>();

  const onEnter = useCallback(() => {
    const value = inputRef.current?.value?.trim();
    if (value) {
      setErrorMessage(undefined);
      onSearch(value);
    } else {
      setErrorMessage("Please enter a DOI.");
    }
  }, [onSearch]);

  const resolveError = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (errorMessage && e.target.value) {
        setErrorMessage(undefined);
      } else if (otherErrorMessage) {
        setErrorMessage(undefined);
      }
    },
    [errorMessage, otherErrorMessage]
  );

  useEffect(() => {
    setErrorMessage(otherErrorMessage);
  }, [otherErrorMessage]);

  return (
    <TextInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
          onClick={onEnter}
        >
          {isLoading ? (
            <IconLoader2 size="1.1rem" className={styles.loader} />
          ) : (
            <IconArrowRight size="1.1rem" stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Enter DOI"
      rightSectionWidth={42}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onEnter();
        }
      }}
      error={errorMessage}
      onChange={resolveError}
      ref={inputRef}
    />
  );
}
