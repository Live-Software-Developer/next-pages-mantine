import { showNotification } from '@mantine/notifications'
import { IconAlertCircle, IconAlertTriangle, IconFile3d, IconPlus } from '@tabler/icons'
import React, { useState } from 'react'
import { makeRequestOne } from '../../config/config'
import { URLS, EMOJIS } from '../../config/constants'
import { displayErrors } from '../../config/functions'
import { Grid, FileInput, Group, Loader } from '@mantine/core'
import { CallToActionButtonAction } from '../cta/CallToActionButton'
import { useForm } from '@mantine/form'

interface IUploadMedia {
    mutate: any
}

const UploadMedia = (props: IUploadMedia) => {
    const { mutate } = props

    const [loading, setLoading] = useState(false)

    const form = useForm({
        initialValues: {
            media: [],
        },
        validate: {
            media: value => value.length === 0 ? 'Please select at least one file' : null,
        }
    })

    const handleUpload = (updating: boolean, id?: number, obj?: Object) => {
        setLoading(true)

        let data: any = form.values.media
        let method = 'POST'
        let url = URLS.MEDIA
        let success_msg = "Your media files have been uploaded successfully"

        makeRequestOne({
            url, method, extra_headers: {
                'Content-Type': updating ? 'application/json' : 'multipart/form-data',
            }, data
        }).then((res: any) => {
            showNotification({
                title: `Congratulations ${EMOJIS['partypopper']} ${EMOJIS['partypopper']}`,
                message: success_msg,
                color: 'green',
                icon: <IconAlertCircle stroke={1.5} />,
            })
            mutate()
            form.reset()
        }).catch((error) => {
            const errors = error.response?.data
            if (typeof errors === 'object' && errors !== null && errors !== undefined) {
                displayErrors(form, errors)
            }
            showNotification({
                title: 'Error',
                message: error?.message,
                color: 'red',
                icon: <IconAlertTriangle stroke={1.5} />,
            })
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div>
            <form onSubmit={form.onSubmit((values) => handleUpload(false))}>
                <Grid>
                    <Grid.Col md={8}>
                        <FileInput label="Select Files"
                            radius={"lg"}
                            multiple clearable
                            {...form.getInputProps('media')}
                            icon={loading ? <Loader /> : <IconFile3d />}
                        />
                    </Grid.Col>
                    <Grid.Col md={4}>
                        <Group className='h-100' align='end'>
                            <CallToActionButtonAction type="submit" icon={<IconPlus color='white' stroke={1.5} />} label={'Upload photos'} />
                        </Group>
                    </Grid.Col>
                </Grid>
            </form>
        </div>
    )
}

export default UploadMedia