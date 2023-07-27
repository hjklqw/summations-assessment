import { Accordion, Container, Title } from "@mantine/core";
import { useStyles } from "./styles";

type Props = {
  abstracts: { [doi: string]: string };
  mostRecentDoi: string;
};

export const PreviousAbstractsList = ({ abstracts, mostRecentDoi }: Props) => {
  const { classes } = useStyles();
  return (
    <Container size="sm">
      <Title>Previous abstracts</Title>

      <Accordion variant="separated">
        {Object.entries(abstracts).map(([doi, paragraph]) =>
          doi === mostRecentDoi ? null : (
            <Accordion.Item value={doi} key={doi} className={classes.item}>
              <Accordion.Control>{doi}</Accordion.Control>
              <Accordion.Panel>
                <p dangerouslySetInnerHTML={{ __html: paragraph }} />
              </Accordion.Panel>
            </Accordion.Item>
          )
        )}
      </Accordion>
    </Container>
  );
};
