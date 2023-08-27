import React from 'react'
import { BlogProps } from './BlogCardVertical'
import { Anchor, Avatar, Box, Group, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { IconUser } from '@tabler/icons'
import { getTheme } from '../../config/config'


const SidebarBlog = (props: BlogProps) => {

    const { id, slug, title, image, user } = props

    return (
        <Group>
            <Avatar src={image} size={"60px"} />
            <Box style={{ width: "calc(100% - 80px)" }}>
                <Anchor component={Link} href={`/articles/${id}/${slug}`} sx={theme => ({
                    color: getTheme(theme) ? theme.colors.gray[3] : theme.colors.dark[8]
                })}>
                    <Title order={4} weight={400} size={16}>{title}</Title>
                </Anchor>
                <Group>
                    <IconUser size={14} />
                    <Text size="xs">{user?.full_name}</Text>
                </Group>
            </Box>
        </Group>
    )
}

export default SidebarBlog