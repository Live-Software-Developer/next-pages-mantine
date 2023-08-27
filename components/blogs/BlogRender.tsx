import { MantineNumberSize, Stack, Text, Title, TitleOrder, Group, Badge, Anchor } from '@mantine/core'
import React, { } from 'react'
import { CustomRenderer } from '../MyCustomForm/CustomWriterFields'
import Link from 'next/link'
import publicStyles from '../../styles/publicStyles'
import { toDate } from '../../config/config'


export interface highlightLine {
    [key: number]: boolean
}

export interface CodeProps {
    file: string
    value: string
    language: any
    withLineNumbers?: boolean
    hightlightLines?: highlightLine[]
}

export interface ImageProps {
    src: string
    alt?: string
    radius?: MantineNumberSize
}

export interface TextProps {
    value: string
    titleOrder?: TitleOrder | number
}

export interface BlogELementProps {
    type: string // image, text, video, code, title
    titleOrder?: TitleOrder // 1, 2, 3, 4, 5, 6
    value?: string // image url, text, video url, code,
    code?: CodeProps // code props
    codes?: CodeProps[]
    image?: ImageProps
    video?: ImageProps
    title?: TextProps
    text?: TextProps
}



const BlogRender = (props: any) => {
    const { title, description, details, tags, categories, user, created_on, modified_on } = props
    const { theme } = publicStyles()
    return (
        <>
            <Stack spacing="xs">
                <Title order={2}>{title}</Title>
                <Group position='apart'>
                    <Text size="sm">
                        Author: <Anchor component={Link} href={`/authors/${user?.id}/${user?.username}/`}>{user?.full_name}</Anchor>
                    </Text>
                    <Text size="sm">
                        Created On: <Text color='blue'>{toDate(created_on, true)}</Text>
                    </Text>
                    <Text size="sm">
                        Updated On: <Text color='blue'>{toDate(modified_on, true)}</Text>
                    </Text>
                </Group>
                <Group spacing="xs">
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
                <Group spacing="xs">
                    {
                        categories?.map((cat: any, i: number) => (
                            <Anchor key={`${cat?.id}_category_${i}`} component={Link} href={`/articles/categories/${cat?.id}/${cat?.slug}`}>
                                <Badge size='md' color='blue' variant='filled' radius="sm" px="md">
                                    {cat.title}
                                </Badge>
                            </Anchor>
                        ))
                    }
                </Group>
                <Text style={{
                    maxWidth: "100%",
                    overflow: "hidden",
                    wordBreak: "break-word",
                }}>{description}</Text>
                <CustomRenderer data={details} isPreviewingViewing={false} />
            </Stack>
        </>
    )
}

export default BlogRender
