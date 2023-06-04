import { useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    Aside,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    Group,
    Box,
    ScrollArea,
    Stack,
    NavLink,
    TextInput,
    Grid,
    Center,
    ActionIcon,
} from '@mantine/core';
import publicStyles from '../styles/publicStyles';
import { useMediaQuery } from '@mantine/hooks';
import AccountBtn from '../components/common/AccountBtn';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { getTheme } from '../config/config';
import { BLUE_DARK_COLOR, BLUE_BG_COLOR } from '../config/constants';
import SidebarLink, { SidebarLinkGroupProps, SidebarLinkProps } from '../components/navigations/SidebarLink';
import { IconArticle, IconCategory, IconCategory2, IconDashboard, IconHash, IconHome2, IconLogout, IconMessage, IconPhoto, IconPlus, IconQuote, IconSettings, IconTag, IconTags, IconUserCheck, IconUserPlus, IconUsers } from '@tabler/icons';
import Link from 'next/link';
import { useAppContext } from '../providers/appProvider';


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

interface AdminWrapperProps {
    children: React.ReactNode
}

export default function AdminWrapper({ children }: AdminWrapperProps) {
    const {logout, login_status} = useAppContext()
    const [opened, setOpened] = useState(false);
    const closeDrawer = () => setOpened((o) => !o)

    const theme = useMantineTheme();
    const { classes } = publicStyles()
    const matches = useMediaQuery('(max-width: 992px)');

    return (
        <AppShell
            styles={(theme) => ({
                main: {
                    // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : BLUE_BG_COLOR,
                    overflow: "hidden",
                    transition: "color background-color 1s cubic-bezier(0.42, 0, 1, 1)",
                },
            })}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
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
                                            <SidebarLink key={`${index}_nav`} {...link} click={closeDrawer} />
                                        ))
                                    }
                                </Box>
                            ))
                        }
                    </Navbar.Section>
                    <Navbar.Section>
                        <Stack style={{ height: "130px" }} justify="flex-end" spacing={0}>
                            <SidebarLink icon={<IconSettings stroke={1.5} />} label={'Settings'} href={'/'} click={closeDrawer} />
                            <NavLink icon={<IconLogout stroke={1.5} />} label={'Logout'} onClick={() => {
                                closeDrawer()
                                logout()
                            }} style={{
                                borderRadius: theme.radius.md,
                            }} />
                        </Stack>
                    </Navbar.Section>
                </Navbar>
            }
            aside={
                <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                    <Aside withBorder={false} p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 350 }}
                        style={{
                            backgroundColor: theme.colorScheme === 'dark' ? BLUE_DARK_COLOR : BLUE_BG_COLOR,
                            boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                        }}>
                        <Text>Tasks</Text>
                        <Grid>
                            <Grid.Col span={10}>
                                <TextInput radius="md" placeholder='New Task' width={"100%"} />
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Center>
                                    <ActionIcon >
                                        <IconPlus stroke={1.5} />
                                    </ActionIcon>
                                </Center>
                            </Grid.Col>
                        </Grid>
                    </Aside>
                </MediaQuery>
            }
            header={
                <Header withBorder={false} zIndex={150} height={{ base: 50, md: 60 }} px="md" py="xs" sx={theme => ({
                    backgroundColor: theme.colorScheme === 'dark' ? BLUE_DARK_COLOR : BLUE_BG_COLOR,
                })}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", height: '100%' }}>
                        <div className='h-100'>
                            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                                <Burger
                                    opened={opened}
                                    onClick={() => setOpened((o) => !o)}
                                    size="sm"
                                    color={theme.colors.gray[6]}
                                    mr="xl"
                                />
                            </MediaQuery>

                            <img src={getTheme(theme) ? '/logo_orange.png' : '/logo_black_small.png'} className={classes.image} />
                        </div>

                        <Group spacing={'sm'}>
                            <ColorSchemeToggle />
                            <AccountBtn />
                        </Group>
                    </div>
                </Header>
            }
        >
            <div style={{ minHeight: "90vh" }}>
                {children}
            </div>
        </AppShell>
    );
}