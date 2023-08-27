import { Group, Header, MediaQuery } from '@mantine/core'
import React from 'react'
import { getTheme } from '../../config/config'
import { BLUE_DARK_COLOR, BLUE_BG_COLOR, LOGO_URL } from '../../config/constants'
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle'
import HeaderLink from '../navigations/HeaderLink'
import AccountBtn from './AccountBtn'
import MenuDrawer, { navlinks } from './MenuDrawer'
import publicStyles from '../../styles/publicStyles'

const HeadingNav = () => {

    const { classes, theme } = publicStyles()

    return (
        <Header withBorder={true} height={{ base: 60, md: 70 }} px="md" sx={theme => ({
            backgroundColor: theme.colorScheme === 'dark' ? BLUE_DARK_COLOR : BLUE_BG_COLOR,
        })}>
            <Group className='h-100' position='apart' align='center'>
                <Group className='h-100' spacing={0}>
                    <MenuDrawer />
                    <img src={LOGO_URL} className={classes.image} />
                </Group>
                <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
                    <div>
                        {navlinks.map((link: any, i: number) => (
                            <HeaderLink key={`header_link_${i}`} {...link} />
                        ))}
                    </div>
                </MediaQuery>
                <Group spacing={'sm'}>
                    <ColorSchemeToggle />
                    <AccountBtn />
                </Group>
            </Group>
        </Header>
    )
}

export default HeadingNav