import React from 'react'
import SEOHeader, { SEOHeaderProps } from '../../../../components/seo/SEOHeader'
import { APP_NAME, BLUE_DARK_COLOR, DEFAULT_APP_URL, SEPARATOR, URLS, containerSize } from '../../../../config/constants'
import { Box, Container, Grid, Text, Title } from '@mantine/core'
import { getTheme, makeRequestOne } from '../../../../config/config'
import publicStyles from '../../../../styles/publicStyles'
import BlogCardVertical, { BlogProps } from '../../../../components/blogs/BlogCardVertical'
import HeaderAndFooterWrapper from '../../../../layouts/HeaderAndFooterWrapper'

interface ISingleCategory {
    category: any
    articles: any
}

const SingleCategory = ({ category, articles }: ISingleCategory) => {

    const { classes, theme } = publicStyles()

    const pageMeta: SEOHeaderProps = {
        title: `Articles : Categories : ${category?.title} ${SEPARATOR} ${APP_NAME}`,
        description: "Stay up-to-date with the latest news and articles on web hosting and software development. Get insights on web hosting tips, software development trends, and more.",
        keywords: "web hosting news, software development articles, latest web hosting trends, software development tips, web hosting updates, software development news, hosting industry news, web development insights, technology trends, web hosting articles",
        twitter_card: "summary_large_image",
        url: `${DEFAULT_APP_URL}/domains`,
        image: `${DEFAULT_APP_URL}/images/news.jpg`
    }


    return (
        <>
            <SEOHeader {...pageMeta} />
            <Box py={20} sx={{
                background: getTheme(theme) ? BLUE_DARK_COLOR : theme.colors.dark[8]
            }}>
                <Container size={containerSize} py={60}>
                    <Title className={classes.title2}>Categories: {category?.title} </Title>
                </Container>
            </Box>
            <Container size={containerSize} py={50}>
                {
                    articles?.length === 0 ? <Text>[Oops! No articles under this category]</Text> : null
                }
                <Grid>
                    <Grid.Col md={12}>
                        <Grid>
                            {articles?.map((blog: BlogProps, i: number) => (
                                <Grid.Col key={`blog_site_${i}`} md={4} sm={6} xs={6}>
                                    <BlogCardVertical {...blog} />
                                </Grid.Col>
                            ))}
                        </Grid>
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    )
}

export async function getStaticPaths() {
    const categoriesQuery = await makeRequestOne(
        {
            url: `${URLS.BLOG_CATEGORIES}`,
            method: "GET",
            params: { limit: 100, fields: 'id,slug' }
        }
    )
    let paths = categoriesQuery?.data?.results?.map((cat: any) => {
        return {
            params: { cat_id: cat?.id?.toString(), cat_slug: cat?.slug?.toString() },
        }
    })

    return {
        paths: paths,
        fallback: true, // can also be true, false or 'blocking',
    }
}

export const getStaticProps = async (ctx: any) => {
    const { params } = ctx
    const catQuery = await makeRequestOne(
        {
            url: `${URLS.BLOG_CATEGORIES}/${params?.cat_id}`,
            method: "GET",
            params: {
                fields: 'title'
            }
        }
    )
    const articlesQuery: any = await makeRequestOne(
        {
            url: `${URLS.BLOGS}`,
            method: "GET",
            params: {
                limit: 100,
                categories__id: params?.cat_id,
                fields: 'id,user,full_name,username,categories,title,description,image,slug,tags'
            }
        }
    )
    return {
        props: {
            category: catQuery?.data,
            articles: articlesQuery?.data?.results
        },
        revalidate: 10,
    }
}


SingleCategory.PageLayout = HeaderAndFooterWrapper

export default SingleCategory