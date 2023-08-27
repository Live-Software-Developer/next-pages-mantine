import React from 'react'
import HeaderAndFooterWrapper from '../../layouts/HeaderAndFooterWrapper'
import { Box, Container, Grid, Title } from '@mantine/core'
import { BLUE_DARK_COLOR, DATE_MODIFIED, DEFAULT_APP_URL, URLS, containerSize } from '../../config/constants'
import { getTheme, makeRequestOne } from '../../config/config'
import publicStyles from '../../styles/publicStyles'
import BlogCardVertical, { BlogProps } from '../../components/blogs/BlogCardVertical'
import SEOHeader, { SEOHeaderProps } from '../../components/seo/SEOHeader'


interface LatestNewsAndArticlesProps {
    articles: any
}


const LatestNewsAndArticles = (props: LatestNewsAndArticlesProps) => {
    const { articles } = props
    const { classes, theme } = publicStyles()

    const pageMeta: SEOHeaderProps = {
        title: `Latest News and Articles on Software Development and Web Hosting`,
        description: " Stay up-to-date with the latest news and articles on web hosting and software development. Get insights on web hosting tips, software development trends, and more.",
        keywords: "web hosting news, software development articles, latest web hosting trends, software development tips, web hosting updates, software development news, hosting industry news, web development insights, technology trends, web hosting articles",
        twitter_card: "summary_large_image",
        url: `${DEFAULT_APP_URL}/articles`,
        image: `${DEFAULT_APP_URL}/images/news.jpg`
    }

    const pageSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": `${DEFAULT_APP_URL}/articles`,
                "url": `${DEFAULT_APP_URL}/articles`,
                "name": `News & Articles`,
                "isPartOf": {
                    "@id": `website`
                },
                "primaryImageOfPage": {
                    "@id": `${DEFAULT_APP_URL}/#primaryimage`
                },
                "image": {
                    "@id": `${DEFAULT_APP_URL}/#primaryimage`
                },
                "thumbnailUrl": `${DEFAULT_APP_URL}/logo_orange.png`,
                "datePublished": "2023-01-10T05:20:08+00:00",
                "dateModified": DATE_MODIFIED,
                "breadcrumb": {
                    "@id": `services`
                },
                "inLanguage": "en-US",
                "potentialAction": [
                    {
                        "@type": "ReadAction",
                        "target": [
                            `${DEFAULT_APP_URL}/articles`
                        ]
                    }
                ]
            },
            {
                "@type": "BreadcrumbList",
                "@id": `services`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": `${DEFAULT_APP_URL}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "News & Articles",
                        "item": `${DEFAULT_APP_URL}/articles`
                    }
                ]
            }
        ]
    }

    return (
        <>
            <SEOHeader {...pageMeta} schema={pageSchema} />
            <Box py={20} sx={{
                background: getTheme(theme) ? BLUE_DARK_COLOR : theme.colors.dark[8]
            }}>
                <Container size={containerSize} py={60}>
                    <Title className={classes.title2}>Latest News & Articles</Title>
                </Container>
            </Box>
            <Box>
                <Container size={containerSize} py={50}>
                    <Grid>
                        <Grid.Col md={12}>
                            <Grid>
                                {articles.map((blog: BlogProps, i: number) => (
                                    <Grid.Col key={`blog_site_${i}`} md={4} sm={6} xs={6}>
                                        <BlogCardVertical {...blog} />
                                    </Grid.Col>
                                ))}
                            </Grid>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}
 
export const getStaticProps = async (ctx: any) => {
    const articlesQuery: any = await makeRequestOne(
        {
            url: `${URLS.BLOGS}`,
            method: "GET",
            params: { limit: 100, fields: 'id,user,full_name,username,categories,title,description,image,slug,tags' }
        }
    )
    
    return {
        props: {
            articles: articlesQuery?.data?.results
        },
        revalidate: 10,
    }
}


LatestNewsAndArticles.PageLayout = HeaderAndFooterWrapper

export default LatestNewsAndArticles