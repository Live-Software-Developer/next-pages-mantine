import { Box, Accordion, Button, useMantineTheme, Text, Group, Tabs, Stack } from '@mantine/core'
import { IconEye, IconPencil, IconSortAZ } from '@tabler/icons'
import React from 'react'
import { SortEnd } from 'react-sortable-hoc'
import { arrayMoveImmutable } from 'array-move'

import { getTheme } from '../../config/config'
import { FIELD_OPTIONS, OPTIONS } from './formDetails'
import { MarkDownTextWriter, CodeWriter, VideoWriter, CodesWriter, ImageWriter, CustomRenderer } from './CustomWriterFields'
import BlogDetailsSortableList from './BlogDetailsSortableList'


export function getFieldByPrefix(obj: any, prefix: any) {
    const fields = prefix?.split('.');
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

interface IMyJSONDataForm {
    form: any
    fieldPrefix: any
}

const MyJSONDataForm = ({ form, fieldPrefix }: IMyJSONDataForm) => {

    const theme = useMantineTheme()

    const addField = (fieldType: string) => {
        const field: any = FIELD_OPTIONS[fieldType].fields
        form.insertListItem(fieldPrefix, field)
    }

    const removeField = (index: number) => {
        form.removeListItem(fieldPrefix, index)
    }


    const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
        const data = structuredClone(getFieldByPrefix(form.values, fieldPrefix))
        const newData = arrayMoveImmutable(data, oldIndex, newIndex);
        form.setFieldValue(fieldPrefix, newData)
    };

    return (
        <Box>
            <Tabs defaultValue="details">
                <Tabs.List>
                    <Tabs.Tab value="details" icon={<IconPencil size="1.4rem" />}>Details</Tabs.Tab>
                    <Tabs.Tab value="order" icon={<IconSortAZ size="1.4rem" />}>Order</Tabs.Tab>
                    <Tabs.Tab value="preview" icon={<IconEye size="1.4rem" />}>Preview</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="details" pt="xs">
                    <Stack>
                        <Group>
                            {
                                OPTIONS.map((option: string, i: number) => (
                                    <Button key={`option_${i}`} onClick={() => addField(option)} style={{ textTransform: "capitalize" }}>{option}</Button>
                                ))
                            }
                        </Group>
                        <Accordion radius="lg" defaultValue={`detail_0`} sx={{
                            background: getTheme(theme) ? theme.colors.dark[5] : theme.colors.gray[0],
                        }}>
                            {
                                getFieldByPrefix(form?.values, fieldPrefix)?.map((field: any, i: number) => {
                                    const Icon = FIELD_OPTIONS[field.type].icon
                                    return (
                                        <Accordion.Item value={`field_${i + 1}`} key={`field_${i + 1}`}>
                                            <Accordion.Control icon={<Icon />}>
                                                <Text>#{i + 1} {field?.type}</Text>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Box>
                                                    {field.type === 'text' ? (
                                                        <MarkDownTextWriter index={i} form={form} fieldPrefix={fieldPrefix} removeField={removeField} />
                                                    ) : null
                                                    }

                                                    {field.type === 'code' ? (
                                                        <CodeWriter index={i} form={form} fieldPrefix={fieldPrefix} removeField={removeField} />
                                                    ) : null
                                                    }
                                                    {field.type === 'video' ? (
                                                        <VideoWriter index={i} form={form} fieldPrefix={fieldPrefix} removeField={removeField} />
                                                    ) : null
                                                    }

                                                    {field.type === 'codes' ? (
                                                        <CodesWriter index={i} form={form} fieldPrefix={fieldPrefix} removeField={removeField} />
                                                    ) : null
                                                    }
                                                    {field.type === 'image' ? (
                                                        <ImageWriter index={i} form={form} fieldPrefix={fieldPrefix} removeField={removeField} />
                                                    ) : null
                                                    }
                                                </Box>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                    )
                                })
                            }
                        </Accordion>
                    </Stack>
                </Tabs.Panel>
                <Tabs.Panel value="order" pt="xs">
                    <BlogDetailsSortableList items={getFieldByPrefix(form.values, fieldPrefix)} onSortEnd={onSortEnd} />
                </Tabs.Panel>
                <Tabs.Panel value='preview' py={20}>
                    <CustomRenderer data={getFieldByPrefix(form.values, fieldPrefix)} isPreviewingViewing={true} />
                </Tabs.Panel>

            </Tabs>
        </Box>
    )
}

export default MyJSONDataForm