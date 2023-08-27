import { Aside, Grid, TextInput, Center, ActionIcon, Text, useMantineTheme } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import React from 'react'
import { BLUE_DARK_COLOR, BLUE_BG_COLOR } from '../../../config/constants'

const RightASide = () => {
    const theme = useMantineTheme()
    
    return (
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
    )
}

export default RightASide