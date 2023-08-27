import { Burger, Group, Header, MediaQuery } from '@mantine/core'
import React from 'react'
import { getTheme } from '../../../config/config'
import { BLUE_DARK_COLOR, BLUE_BG_COLOR, LOGO_URL } from '../../../config/constants'
import { ColorSchemeToggle } from '../../ColorSchemeToggle/ColorSchemeToggle'
import AccountBtn from '../../common/AccountBtn'
import { useMediaQuery } from '@mantine/hooks'
import publicStyles from '../../../styles/publicStyles'

interface ICustomHeader {
    opened: boolean
    open: any
}

const CustomHeader = (props: ICustomHeader) => {
    const { opened, open } = props
    const { classes, theme } = publicStyles()
    return (
        <Header withBorder={false} zIndex={150} height={{ base: 50, md: 60 }} px="md" py="xs" sx={theme => ({
            backgroundColor: theme.colorScheme === 'dark' ? BLUE_DARK_COLOR : BLUE_BG_COLOR,
        })}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", height: '100%' }}>
                <div className='h-100'>
                    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                        <Burger
                            opened={opened}
                            onClick={open}
                            size="sm"
                            color={theme.colors.gray[6]}
                            mr="xl"
                        />
                    </MediaQuery>

                    <img src={LOGO_URL} className={classes.image} />
                </div>

                <Group spacing={'sm'}>
                    <ColorSchemeToggle />
                    <AccountBtn />
                </Group>
            </div>
        </Header>
    )
}

export default CustomHeader