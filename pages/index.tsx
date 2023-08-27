import { Container, Stack, Title, Code, Box } from "@mantine/core";
import HeaderAndFooterWrapper from "../layouts/HeaderAndFooterWrapper";
import publicStyles from "../styles/publicStyles";
import { URLS } from "../config/constants";
import { makeRequestOne } from "../config/config";
import { HeadingOne } from "../components/navigations/Heading";
import Blogs from "../components/blogs/Blogs";

interface IIndexPage {
  articles: any
}

function IndexPage(props: IIndexPage) {
  const { articles } = props
  const { classes, theme } = publicStyles()
  return (
    <div>
      <Container py={100}>
        <Title align="center">Next JS with Mantine Template using the <Code>pages</Code> folder.</Title>
        {/* Blog section */}
        <Box>
          <Container size="lg" py={50}>
            <Stack>
              <HeadingOne subtitle='Our Blog' title="Latest News & Articles" description='Read latest news and articles in this space. Learn more about the tech world around you today.' />
              <Blogs articles={articles} />
            </Stack>
          </Container>
        </Box>
      </Container>
    </div>
  );
}

export const getStaticProps = async (ctx: any) => {
  const articlesQuery: any = await makeRequestOne(
    {
      url: `${URLS.BLOGS}`,
      method: "GET",
      params: { limit: 10, fields: 'id,user,full_name,username,categories,title,description,image,slug,tags' }
    }
  )

  return {
    props: {
      articles: articlesQuery?.data?.results,
    },
    revalidate: 10,
  }
}

IndexPage.PageLayout = HeaderAndFooterWrapper;

export default IndexPage;