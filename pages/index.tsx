import { Container,  Stack, Text, Title, Card, Code } from "@mantine/core";
import HeaderAndFooterWrapper from "../layouts/HeaderAndFooterWrapper";
import publicStyles from "../styles/publicStyles";
import { BLUE_DARK_COLOR } from "../config/constants";
import { getTheme } from "../config/config";


interface TeaserCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string,
}

// Respect: We honor the dignity, preferences, and cultural backgrounds of every individual we serve.
const TeaserCard = (props: TeaserCardProps) => {
  const { title, icon, description, color } = props;
  const { theme } = publicStyles();
  return (
    <Card p="xl" sx={{
      background: getTheme(theme) ? BLUE_DARK_COLOR : theme.fn.lighten(color, 0.8),
      borderRadius: theme.radius.lg,
      height: "100%"
    }}>
      <Stack>
        {icon}
        <Title order={2} size={40}>{title}</Title>
        <Text>
          {description}
        </Text>
      </Stack>
    </Card>
  )
}

function IndexPage() {
  const { classes, theme } = publicStyles()
  return (
    <div>
      <Container py={100}>
        <Title align="center">Next JS with Mantine Template using the <Code>pages</Code> folder.</Title>
      </Container>
    </div>
  );
}


IndexPage.PageLayout = HeaderAndFooterWrapper;

export default IndexPage;