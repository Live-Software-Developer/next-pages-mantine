import { Anchor, Box, Burger, Drawer, MediaQuery, NavLink, Stack, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { IconAlertCircle, IconArticle, IconHome2, IconLogin, IconLogout, IconMailFast, IconPhoneCalling, IconServerBolt, IconUser, IconUserCheck, IconUserCircle, IconUserPlus, IconWorldWww } from '@tabler/icons';
import React, { useEffect, useState } from 'react'
import { PRIMARY_SHADE } from '../../config/constants';
import Link from 'next/link';
import { showNotification } from '@mantine/notifications';
import { useAppContext } from '../../providers/appProvider';


interface CustomDrawerLinkProps {
    href: string,
    icon?: React.ReactElement | null,
    label: string,
    children?: CustomDrawerLinkProps[] | null,
    loginRequired?: boolean,
    click?: any
}

const CustomDrawerLink = (props: CustomDrawerLinkProps) => {

    const { label, href, icon, children, loginRequired, click } = props
    return (
        <>
            {
                children && children.length > 0 ? (
                    <NavLink label={label} icon={icon}>
                        {
                            children?.map((child: CustomDrawerLinkProps, i: number) => (
                                <CustomDrawerLink key={`drawer_child_${label}_${i}`} {...child} />
                            ))
                        }
                    </NavLink>
                ) : (
                    <Anchor component={Link} href={href} passHref>
                        <NavLink icon={icon} label={label} onClick={click} />
                    </Anchor>
                )
            }
        </>
    )
}

export const navlinks: CustomDrawerLinkProps[] = [
    { label: 'Home', href: '/', icon: <IconHome2 stroke={1.5} color={PRIMARY_SHADE[2]} /> },
    { label: 'Link One', href: '/link one', icon: <IconMailFast stroke={1.5} color={PRIMARY_SHADE[2]} /> },
    { label: 'Admin', href: '/admin', icon: <IconServerBolt stroke={1.5} color={PRIMARY_SHADE[2]} /> },
    { label: 'Services', href: '/services', icon: <IconWorldWww stroke={1.5} color={PRIMARY_SHADE[2]} /> },
    { label: 'Articles', href: '/articles', icon: <IconArticle stroke={1.5} color={PRIMARY_SHADE[2]} /> },
    { label: 'Contact Us', href: '/contact-us', icon: <IconPhoneCalling stroke={1.5} color={PRIMARY_SHADE[2]} /> },
    { label: 'About Us', href: '/about-us', icon: <IconUserCheck stroke={1.5} color={PRIMARY_SHADE[2]} /> },
]



const accountLinks: CustomDrawerLinkProps[] = [
    {
        label: "Sign Up",
        href: "/auth/signup",
        icon: <IconUserPlus stroke={1.5} color={PRIMARY_SHADE[2]} />,
        loginRequired: false
    },
    {
        label: "Login",
        href: "/auth/login",
        icon: <IconLogin stroke={1.5} color={PRIMARY_SHADE[2]} />,
        loginRequired: false
    },

    {
        label: "Profile",
        href: "/account",
        icon: <IconUser stroke={1.5} color={PRIMARY_SHADE[2]} />,
        loginRequired: true
    },
]

export const LogoutLink = () => {

    const handleLogout = () => {
        showNotification({
            title: "Account logout",
            message: "You have logged out successfully",
            color: "blue",
            icon: <IconAlertCircle stroke={1.5} />
        })
    }

    return (
        <NavLink icon={<IconLogout stroke={1.5} color={PRIMARY_SHADE[2]} />} label={'Logout'}
            onClick={handleLogout} />
    )
}


const MenuDrawer = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [opened, { open, close }] = useDisclosure(false);
    const { login_status } = useAppContext()

    const theme = useMantineTheme();

    useEffect(() => {
        setLoggedIn(login_status)
    }, [])
    return (
        <div style={{ position: "relative" }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                    opened={opened}
                    onClick={open}
                    size="sm"
                    color={theme.colors.gray[6]}
                />
            </MediaQuery>
            <Drawer
                opened={opened}
                onClose={close}
                title="Menu"
                padding="xl"
                size="sm"
                position='left'
                overlayProps={{
                    opacity: .3,
                    blur: 5,
                }}
                withOverlay
                shadow='lg'
            >
                <Stack spacing={0}>
                    {navlinks.map((linkInfo: CustomDrawerLinkProps, i: number) => (
                        <CustomDrawerLink key={`drawer_link_${i}`} {...linkInfo} click={close} />
                    ))}
                </Stack>
                <NavLink label="Account" icon={<IconUserCircle stroke={1.5} color={PRIMARY_SHADE[2]} />}>
                    {loggedIn ? (
                        <>
                            {accountLinks.filter(e => e.loginRequired === true).map((linkInfo: CustomDrawerLinkProps, i: number) => (
                                <CustomDrawerLink key={`drawer_link_loggedin_${i}`} {...linkInfo} click={close} />
                            ))}
                            <LogoutLink />
                        </>
                    ) : (
                        <>
                            {accountLinks.filter(e => e.loginRequired === false).map((linkInfo: CustomDrawerLinkProps, i: number) => (
                                <CustomDrawerLink key={`drawer_link_account_${i}`} {...linkInfo} click={close} />
                            ))}
                        </>
                    )}
                </NavLink>
                <Box sx={{ height: "30px" }}></Box>
            </Drawer>
        </div>
    )
}

export default MenuDrawer