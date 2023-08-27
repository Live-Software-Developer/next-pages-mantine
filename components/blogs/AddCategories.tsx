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


const AddCategories = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { token } = useAppContext()
    const router = useRouter()

    const form = useForm({
        initialValues: {
            categories: [

            ],

        },
        validate: {
            // categories: {
            //     title: value => value === "" ? "Title is required" : null,
            // }
        }
    })

    const AddNewCategory = () => {
        form.insertListItem('categories', { title: "" })
    }

    const deleteLine = (i: number) => {
        form.removeListItem('categories', i)
    }

    const handleSave = () => {

        setLoading(true)
        makeRequestOne({
            url: `${URLS.BLOG_CATEGORIES}/`,
            data: form.values.categories,
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
                        form.values.categories.map((tag: any, i: number) => (
                            <Grid key={`tag_${i}`}>
                                <Grid.Col md={10}>
                                    <TextInput placeholder='Title' required radius={"md"} {...form.getInputProps(`categories.${i}.title`)}
                                    styles={{
                                        input: {
                                            borderWidth: '2px'
                                        }
                                    }} />
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
                        <Button onClick={AddNewCategory} radius="xl">
                            Add New Category
                        </Button>
                        <Button type='submit' radius="xl" disabled={form.values.categories.length === 0}>Save Categories</Button>
                    </Group>
                </form>
            </Stack>
        </div>
    )
}

export default AddCategories