import { Box, Button, Grid, LoadingOverlay, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import MyJSONDataForm from '../MyCustomForm/MyJSONDataForm'
import { makeRequestOne } from '../../config/config'
import { useAppContext } from '../../providers/appProvider'
import { URLS } from '../../config/constants'
import { displayErrors } from '../../config/functions'
import { showNotification } from '@mantine/notifications'
import { CallToActionButtonAction } from '../cta/CallToActionButton'
import { IconWriting } from '@tabler/icons'
interface IProfile {
    user: any
}

const Profile = ({ user }: IProfile) => {
    const [loading, setLoading] = useState<boolean>(false)
    const { user_id, token } = useAppContext()

    const form = useForm({
        initialValues: {
            ...user,
            profile: {
                phone_no: user?.profile?.phone_no ?? "",
                bio: user?.profile?.bio ?? [],
            }
        }
    })

    const handleSave = () => {
        setLoading(true)
        let data = {
            ...form.values,
            profile: {
                ...form.values.profile,
                user: user_id
            }
        }
        if(user?.profile){
            data.profile.id = user?.profile?.id
            delete data.profile.user
        }
        // delete data.id

        makeRequestOne({
            url: `${URLS.USERS}/${user_id}/`,
            method: 'PUT',
            data: data,
            extra_headers: {
                authorization: `Bearer ${token}`
            },
            useNext: true,
        }).then((res: any) => {
            showNotification({
                title: "Update Successful",
                message: "You have successfully updated your profile.",
                color: "green"
            })
        }).catch((err) => {
            const errors = err?.response?.data
            displayErrors(form, errors)
            showNotification({
                title: "Error",
                message: err?.message,
                color: "red"
            })
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Box>
            <LoadingOverlay visible={loading} />
            <form onSubmit={form.onSubmit(values => handleSave())}>
                <Stack>
                    <Grid>
                        <Grid.Col md={4}>
                            <TextInput label="First Name" {...form.getInputProps('first_name')} placeholder='First Name' />
                        </Grid.Col>
                        <Grid.Col md={4}>
                            <TextInput label="Last Name" {...form.getInputProps('last_name')} placeholder='Last Name' />
                        </Grid.Col>
                        <Grid.Col md={4}>
                            <TextInput disabled label="Username" {...form.getInputProps('username')} placeholder='Username' />
                        </Grid.Col>
                        <Grid.Col md={4}>
                            <TextInput label="Email" {...form.getInputProps('email')} placeholder='Email' />
                        </Grid.Col>
                        <Grid.Col md={4}>
                            <TextInput label="Phone Number" {...form.getInputProps('profile.phone_no')} placeholder='Phone Number' />
                        </Grid.Col>
                        <Grid.Col md={12}>
                            <MyJSONDataForm form={form} fieldPrefix={'profile.bio'} />
                        </Grid.Col>
                    </Grid>
                    <Box>
                        <CallToActionButtonAction type='submit' label={'Update Profile'} icon={<IconWriting />} />
                    </Box>
                </Stack>
            </form>
        </Box>
    )
}

export default Profile