import { Anchor, Badge, Box, Card, Group, Image, Text, Title } from '@mantine/core'
import React from 'react'
import publicStyles from '../../styles/publicStyles'
import Link from 'next/link'
import { getTheme, limitChars } from '../../config/config'

export interface BlogProps {
    title: string,
    image: any,
    description: string,
    slug?: string,
    id?: string,
    isAdmin?: boolean
    tags?: any,
    categories?: any
    user?: any
}

const BlogCardVertical = (props: BlogProps) => {
    const { id, slug, title, image, description, isAdmin, tags, categories, user } = props

    const { classes, theme } = publicStyles()

    return (
        <Card p="xl" className='h-100' radius="lg" style={{
            background: getTheme(theme) ? theme.colors.dark[4] : (isAdmin ? theme.colors.gray[1] : theme.white)
        }}>
            <Box sx={{
                height: "200px",
                overflow: "hidden"
            }}>
                <Image imageProps={{loading: 'lazy'}} radius="lg" maw="100% !important" height="200px !important" mah="100% !important" withPlaceholder src={image} alt={title} />
            </Box>
            <Card.Section p={20}>
                <Group spacing={2}>
                    {
                        categories?.map((cat: any, i: number) => (
                            <Anchor key={`${cat?.id}_category_${i}`} component={Link} href={`/articles/categories/${cat?.id}/${cat?.slug}`}>
                                <Badge size='sm' color='green' variant='filled' radius="xl" px="md">
                                    {cat.title}
                                </Badge>
                            </Anchor>
                        ))
                    }
                </Group>
                <Anchor component={Link} href={`/articles/${id}/${slug}`} passHref sx={{
                    textDecoration: "none !important"
                }}>
                    <Box>
                        <Title order={4} className={classes.color} sx={{
                            cursor: "pointer",
                            ":hover": {
                                color: theme.colors.blue[6]
                            }
                        }} mb="sm" size={18}>
                            {title}
                        </Title>
                    </Box>
                </Anchor>
                <Text size="sm">
                    {limitChars(description, 240)}
                </Text>
                <Group spacing={2}>
                    {
                        tags?.map((tag: any, i: number) => (
                            <Anchor key={`${tag?.id}_tag_${i}`} component={Link} href={`/articles/tags/${tag?.id}/${tag?.slug}`}>
                                <Text size="xs" color={theme.colors.blue[6]}>
                                    {`#${tag?.title}`}
                                </Text>
                            </Anchor>
                        ))
                    }
                </Group>
                <Text size="sm">
                    Author: <Anchor component={Link} href={`/authors/${user?.id}/${user?.username}/`}>{user?.full_name}</Anchor>
                </Text>
                {
                    isAdmin ? (
                        <Group>
                            <Anchor component={Link} href={`/articles/update/${id}`} passHref>
                                <Text size="sm" color={theme.colors.blue[6]}>
                                    Edit
                                </Text>
                            </Anchor>
                            {/* <Anchor component={Link} href={`/admin/articles/${id}`} passHref>
                                <Text size="sm" color={theme.colors.red[6]}>
                                    Delete
                                </Text>
                            </Anchor> */}
                        </Group>
                    ) : null
                }
            </Card.Section>
        </Card>
    )
}

export default BlogCardVertical