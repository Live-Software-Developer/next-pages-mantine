import React from 'react'

import { Accordion, Box, Button, Group, Select, Stack, Text, TextInput, useMantineTheme } from '@mantine/core'
import { IconCode, IconCodePlus, IconFile } from '@tabler/icons'
import { ELEMENTTYPES } from '../../pages/articles/create'
import { showNotification } from '@mantine/notifications'
import CustomMonacoEditor from './CustomMonacoEditor'
import { getTheme } from '../../config/config'

const renderIndividualCodeInputs = (props: any) => {
    const { element, i, updateElement } = props

    const fields = ELEMENTTYPES['code'].fields

    const handleErrors = () => {
        if (element['file'] === undefined || element['file'] === '') {
            showNotification({
                title: 'Error',
                message: 'Please enter a file name',
                color: 'red',
                autoClose: 5000,
                icon: <IconFile stroke={1.5} />
            })
            return true
        }
    }

    return (
        <Stack key={`element_${i}`} spacing="xs">
            {/* <Text style={{ textTransform: "capitalize" }}>
                File - {element['file']}
            </Text> */}
            {fields.map((field: any, j: any) => {
                return (
                    <Box key={`element_${i}_${j}`}>

                        {field.type === "title" && (
                            <TextInput
                                label={field['name'] === 'file' ? 'File Name (Required)' : field['label']}
                                value={element[field.name] ?? ""}
                                onChange={(e) => {
                                    const value = e.target.value
                                    updateElement(i, field.name, value)
                                }}
                                radius="md"
                                onBlur={handleErrors}
                            />
                        )}

                        {field.type === "select" && (
                            <Select
                                label={field['label']}
                                value={element[field.name] ?? ""}
                                onChange={(e) => {
                                    const value = e
                                    updateElement(i, field.name, value)
                                }}
                                data={field.options.map((option: any) => {
                                    return {
                                        label: option,
                                        value: option + "",
                                    }
                                })}
                                radius="md"
                            />
                        )}

                        {field.type === "code" && (
                            <>
                                <Text mb="xs">{field['label']}</Text>
                                <CustomMonacoEditor
                                    value={element[field.name] ?? ""}
                                    language={element['language'] ?? "plaintext"}
                                    onChange={(value: any) => {
                                        updateElement(i, field.name, value)
                                    }} />
                            </>
                        )}

                    </Box>
                )
            }
            )}
        </Stack>
    )
}

const CodesEditor = (props: any) => {
    const { codes_index, codes, onChange, handleAdd, handleDeleteCodes } = props

    const theme = useMantineTheme()

    const handleAddCode = () => {
        handleAdd()
    }

    return (
        <>
            <Stack>
                <Group position='left' mb="md">
                    <Button onClick={handleAddCode} radius="md" leftIcon={<IconCodePlus stroke={1.5} />}> Add Code </Button>
                </Group>
                <Accordion radius="lg" defaultValue={`codes_${codes_index}_code_0`} sx={{
                    background: getTheme(theme) ? theme.colors.dark[8] : theme.colors.gray[0],
                }}>
                    {
                        codes.map((code: any, i: any) => {
                            return (
                                <Accordion.Item key={`codes_${codes_index}_code_${i}`} value={`codes_${codes_index}_code_${i}`}>
                                    <Accordion.Control icon={<IconCode stroke={1.5} />}>
                                        #{i + 1} Snippet - {code['file'] ?? 'Untitled'}
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        <Group position='right' mb="md">
                                            <Button ml="auto" variant='light' color='red' radius="md" onClick={() => handleDeleteCodes(codes_index, i)}>Delete</Button>
                                        </Group>
                                        {
                                            renderIndividualCodeInputs({ element: code, i, updateElement: onChange })
                                        }
                                    </Accordion.Panel>
                                </Accordion.Item>
                            )
                        })
                    }
                </Accordion>
            </Stack>
        </>
    )
}

export default CodesEditor
