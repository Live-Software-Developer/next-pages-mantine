import React from 'react'
import HeaderAndFooterWrapper from '../../layouts/HeaderAndFooterWrapper'
import { Anchor, Box, Card, Container, Grid, Group, PasswordInput, Stack, Text, TextInput, Title, Center, Image } from '@mantine/core'
import publicStyles from '../../styles/publicStyles'
import { CallToActionButtonAction } from '../../components/cta/CallToActionButton'
import { IconAlertOctagon, IconAlertTriangle, IconLogin, IconPassword, IconUser } from '@tabler/icons'
import Link from 'next/link'
import { LOCAL_STORAGE_KEYS, useAppContext } from '../../providers/appProvider'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useForm } from '@mantine/form'
import { makeRequest } from '../../config/config'
import { URLS } from '../../config/constants'
import { displayErrors } from '../../config/functions'
import { showNotification } from '@mantine/notifications'

const Login = (props: any) => {
    const { loginStatus } = props
    const { login } = useAppContext()

    const { classes, theme } = publicStyles()
    const router = useRouter()

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
        validate: {
            username: (value) => value === '' ? 'Username is required' : null,
            password: (value) => value === '' ? 'Password is required' : null,
        }
    })

    const handleLogin = () => {
        const user_ = {
            id: 1,
            username: 'admin',
            email: 'dalmas@gmail.com',
            first_name: 'Dalmas',
            last_name: 'Ogembo',
        }
        // login(user_, 'token')
        // router.push('/')
        makeRequest(URLS.LOGIN + "/", 'POST', {}, form.values).then((res: any) => {
            if (res.success) {
                login(res.success?.user, res.success?.token)
                router.push('/')
            }
            if (res.error) {
                const errors = res.error.response?.data
                if (typeof errors === 'object' && errors !== null && errors !== undefined) {
                    displayErrors(form, errors)
                }
                showNotification({
                    title: 'Error',
                    message: res.error?.message,
                    color: 'red',
                    icon: <IconAlertTriangle stroke={1.5} />,
                })
            }
        }).catch((error) => {
            showNotification({
                title: 'Error',
                message: "An error occurred. Please try again",
                color: 'red',
                icon: <IconAlertTriangle stroke={1.5} />,
            })
        })
        login({username: "dalmas"}, "some token")
    }

    React.useEffect(() => {
        if (loginStatus) {
            showNotification({
                title: 'Not Allowed',
                message: "You are already logged in",
                color: 'yellow',
                icon: <IconAlertOctagon stroke={1.5} />,
            })
            router.push('/')
        }
    }, [])

    return (
        <>
            <Box>
                <Container size={"xs"} py={50}>

                    <Card radius="lg" p={50}>
                        <Stack>
                            <Center>
                                <Image src={'/icon.png'} className={classes.image} width={80} />
                            </Center>
                            <Title className={classes.title2} align='center'>Login</Title>
                            <Text align='center'>Please login to your account to get started.</Text>
                            <form onSubmit={form.onSubmit((values) => handleLogin())}>
                                <Grid>
                                    <Grid.Col>
                                        <TextInput
                                            label="Username"
                                            placeholder='Enter your username'
                                            radius="md"
                                            icon={<IconUser stroke={1.5} />}
                                            autoFocus={true}
                                            {...form.getInputProps('username')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col>
                                        <PasswordInput
                                            label="Password"
                                            placeholder='Enter your password'
                                            radius="md"
                                            icon={<IconPassword stroke={1.5} />}
                                            {...form.getInputProps('password')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col>
                                        <Stack align='center' spacing={16}>
                                            <CallToActionButtonAction label={'Login'} type='submit' icon={<IconLogin stroke={1.5} color='white' />} />
                                            <Group spacing={4} p={0}>
                                                <Text size="sm">
                                                    Forgot Password?
                                                </Text>
                                                <Anchor component={Link} href="/auth/password/reset" size="sm">
                                                    Reset Password
                                                </Anchor>
                                            </Group>
                                            <Group spacing={4} p={0}>
                                                <Text size="sm">
                                                    Don't have an account?
                                                </Text>
                                                <Anchor component={Link} href="/auth/signup" size="sm">
                                                    Sign up
                                                </Anchor>
                                            </Group>
                                        </Stack>
                                    </Grid.Col>
                                </Grid>
                            </form>
                        </Stack>
                    </Card>
                </Container>
            </Box>
        </>
    )
}

export async function getServerSideProps(context: any) {
    const status = getCookie(LOCAL_STORAGE_KEYS.login_status, context)

    return {
        props: {
            loginStatus: status ? status : false,
        },
    }
}

Login.PageLayout = HeaderAndFooterWrapper

export default Login