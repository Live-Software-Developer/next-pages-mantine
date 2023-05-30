import React, { forwardRef, useState } from 'react'
import SEOHeader, { SEOHeaderProps } from '../components/seo/SEOHeader'
import { APP_NAME, BLUE_DARK_COLOR, DEFAULT_APP_URL, EMOJIS, URLS, containerSize } from '../config/constants'
import { Box, Container, Grid, Image, TextInput, Title, Card, Textarea, Select, Avatar, Group, Text, Stack, List, Anchor, Loader } from '@mantine/core'
import { getTheme, limitChars, makeRequest } from '../config/config'
import publicStyles from '../styles/publicStyles'
import HeaderAndFooterWrapper from '../layouts/HeaderAndFooterWrapper'
import { ServiceProps } from '../components/pages/home/OurServices'
import { services } from '../components/pages/home/OurServices'
import { useForm } from '@mantine/form'
import { IconAlertCircle, IconAlertTriangle, IconMail, IconMapPin, IconPhone, IconSend } from '@tabler/icons'
import { CallToActionButtonAction } from '../components/cta/CallToActionButton'
import { showNotification } from '@mantine/notifications'
import { displayErrors } from '../config/functions'

const ServiceSelectItem = forwardRef<HTMLDivElement, ServiceProps>(
    ({ icon, title, description, ...others }: ServiceProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <Avatar size={32} src={icon} />
                <div>
                    <Text size="sm">{title}</Text>
                    <Text size="xs" opacity={0.65}>
                        {limitChars(description, 20)}
                    </Text>
                </div>
            </Group>
        </div>
    )
);

const ContactUs = () => {

    const pageMeta: SEOHeaderProps = {
        title: `Contact Us`,
        description: "Contact Live Software Developer Limited for your software development, web hosting, and domain registration needs. Get in touch with us today.",
        keywords: " contact us, Live Software Developer Limited, software development, web hosting, domain registration, software development",
        twitter_card: "summary_large_image",
        url: `${DEFAULT_APP_URL}/contact-us`,
        image: `${DEFAULT_APP_URL}/images/contactus.png`
    }

    const [loading, setLoading] = useState(false)

    const { theme, classes } = publicStyles()
    // Write regex to test email
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            company: '',
            service: '',
            other: '',
            subject: '',
            message: '',
        },
        validate: {
            name: (value) => (value.length < 3 ? 'Name must be at least 3 characters long' : null),
            email: (value) => (emailRegex.test(value) ? null : 'Enter the right email'),
            phone: (value) => (value.length < 9 ? 'Phone number must be at least 11 characters long' : null),
            subject: (value) => (value.length < 10 ? 'Subject must be at least 10 characters long' : null),
        }
    })

    const handleContact = () => {
        setLoading(true)
        makeRequest(URLS.CONTACT + "/", 'POST', {
            // 'Content-Type': 'multipart/form-data',
        }, form.values).then((res: any) => {
            if (res.success) {
                showNotification({
                    title: `Success ${EMOJIS['partying']}`,
                    message: `Your message has been sent successfully. We'll get back to you as soon as possible ${EMOJIS['yum']}`,
                    color: 'green',
                    icon: <IconAlertCircle stroke={1.5} />,
                })
                form.reset()
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
                title: `Error ${EMOJIS['raised_eyebrow']}`,
                message: "An error occurred. Please try again",
                color: 'red',
                icon: <IconAlertTriangle stroke={1.5} />,
            })
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            <SEOHeader {...pageMeta} />
            <Box py={20} sx={{
                background: getTheme(theme) ? BLUE_DARK_COLOR : theme.colors.dark[8]
            }}>
                <Container size={containerSize} py={60}>
                    <Title className={classes.title2}>Contact Us</Title>
                </Container>
            </Box>
            <Container size={containerSize} py={50}>
                <Grid>
                    <Grid.Col md={7}>
                        <Card radius="lg" py="lg">
                            <Stack>
                                <Title order={2} className={classes.title2} align='center'>Write to Us</Title>
                                <Text weight={500} align="center">
                                    We'd love to hear from you! Please fill out the form below and we'll get back to you as soon as possible.
                                </Text>
                                <form onSubmit={form.onSubmit((values) => handleContact())}>
                                    <Grid>
                                        <Grid.Col md={6}>
                                            <TextInput
                                                label="Full Name"
                                                placeholder='Enter your full name'
                                                radius="sm"
                                                {...form.getInputProps('name')}
                                                withAsterisk
                                                required
                                            />
                                        </Grid.Col>
                                        <Grid.Col md={6}>
                                            <TextInput
                                                label="Email"
                                                placeholder='Enter your email address'
                                                radius="sm"
                                                {...form.getInputProps('email')}
                                                withAsterisk
                                                required
                                            />
                                        </Grid.Col>
                                        <Grid.Col md={6}>
                                            <TextInput
                                                label="Phone Number"
                                                placeholder='Enter your phone number'
                                                radius="sm"
                                                {...form.getInputProps('phone')}
                                                withAsterisk
                                                required
                                            />
                                        </Grid.Col>
                                        <Grid.Col md={6}>
                                            <TextInput
                                                label="Company Name"
                                                placeholder='Enter your company name'
                                                radius={"sm"}
                                                {...form.getInputProps('company')}
                                            />
                                        </Grid.Col>
                                        <Grid.Col md={12}>
                                            <Select label="Service" searchable
                                                placeholder='Select your service'
                                                data={[...services.map((service: ServiceProps) => ({
                                                    value: service.title,
                                                    label: service.title,
                                                    title: service.title,
                                                    description: service.description,
                                                    icon: service.icon,
                                                    image: service.image
                                                }))
                                                ].concat([{
                                                    value: 'other',
                                                    label: "Other",
                                                    title: "Other",
                                                    description: "Other",
                                                    icon: "/images/other.png",
                                                    image: "/images/other.png"
                                                }])}
                                                clearable
                                                itemComponent={ServiceSelectItem}
                                                filter={(value, item) =>
                                                    item.title.toLowerCase().includes(value.toLowerCase().trim()) ||
                                                    item.description.toLowerCase().includes(value.toLowerCase().trim())
                                                }
                                                {...form.getInputProps('service')}
                                                withAsterisk
                                                required
                                            />
                                        </Grid.Col>
                                        {
                                            form.values.service === "other" && (
                                                <Grid.Col md={12}>
                                                    <TextInput
                                                        label="Other"
                                                        placeholder='Enter your other service'
                                                        radius="sm"
                                                        {...form.getInputProps('other')}
                                                    />
                                                </Grid.Col>
                                            )
                                        }
                                        <Grid.Col md={12}>
                                            <TextInput
                                                label="Subject"
                                                placeholder='Enter your subject'
                                                radius="sm"
                                                {...form.getInputProps('subject')}
                                                withAsterisk
                                                required
                                            />
                                        </Grid.Col>
                                        <Grid.Col md={12}>
                                            <Textarea
                                                minRows={5}
                                                label="Message"
                                                placeholder='Enter your message'
                                                radius="sm"
                                                {...form.getInputProps('message')}
                                                withAsterisk
                                                required
                                            />
                                        </Grid.Col>
                                        <Grid.Col md={12}>
                                            <CallToActionButtonAction label={'Send Message'} type='submit' icon={<IconSend stroke={1.5} color='white' />} rightIcon={loading ? <Loader size="sm" color='white' /> : <></>} />
                                        </Grid.Col>
                                    </Grid>
                                </form>
                            </Stack>
                        </Card>
                    </Grid.Col>
                    <Grid.Col md={5}>
                        <Card radius="lg" py="lg" className={`position-relative ${classes.absolute1}`}>
                            <Stack style={{
                                zIndex: 1000,
                                position: "relative"
                            }}>
                                <Title order={2} className={classes.title3} align='center'>Get in touch</Title>
                                <Text color="white">
                                    Have a question or need help? We're here for you. Contact us and we'll be happy to assist you in any way we can.
                                </Text>
                                <List>
                                    <List.Item icon={<IconMail color='white' stroke={1.5} />}>
                                        <Anchor href='mailto:info@livesoftwaredeveloper.com' color='white'>info@livesoftwaredeveloper.com</Anchor>
                                    </List.Item>
                                    <List.Item icon={<IconPhone color='white' stroke={1.5} />}>
                                        <Anchor href='tel:+254742407266' color='white'>+254 742 407 266</Anchor>
                                    </List.Item>
                                    <List.Item icon={<IconMapPin color='white' stroke={1.5} />} color='white'>
                                        <Text color="white">
                                            Nairobi, Kenya
                                        </Text>
                                    </List.Item>
                                </List>
                                <Image mx="auto" src="/images/contactus.png" radius="lg" alt={`${APP_NAME} Contact Us`} />

                            </Stack>
                        </Card>
                    </Grid.Col>
                </Grid>
            </Container>
            <Container size={containerSize} py={50}>
                <Grid>
                    <Grid.Col md={6} offsetMd={3}>

                    </Grid.Col>
                </Grid>
            </Container>
        </>
    )
}

ContactUs.PageLayout = HeaderAndFooterWrapper

export default ContactUs