import { ActionIcon, Box, Button, Code, Grid, Image, Select, TextInput, Textarea, useMantineTheme } from '@mantine/core'
import { IconCodePlus, IconTrash } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { Prism } from '@mantine/prism'
import ReactPlayer from 'react-player/lazy'

import { getTheme } from '../../config/config'
import { LANGUAGES, FIELD_OPTIONS } from './formDetails'
import { MDXRemote } from 'next-mdx-remote'
import { MarkdownField } from '@refinedev/mantine'
import publicStyles from '../../styles/publicStyles'

function getFieldByPrefix(obj: any, prefix: any) {
    const fields = prefix.split('.');
    let value = obj;

    for (const field of fields) {
        if (value && field in value) {
            value = value[field];
        } else {
            value = undefined;
            break;
        }
    }

    return value;
}


export const MarkDownTextWriter = (props: any) => {
    const { index, removeField, form, fieldPrefix } = props
    return (
        <>
            <Textarea autosize minRows={5} mb="md" label={`Markdown #${index + 1}`} {...form.getInputProps(`${fieldPrefix}.${index}.value`)} />
            <Button size='sm' color='red' radius="md" onClick={() => removeField(index)} leftIcon={<IconTrash />}>Delete</Button>
        </>
    )
}

export const CodeWriter = (props: any) => {
    const { index, removeField, form, fieldPrefix } = props
    const i = index
    return (
        <>
            <Grid>
                <Grid.Col md={6}>
                    <Select label="Language" nothingFound="Language not found" searchable data={LANGUAGES.sort().map((lang: string) => ({ value: lang, label: lang }))}
                        {...form.getInputProps(`${fieldPrefix}.${i}.language`)} />
                </Grid.Col>
                <Grid.Col md={6}>
                    <TextInput minRows={5} label={`Filename`} {...form.getInputProps(`${fieldPrefix}.${i}.filename`)} />
                </Grid.Col>
            </Grid>
            <Textarea autosize minRows={5} mb="md" label={`Code #${i + 1}`} {...form.getInputProps(`${fieldPrefix}.${i}.value`)} />
            <Button size='sm' color='red' radius="md" onClick={() => removeField(i)} leftIcon={<IconTrash />}>Delete</Button>
        </>
    )
}


export const VideoWriter = (props: any) => {
    const { index, removeField, form, fieldPrefix } = props
    const i = index
    return (
        <>
            <TextInput mb="md" label={`Video #${i + 1}`} {...form.getInputProps(`${fieldPrefix}.${i}.value`)} />
            <Button size='sm' color='red' radius="md" onClick={() => removeField(i)} leftIcon={<IconTrash />}>Delete</Button>
        </>
    )
}

export const ImageWriter = (props: any) => {
    const { index, removeField, form, fieldPrefix } = props
    const i = index

    return (
        <>
            <TextInput mb="md" label={`Image Alt`} {...form.getInputProps(`${fieldPrefix}.${i}.alt`)} />
            <TextInput mb="md" label={`Image #${i + 1}`} {...form.getInputProps(`${fieldPrefix}.${i}.value`)} />
            <Button size='sm' color='red' radius="md" onClick={() => removeField(i)} leftIcon={<IconTrash />}>Delete</Button>
        </>
    )
}


export const CodesWriter = (props: any) => {
    const { index, removeField, form, fieldPrefix } = props

    const i = index
    const theme = useMantineTheme()

    const addCode = () => {

        const newCode = FIELD_OPTIONS.code.fields

        form.insertListItem(`${fieldPrefix}.${index}.value`, newCode)

    }

    const removeCode = (j: number) => {
        form.removeListItem(`${fieldPrefix}.${index}.value`, j)
    }

    return (
        <>
            <Button leftIcon={<IconCodePlus />} radius="md" onClick={addCode}>Add Code</Button>
            {
                getFieldByPrefix(form.values, fieldPrefix)[index].value.map((code: any, j: any) => (
                    <Box key={`codes_${i}_${j}`} my="md" p="md" sx={{
                        background: getTheme(theme) ? theme.fn.darken(theme.colors.blue[4], 0.9) : theme.colors.gray[1],
                        borderRadius: theme.radius.md,
                        position: "relative",
                        ".delete-code": {
                            position: "absolute",
                            right: "20px",
                            top: "10px",
                        }
                    }}>
                        <ActionIcon onClick={() => removeCode(j)} className='delete-code' color='red' variant='light' size="lg">
                            <IconTrash />
                        </ActionIcon>
                        <Grid>
                            <Grid.Col md={6}>
                                <Select label="Language" nothingFound="Language not found" s
                                    earchable data={LANGUAGES.sort().map((lang: string) => ({ value: lang, label: lang }))}
                                    {...form.getInputProps(`${fieldPrefix}.${i}.value.${j}.language`)} />
                            </Grid.Col>
                            <Grid.Col md={6}>
                                <TextInput minRows={5} label={`Filename`}
                                    {...form.getInputProps(`${fieldPrefix}.${i}.value.${j}.filename`)} />
                            </Grid.Col>
                        </Grid>
                        <Textarea autosize minRows={5} label={`Code #${j + 1}`}
                            {...form.getInputProps(`${fieldPrefix}.${i}.value.${j}.value`)} />
                    </Box>
                ))
            }
            <Button size='sm' color='red' radius="md" onClick={() => removeField(i)} leftIcon={<IconTrash />}>Delete</Button>
        </>
    )
}

function isEmptyOrNull(string: string | null | undefined): boolean {
    return string == null || string.trim() === '';
}


export const RenderPrismTabs = (props: any) => {
    const { prismTabs, index } = props

    return (
        <>
            {
                prismTabs?.length > 0 ? (
                    <Prism.Tabs defaultValue={isEmptyOrNull(prismTabs[0]?.filename) ? "no-file" : prismTabs[0]?.filename?.trim()}>
                        <Prism.TabsList>
                            {
                                prismTabs.map((tab: any, i: number) => (
                                    <Prism.Tab key={`${index}_tab_${i}`}
                                        value={isEmptyOrNull(tab?.filename) ? "no-file" : tab?.filename?.trim()}>
                                        {tab?.filename}
                                    </Prism.Tab>
                                ))
                            }
                        </Prism.TabsList>
                        {
                            prismTabs.map((tab: any, i: number) => (
                                <Prism.Panel key={`${index}_panel_${i}`}
                                    language={isEmptyOrNull(tab?.language) ? 'javascript' : tab?.language}
                                    value={isEmptyOrNull(tab?.filename) ? "no-file" : tab?.filename?.trim()}>
                                    {tab?.value ?? "{}"}
                                </Prism.Panel>
                            )
                            )
                        }
                    </Prism.Tabs>
                ) : null
            }
        </>
    )
}

interface ICustomRenderer {
    data: any
    hasPadding?: boolean
    isPreviewingViewing: boolean
}

export const CustomRenderer = ({ data, isPreviewingViewing }: ICustomRenderer) => {
    const [loaded, setLoaded] = useState(false)
    const { theme, classes } = publicStyles()

    useEffect(() => {
        setLoaded(true)
    }, [])

    return (
        data?.map((field: any, i: number) => {
            return (
                <Box key={`render_${i}`} sx={{
                    "p": {
                        margin: "0 !important",
                    },
                    "img": {
                        maxWidth: "100%",
                    },
                    "code:not([class])": {
                        background: getTheme(theme) ? theme.colors.dark[4] : theme.colors.gray[1],
                        padding: "2px 4px",
                    },
                    "code": {
                        borderRadius: theme.radius.xs,
                        fontSize: "14px"
                    },
                    "pre code": {
                        borderRadius: theme.radius.md,
                    }
                }}>
                    {field.type === 'text' ? (
                        <>
                            {
                                isPreviewingViewing ? <MarkdownField value={field?.value} /> :
                                    <MDXRemote {...field?.value} />
                            }

                        </>
                    ) : null
                    }

                    {field.type === 'code' ? (
                        <>
                            <Code>{isEmptyOrNull(field?.filename) ? "No file" : field?.filename}</Code>
                            <Prism language={field?.language}>
                                {field?.value}
                            </Prism>
                        </>
                    ) : null
                    }
                    {field.type === 'video' ? (
                        <Box my="sm">
                            {
                                loaded ? (
                                    <ReactPlayer height={500} url={field?.value} controls={true} width={"100%"} />
                                ) : null
                            }
                        </Box>
                    ) : null
                    }

                    {field.type === 'codes' ? (
                        <Box my="sm">
                            <RenderPrismTabs prismTabs={field.value} index={i} />
                        </Box>
                    ) : null
                    }
                    {field.type === 'image' ? (
                        <Image imageProps={{ loading: 'lazy' }} my="sm" src={field.value} radius="md" alt={`Topic image`} />
                    ) : null
                    }
                </Box>
            )
        })
    )
}