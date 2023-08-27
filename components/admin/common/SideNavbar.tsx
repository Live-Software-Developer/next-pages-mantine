import { Navbar, ScrollArea, Box, Stack, NavLink, Text, useMantineTheme } from '@mantine/core'
import { IconSettings, IconLogout, IconArticle, IconCategory, IconCategory2, IconDashboard, IconHash, IconHome2, IconMessage, IconPhoto, IconPlus, IconQuote, IconTags, IconUserCheck, IconUserPlus, IconUsers } from '@tabler/icons'
import React, { useState } from 'react'
import { BLUE_DARK_COLOR, BLUE_BG_COLOR } from '../../../config/constants'
import SidebarLink, { SidebarLinkGroupProps } from '../../navigations/SidebarLink'
import { useMediaQuery } from '@mantine/hooks'
import { useAppContext } from '../../../providers/appProvider'
import publicStyles from '../../../styles/publicStyles'

const sidebarLinkGroups: SidebarLinkGroupProps[] = [
    {
        id: "application",
        label: "Application",
        links: [
            {
                label: 'App Home',
                icon: <IconHome2 stroke={1.5} />,
                href: '/'
            },
            {
                label: 'Dashboard',
                icon: <IconDashboard stroke={1.5} />,
                href: '/admin'
            },
            {
                label: 'Reviews',
                icon: <IconQuote stroke={1.5} />,
                href: '/admin/reviews'
            },
            {
                label: 'Contact',
                icon: <IconMessage stroke={1.5} />,
                href: '/admin/contact-messages'
            },
        ],
    },
    {
        id: "users",
        label: "Users",
        links: [
            {
                label: 'All Users',
                icon: <IconUsers stroke={1.5} />,
                href: '/admin'
            },
            {
                label: 'Add New',
                icon: <IconUserPlus stroke={1.5} />,
                href: '/admin/reviews'
            },
            {
                label: 'Admins',
                icon: <IconUserCheck stroke={1.5} />,
                href: '/admin/contact-messages'
            },
        ],
    },
    {
        id: "bloging",
        label: "News & Articles",
        links: [
            {
                label: 'Articles',
                icon: <IconArticle stroke={1.5} />,
                href: '/articles',
                children: [
                    {
                        label: 'All Articles',
                        href: '/admin/articles',
                        icon: <IconArticle stroke={1.5} />,
                    },
                    {
                        label: 'Add New',
                        href: '/articles/create',
                        icon: <IconPlus stroke={1.5} />,
                    }
                ]
            },
            {
                label: 'Article Categories',
                icon: <IconCategory stroke={1.5} />,
                href: '/admin/categories',
                children: [
                    {
                        label: 'All Categories',
                        href: '/admin/categories',
                        icon: <IconCategory2 stroke={1.5} />,
                    },
                    {
                        label: 'Add New',
                        href: '/admin/categories/create',
                        icon: <IconPlus stroke={1.5} />,
                    }
                ]
            },
            {
                label: 'Article Tags',
                icon: <IconHash stroke={1.5} />,
                href: '/admin/tags',
                children: [
                    {
                        label: 'All Tags',
                        href: '/admin/tags',
                        icon: <IconTags stroke={1.5} />,
                    },
                    {
                        label: 'Add New',
                        href: '/admin/tags/create',
                        icon: <IconPlus stroke={1.5} />,
                    }
                ]
            },
        ],
    },
    {
        id: "media",
        label: "Media",
        links: [
            {
                label: 'Assets',
                icon: <IconPhoto stroke={1.5} />,
                href: '/admin/assets/'
            },
        ]
    }
]

interface ISideNavbar {
    opened: boolean
    close: any
}

const SideNavbar = (props: ISideNavbar) => {

    const { opened, close } = props
    const { logout } = useAppContext()

    const theme = useMantineTheme();

    return (
        <Navbar withBorder={false} p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 250 }}
            style={{
                backgroundColor: theme.colorScheme === 'dark' ? BLUE_DARK_COLOR : BLUE_BG_COLOR,
            }}>
            <Navbar.Section grow component={ScrollArea} scrollbarSize={4} mx="-xs" px="xs">
                {
                    sidebarLinkGroups.map((group: SidebarLinkGroupProps, i: number) => (
                        <Box key={`group_${group.id}`} mb={10}>
                            <Text mb={6}>{group.label}</Text>
                            {
                                group.links.map((link, index) => (
                                    <SidebarLink key={`${index}_nav`} {...link} click={close} />
                                ))
                            }
                        </Box>
                    ))
                }
            </Navbar.Section>
            <Navbar.Section>
                <Stack style={{ height: "130px" }} justify="flex-end" spacing={0}>
                    <SidebarLink icon={<IconSettings stroke={1.5} />} label={'Settings'} href={'/'} click={close} />
                    <NavLink icon={<IconLogout stroke={1.5} />} label={'Logout'} onClick={() => {
                        close()
                        logout()
                    }} style={{
                        borderRadius: theme.radius.md,
                    }} />
                </Stack>
            </Navbar.Section>
        </Navbar>
    )
}

export default SideNavbar