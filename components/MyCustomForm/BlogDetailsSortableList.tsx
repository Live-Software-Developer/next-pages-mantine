import React from 'react'
import { SortableContainer, SortableContainerProps, SortableElement, SortableElementProps } from 'react-sortable-hoc';
import { ActionIcon, Avatar, Card, Group, Stack, Text } from '@mantine/core';
import { IconArrowsSort, IconCode, IconCodePlus, IconLetterT, IconPlayerPlay } from '@tabler/icons';
import { limitChars } from '../../config/config';


interface SortableItemProps extends SortableElementProps {
    item: any
    index: number
}

const SortableItem = SortableElement<SortableItemProps>((props: SortableItemProps) => {
    const { item, index } = props

    return (
        <Group style={{
            cursor: "pointer"
        }}>
            <ActionIcon size={42} color="blue" variant="light">
                <IconArrowsSort size={16} />
            </ActionIcon>
            <Card style={{ flex: 1 }}>
                {item?.type === 'text' && (
                    <Group>
                        <IconLetterT />
                        <Text>Text - {limitChars(item?.value, 20)}</Text>
                    </Group>
                )}
                {item?.type === 'image' && (
                    <Group>
                        <Avatar size={40} src={item?.value} alt={item?.value} />
                        <Text>Image</Text>
                    </Group>
                )}
                {item?.type === 'video' && (
                    <Group>
                        <IconPlayerPlay />
                        <Text>Video Url</Text>
                    </Group>
                )}
                {item?.type === 'code' && (
                    <Group>
                        <IconCode />
                        <Text>{item?.filename === '' ? "Code" : item?.filename}</Text>
                    </Group>
                )}
                {item?.type === 'codes' && (
                    <Group>
                        <IconCodePlus />
                        <Text>Some code snippets - {item?.value?.length} Snippets</Text>
                    </Group>
                )}
            </Card>
        </Group>
    );
})

interface BlogDetailsSortableListProps extends SortableContainerProps {
    items: any[]
}

const BlogDetailsSortableList = (props: BlogDetailsSortableListProps) => {
    const { items } = props
    return (
        <Stack spacing={10}>
            {items?.map((value: any, index: number) => (
                <SortableItem key={`item-${index}`} index={index} item={value} />
            ))}
        </Stack>
    );
}

export default SortableContainer<BlogDetailsSortableListProps>(BlogDetailsSortableList);