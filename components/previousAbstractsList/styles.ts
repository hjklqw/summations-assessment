import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    border: `${rem(1)} solid theme.colors.gray[3]`,
  },
}));
