import { Box, Button, Center, CopyButton, Drawer, Group, Image, Stack, TextInput, useMantineTheme } from '@mantine/core'
import React, { useState } from 'react'
import { getTheme } from '../../config/config'
import { useForm } from '@mantine/form'
import { CallToActionButtonAction } from '../cta/CallToActionButton'
import { IconCheck, IconCopy, IconTrash, IconWriting } from '@tabler/icons'

interface FileBoxProps {
    item: any,
    padding?: string,
    radius?: string,
    handleDelete: any,
    handleUpdate: any,
}

const FileBox = (props: FileBoxProps) => {
    const { item, padding, radius, handleDelete, handleUpdate } = props
    const theme = useMantineTheme()
    const [opened, setOpened] = useState(false)
    const form = useForm({
        initialValues: {
            title: item?.title,
            description: item?.description,
        },
        validate: {
            title: value => value.length > 5 ? null : "Title must be at least 5 characters long",
        }

    })

    function renderItem() {
        return (
            <>
                {
                    item?.type === 'image' ? (
                        <Image imageProps={{ loading: 'lazy' }} radius={radius ? radius : "sm"} src={item?.file} withPlaceholder style={{
                            // maxHeight: "100%",
                            // width: "100%",
                        }} />
                    ) : null
                }
                {
                    item?.type === 'document' ? (
                        <>Doc</>
                    ) : null
                }
                {
                    item?.type === 'video' ? (
                        <>Vid</>
                    ) : null
                }
                {
                    item?.type === 'audio' ? (
                        <>Audio</>
                    ) : null
                }
                {
                    item?.type === 'unknown' ? (
                        <>Other</>
                    ) : null
                }
            </>
        )
    }

    return (
        <>
            <Box p={padding ? padding : "xs"} style={{
                height: "100px",
                overflow: "hidden",
                background: getTheme(theme) ? theme.colors.dark[4] : theme.colors.gray[1],
                borderRadius: theme.radius[radius ? radius : "md"],
                cursor: "pointer",
            }} onClick={() => setOpened(current => !current)} >
                <Center className=" w-100">
                    {renderItem()}
                </Center>
            </Box>
            <Drawer title={item?.title} zIndex={202} opened={opened} onClose={() => setOpened(current => !current)} >

                <Stack>
                    {renderItem()}
                    <form onSubmit={form.onSubmit((values) => handleUpdate(item?.id, values))}>
                        <Stack>
                            <TextInput label="File Title/Alt" radius="sm" {...form.getInputProps('title')} />
                            <Group position='right'>
                                <CallToActionButtonAction label={'Update'} icon={<IconWriting color='white' stroke={1.5} />} type="submit" />
                            </Group>
                        </Stack>
                    </form>
                    <Group position="center">
                        <CopyButton value={item?.file}>
                            {({ copied, copy }) => (
                                <Button radius={"md"} color={copied ? "green" : "blue"} onClick={copy} leftIcon={copied ? <IconCheck /> : <IconCopy />}>
                                    {copied ? 'Copied' : 'Copy File URL'}
                                </Button>
                            )}
                        </CopyButton>
                        <CopyButton value={item?.title}>
                            {({ copied, copy }) => (
                                <Button radius={"md"} color={copied ? "green" : "blue"} onClick={copy} leftIcon={copied ? <IconCheck /> : <IconCopy />}>
                                    {copied ? 'Copied' : 'Copy File Title'}
                                </Button>
                            )}
                        </CopyButton>
                        <Button radius={"md"} color={"red"} onClick={() => handleDelete(item?.id)} leftIcon={<IconTrash />}>
                            Delete
                        </Button>
                    </Group>
                </Stack>
            </Drawer>
        </>
    )
}

export default FileBox