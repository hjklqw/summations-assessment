import { useCallback, useMemo, useState } from "react";
import { Container, Title } from "@mantine/core";

import { DoiResponse } from "@/domain/types";
import { parseAbstract } from "@/domain/utils";

import { SearchInput } from "@/components/searchInput";
import { PreviousAbstractsList } from "@/components/previousAbstractsList";

const API_URL = "https://api.openalex.org/works/";

export default function IndexPage() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [abstracts, setAbstracts] = useState<{ [doi: string]: string }>({});
  const [mostRecentDoi, setMostRecentDoi] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const onSearch = useCallback(
    async (doi: string) => {
      if (abstracts[doi]) {
        setMostRecentDoi(doi);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`${API_URL}${doi}`);
        const json = (await res.json()) as DoiResponse;
        if (json.abstract_inverted_index) {
          setAbstracts({
            ...abstracts,
            [doi]: parseAbstract(json.abstract_inverted_index!),
          });
          setMostRecentDoi(doi);
        } else {
          setErrorMessage("This article does not contain an abstract.");
        }
      } catch (_e) {
        // Note: There may be other reasons for error, but this reasoning will cover most cases
        // and is sufficient for this sample app.
        setErrorMessage("Please enter a valid DOI.");
      }
      setLoading(false);
    },
    [abstracts]
  );

  const numAbstracts = useMemo(
    () => Object.keys(abstracts).length,
    [abstracts]
  );

  return (
    <>
      <Container size="sm">
        <Title>Search abstracts</Title>
        <SearchInput
          onSearch={onSearch}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </Container>

      {mostRecentDoi && (
        <Container size="sm">
          <Title>{mostRecentDoi}</Title>
          <p dangerouslySetInnerHTML={{ __html: abstracts[mostRecentDoi] }} />
        </Container>
      )}

      {numAbstracts > 1 && (
        <PreviousAbstractsList
          mostRecentDoi={mostRecentDoi!}
          abstracts={abstracts}
        />
      )}
    </>
  );
}
