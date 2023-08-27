import { BackgroundImage, Box, Container, Grid, Skeleton, Stack, Title } from '@mantine/core'
import BlogRender from '../../../components/blogs/BlogRender'
import HeaderAndFooterWrapper from '../../../layouts/HeaderAndFooterWrapper'
import { getTheme, makeRequestOne } from '../../../config/config'
import { DATE_MODIFIED, DEFAULT_APP_URL, URLS, containerSize } from '../../../config/constants'
import publicStyles from '../../../styles/publicStyles'
import SEOHeader, { SEOHeaderProps } from '../../../components/seo/SEOHeader'

import { serialize } from 'next-mdx-remote/serialize'
import rehypeHighlight from 'rehype-highlight'
import remarkDirective from 'remark-directive'
import SidebarBlog from '../../../components/blogs/SidebarBlog'
import Head from 'next/head'

interface ISingleArticle {
    article: any
    articles: any
}

const SingleArticle = ({ article, articles }: ISingleArticle) => {

    const pageMeta: SEOHeaderProps = {
        title: `${article?.title} : News & Article`,
        description: `${article?.description}`,
        keywords: article?.keywords,
        twitter_card: "summary_large_image",
        url: `${DEFAULT_APP_URL}/articles/${article?.id}/${article?.slug}`,
        image: article?.image
    }

    const { classes } = publicStyles()

    if (!article) {
        return (
            <>
                <Skeleton>
                    <Skeleton height={50} />
                    <Skeleton height={10} />
                    <Skeleton height={10} />
                    <Skeleton height={10} />
                </Skeleton>
            </>
        )
    }


    const pageSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "@id": `article-${article?.id}`,
                "isPartOf": {
                    "@id": `articles`
                },
                "author": {
                    "name": article?.user?.full_name,
                    "@id": `${DEFAULT_APP_URL}/authors/${article?.user?.id}/${article?.user?.username}/`
                },
                "headline": article?.title,
                "datePublished": article?.created_on,
                "dateModified": article?.modified_on,
                "mainEntityOfPage": {
                    "@id": "articles"
                },
                "publisher": {
                    "@id": `website`
                },
                "image": {
                    "@id": `${DEFAULT_APP_URL}/#primaryimage`
                },
                "thumbnailUrl": article?.image,
                "keywords": [
                    article?.keywords
                ],
                "articleSection": [
                    "Website Development",
                    "Web hosting",
                ],
                "inLanguage": "en-US",
                "potentialAction": [
                    {
                        "@type": "CommentAction",
                        "name": "Comment",
                        "target": [
                            `${DEFAULT_APP_URL}/articles/${article?.id}/${article?.slug}`
                        ]
                    }
                ]
            },
            {
                "@type": "WebPage",
                "@id": `${DEFAULT_APP_URL}/articles/${article?.id}/${article?.slug}`,
                "url": `${DEFAULT_APP_URL}/articles/${article?.id}/${article?.slug}`,
                "name": article?.title,
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
                    "@id": `article-${article.id}`
                },
                "inLanguage": "en-US",
                "potentialAction": [
                    {
                        "@type": "ReadAction",
                        "target": [
                            `${DEFAULT_APP_URL}/articles/${article?.id}/${article?.slug}`
                        ]
                    }
                ]
            },
            {
                "@type": "BreadcrumbList",
                "@id": `article-${article.id}`,
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
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": article?.title,
                    },
                ]
            },
            {
                "@type": "Person",
                "@id": `${DEFAULT_APP_URL}/authors/${article?.user?.id}/${article?.user?.username}/`,
                "name": article?.user?.full_name,
                "image": {
                    "@type": "ImageObject",
                    "inLanguage": "en-US",
                    "@id": `${DEFAULT_APP_URL}/#/schema/person/image/`,
                    "url": article?.user?.profile?.avatar?.image,
                    "contentUrl": article?.user?.profile?.avatar?.image,
                    "caption": article?.user?.full_name,
                },
                "description": article?.user?.profile?.short_bio,
                "sameAs": [

                ],
                "url": `${DEFAULT_APP_URL}/authors/${article?.user?.id}/${article?.user?.username}/`
            }
        ]
    }

    return (
        <>
            <SEOHeader {...pageMeta} schema={pageSchema} />
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"  />
            </Head>
            <BackgroundImage src={article?.image}>
                <Box py={20} sx={{
                    background: "linear-gradient(90deg, rgba(0,0,0,0.7), rgba(0,0,0,0.8) 100%)",
                }}>
                    <Container size={containerSize} py={60}>
                        <Title className={classes.title4} style={{
                            maxWidth: "800px"
                        }}>{article?.title}</Title>
                    </Container>
                </Box>
            </BackgroundImage>
            <Box>
                <Container size={"lg"} py={50}>
                    <Grid>
                        <Grid.Col md={8}>
                            <BlogRender {...article} />
                        </Grid.Col>
                        <Grid.Col md={4}>
                            <Box p="sm" sx={theme => ({
                                background: getTheme(theme) ? theme.colors.dark[5] : theme.colors.gray[1],
                                borderRadius: theme.radius.md
                            })}>
                                <Stack>
                                    <Title order={3} size={32}>You might also be interested in</Title>
                                    {
                                        articles?.map((article: any, i: number) => (
                                            <SidebarBlog key={`sidebar_${article?.id}`} {...article} />
                                        ))
                                    }
                                </Stack>
                                <Box mt="lg" >
                                    <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flivesoftwaredeveloper%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=299029632041179"
                                        width="100%" height="500"
                                        style={{ border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                </Box>
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export async function getStaticPaths() {
    const articlesQuery = await makeRequestOne(
        {
            url: `${URLS.BLOGS}`,
            method: "GET",
            params: { limit: 100, fields: 'id,slug' }
        }
    )
    let paths = articlesQuery?.data?.results?.map((article: any) => {
        return {
            params: { articleID: article?.id?.toString(), articleSlug: article?.slug?.toString() },
        }
    })

    return {
        paths: paths,
        fallback: true, // can also be true, false or 'blocking',
    }
}

export const getStaticProps = async (ctx: any) => {
    const { params } = ctx
    const articleQuery = await makeRequestOne(
        {
            url: `${URLS.BLOGS}/${params?.articleID}`,
            method: "GET",
            params: {
                // fields: 'id,user,full_name,username,categories,title,description,details,image,keywords,replies,slug,tags,created_on,modified_on'
            }
        }
    )
    let blog = articleQuery.data
    let blog_details = blog?.details
    let new_details = blog_details.map(async (detail: any) => {
        if (detail?.type === 'text') {
            const txt_serialized = await serialize(detail.value, {
                scope: {},
                mdxOptions: {
                    remarkPlugins: [remarkDirective],
                    rehypePlugins: [[rehypeHighlight, {
                        ignoreMissing: true,
                    }]],
                    format: 'mdx',
                },
                parseFrontmatter: false,
            })
            detail.value = txt_serialized
            return detail
        }
        return detail
    })

    const articlesQuery: any = await makeRequestOne(
        {
            url: `${URLS.RANDOM_BLOGS}`,
            method: "GET",
            params: { limit: 10, fields: 'id,user,full_name,username,categories,title,description,profile,avatar,image,slug,tags' }
        }
    )

    return Promise.all(new_details).then((values: any) => {
        blog.details = values
        return {
            props: {
                article: blog,
                articles: articlesQuery?.data?.results,
            },
            revalidate: 10
        }
    })
}

SingleArticle.PageLayout = HeaderAndFooterWrapper

export default SingleArticle
