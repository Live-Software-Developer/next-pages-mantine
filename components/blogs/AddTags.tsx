import { Button, Grid, TextInput, ActionIcon, Center, Stack, Box, LoadingOverlay, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconTrash } from '@tabler/icons'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { showNotification } from '@mantine/notifications'
import { makeRequestOne } from '../../config/config'
import { URLS } from '../../config/constants'
import { displayErrors } from '../../config/functions'
import { useAppContext } from '../../providers/appProvider'


const AddTags = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { token, user_id } = useAppContext()
    const router = useRouter()

    const form = useForm({
        initialValues: {
            tags: [

            ],

        },
        validate: {
            // tags: {
            //     title: value => value === "" ? "Title is required" : null,
            // }
        }
    })

    const AddNewTag = () => {
        form.insertListItem('tags', { title: "" })
    }

    const deleteLine = (i: number) => {
        form.removeListItem('tags', i)
    }

    const handleSave = () => {

        setLoading(true)
        makeRequestOne({
            url: `${URLS.BLOG_TAGS}`,
            data: form.values.tags,
            method: 'POST',
            extra_headers: {
                authorization: `Bearer ${token}`
            },
            useNext: true
        }).then((res: any) => {
            showNotification({
                title: "Success",
                message: "Categories added successfully",
                color: "green"
            })
            form.reset()
            router.reload()
        }).catch((err: any) => {
            const errors = err.response.data
            displayErrors(form, errors)
            showNotification({
                message: err?.message,
                color: "red"
            })
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div>
            <Stack style={{
                position: "relative"
            }}>
                <LoadingOverlay visible={loading} />
                <form onSubmit={form.onSubmit(values => handleSave())}>
                    {
                        form.values.tags.map((tag: any, i: number) => (
                            <Grid key={`tag_${i}`}>
                                <Grid.Col md={10}>
                                    <TextInput placeholder='Title' radius="md" styles={{
                                        input: {
                                            borderWidth: '2px'
                                        }
                                    }} required {...form.getInputProps(`tags.${i}.title`)} />
                                </Grid.Col>
                                <Grid.Col md={2}>
                                    <Center>
                                        <ActionIcon color='red' onClick={() => deleteLine(i)}>
                                            <IconTrash />
                                        </ActionIcon>
                                    </Center>
                                </Grid.Col>
                            </Grid>
                        ))
                    }
                    <Group position='apart' mt="lg">
                        <Button onClick={AddNewTag} radius="xl">
                            Add New Tag
                        </Button>
                        <Button radius="xl" type='submit' disabled={form.values.tags.length === 0}>Save Tags</Button>
                    </Group>
                </form>
            </Stack>
        </div>
    )
}

export default AddTags