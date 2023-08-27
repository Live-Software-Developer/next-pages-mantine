import { AppShell } from '@mantine/core'
import React from 'react'
import CustomFooter from '../components/common/CustomFooter'
import { BLUE_BG_COLOR } from '../config/constants'
import HeadingNav from '../components/common/HeadingNav'


interface NavbarAndFooterWrapperProps {
    children: React.ReactNode
}

const HeaderAndFooterWrapper = ({ children }: NavbarAndFooterWrapperProps) => {

    return (
        <AppShell
            styles={(theme) => ({
                main: {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : BLUE_BG_COLOR,
                    overflow: "hidden",
                    transition: "color background-color 1s cubic-bezier(0.42, 0, 1, 1)",
                },
            })}

            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            hidden={false}
            padding={0}
            header={
               <HeadingNav />
            }
        >
            <div style={{ minHeight: "90vh" }}>
                {children}
            </div>
            <CustomFooter />
        </AppShell>
    )
}

export default HeaderAndFooterWrapper