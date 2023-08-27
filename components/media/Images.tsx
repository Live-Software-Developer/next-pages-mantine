import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconAlertCircle, IconAlertTriangle } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { makeRequestOne, makeRequest } from '../../config/config'
import { URLS, EMOJIS } from '../../config/constants'
import { Stack, Grid, Box, Pagination, LoadingOverlay, Tabs, Title, SegmentedControl, Select, Group } from '@mantine/core'
import FileBox from './FileBox'
import UploadMedia from './UploadMedia'

interface IFilesComponent {
    files: any
    handleDelete: any
    handleUpdate: any
}

const FilesComponent = ({ files, handleDelete, handleUpdate }: IFilesComponent) => {

    return (
        <>
            {
                files?.length === 0 ? (
                    <Box>
                        <Title order={3} weight={500} align='start'>No Media Found</Title>
                    </Box>
                ) : null
            }
            <Grid>
                {
                    files?.map((item: any, i: any) => (
                        <Grid.Col key={`image_${i}_${item?.id}`} md={2} style={{ position: "relative" }}>
                            <FileBox item={item} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                        </Grid.Col>
                    ))
                }
            </Grid>
        </>
    )
}

const initialFilterState = {
    search: "",
    ordering: "id",
    type: "all",
    page: 1,
    limit: '10',
}

interface ImagesProps {
    padding?: string,
    radius?: string,
}

const Images = (props: ImagesProps) => {

    const [loading, setLoading] = useState(false)

    const filterForm = useForm({
        initialValues: initialFilterState
    })
    const myFilters = filterForm.values
    const { data, error, isValidating, mutate, isLoading } = useSWR({ url: `${URLS.MEDIA}`, method: "GET", extra_headers: {}, data: {}, params: { ...myFilters, type: myFilters?.type === 'all' ? '' : myFilters.type } }, makeRequestOne)

    const files = data?.data?.results
    const count = data?.data?.count
    const pages = data?.data?.total_pages


    const handleDelete = (id: number) => {
        makeRequest(URLS.MEDIA + "/" + id, 'DELETE', {}, {}).then((res: any) => {
            mutate()
            if (res.success) {
                showNotification({
                    title: `Deleted ${EMOJIS['partypopper']} ${EMOJIS['partypopper']}`,
                    message: "Your image has been deleted successfully",
                    color: 'green',
                    icon: <IconAlertCircle stroke={1.5} />,
                })
            }
            if (res.error) {
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
    }

    const handleUpdate = (id: any, obj: any) => {
        const data = obj
        const method = 'PUT'
        const url = URLS.MEDIA + "/" + id
        const success_msg = `Your media file has been updated successfully ${EMOJIS['partypopper']} ${EMOJIS['partypopper']}`

        makeRequestOne({
            url, method, extra_headers: {
                'Content-Type': 'application/json',
            }, data
        }).then((res: any) => {
            showNotification({
                title: `Congratulations ${EMOJIS['partypopper']} ${EMOJIS['partypopper']}`,
                message: success_msg,
                color: 'green',
                icon: <IconAlertCircle stroke={1.5} />,
            })
            mutate()
        }).catch((error) => {
            const errors = error.response?.data
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

    useEffect(() => {
        filterForm.setFieldValue('page', 1)
    }, [filterForm.values.type, filterForm.values.limit])

    return (
        <>
            <Stack>
                <Box>
                    <Stack>
                        <Title>All Media Assets</Title>
                        <Grid>
                            <Grid.Col md={6}>
                                <UploadMedia mutate={mutate} />
                            </Grid.Col>
                        </Grid>
                        <Grid>
                            <Grid.Col md={1}>
                                <Select size='sm' radius="lg" {...filterForm.getInputProps('limit')}
                                    data={[
                                        { value: '5', label: '5' },
                                        { value: '10', label: '10' },
                                        { value: '20', label: '20' },
                                        { value: '30', label: '30' },
                                        { value: '40', label: '40' },
                                    ]} />
                            </Grid.Col>
                            <Grid.Col md={6}>
                                <SegmentedControl size='sm' radius="lg" {...filterForm.getInputProps('type')}
                                    data={[
                                        {
                                            label: "All",
                                            value: "all",
                                        },
                                        {
                                            label: "Photos",
                                            value: "image",
                                        },
                                        {
                                            label: "PDFs/Documents",
                                            value: "document",
                                        },
                                        {
                                            label: "Videos",
                                            value: "video",
                                        },
                                        {
                                            label: "Audio",
                                            value: "audio",
                                        },
                                        {
                                            label: "UnClassified",
                                            value: "unknown",
                                        },
                                    ]}
                                />
                            </Grid.Col>
                        </Grid>
                        <Box style={{ position: "relative" }}>
                            <LoadingOverlay visible={isLoading} overlayBlur={10} />
                            <Tabs value={filterForm.values.type} mih={200}>
                                {/* <Tabs.List>
                                <Tabs.Tab value="all" icon={<IconFiles stroke={1.5} />}>All</Tabs.Tab>
                                <Tabs.Tab value="image" icon={<IconPhoto stroke={1.5} />}>Photos</Tabs.Tab>
                                <Tabs.Tab value="document" icon={<IconFile stroke={1.5} />}>PDFs/Documents</Tabs.Tab>
                                <Tabs.Tab value="video" icon={<IconFile3d stroke={1.5} />}>Videos</Tabs.Tab>
                                <Tabs.Tab value="audio" icon={<IconFile stroke={1.5} />}>Audio</Tabs.Tab>
                                <Tabs.Tab value="unknown" icon={<IconFile stroke={1.5} />}>UnClassified</Tabs.Tab>
                            </Tabs.List> */}
                                <Tabs.Panel value="all" pt="xs">
                                    <FilesComponent files={files} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                                </Tabs.Panel>
                                <Tabs.Panel value="image" pt="xs">
                                    <FilesComponent files={files} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                                </Tabs.Panel>

                                <Tabs.Panel value="document" pt="xs">
                                    <FilesComponent files={files} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                                </Tabs.Panel>

                                <Tabs.Panel value="video" pt="xs">
                                    <FilesComponent files={files} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                                </Tabs.Panel>
                                <Tabs.Panel value="audio" pt="xs">
                                    <FilesComponent files={files} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                                </Tabs.Panel>
                                <Tabs.Panel value="unknown" pt="xs">
                                    <FilesComponent files={files} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                                </Tabs.Panel>
                            </Tabs>
                        </Box>
                        <Box pt={"lg"}>
                            <Pagination {...filterForm.getInputProps('page')} total={pages} />
                        </Box>
                    </Stack>
                </Box>
            </Stack >
        </>
    )
}

export default Images