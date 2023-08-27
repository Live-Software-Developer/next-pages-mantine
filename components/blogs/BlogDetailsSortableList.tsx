import React from 'react'
import { SortableContainer, SortableContainerProps, SortableElement, SortableElementProps } from 'react-sortable-hoc';
import { BlogELementProps } from './BlogRender';
import { ActionIcon, Avatar, Card, Group, List, Stack, Text, Title, TitleOrder } from '@mantine/core';
import { limitChars } from '../../config/config';
import { IconArrowsSort, IconCode, IconHeading, IconLetterT, IconPlayerPlay } from '@tabler/icons';
import { getTitleOrder } from '../../config/functions';

interface SortableItemProps extends SortableElementProps {
    item: BlogELementProps
    index: number
}

const SortableItem = SortableElement<SortableItemProps>((props: SortableItemProps) => {
    const { item: { type, text, title, image, code, codes }, index } = props

    return (
        <Group style={{
            cursor: "pointer"
        }}>
            <ActionIcon size={42} color="blue" variant="light">
                <IconArrowsSort size={16}/>
            </ActionIcon>
            <Card style={{ flex: 1 }}>
                {type === 'text' && (
                    <Group>
                        <IconLetterT />
                        <Text>{limitChars(text?.value, 50)}</Text>
                    </Group>
                )}
                {type === 'title' && (
                    <Group>
                        <IconHeading />
                        <Title order={getTitleOrder(title?.titleOrder)}>{title?.value}</Title>
                    </Group>
                )}
                {type === 'image' && (
                    <Group>
                        <Avatar size={60} src={image?.src} alt={image?.alt} />
                        <Text>{limitChars(image?.alt, 40)}</Text>
                    </Group>
                )}
                {type === 'video' && (
                    <Group>
                        <IconPlayerPlay />
                        <Text>Video Url</Text>
                    </Group>
                )}
                {type === 'code' && (
                    <Group>
                        <IconCode />
                        <Text>{code?.file === '' ? "Code" : code?.file}</Text>
                    </Group>
                )}
                {type === 'codes' && (
                    <Group>
                        <IconCode />
                        <Text>Some code snippets - {codes?.length} Snippets</Text>
                    </Group>
                )}
            </Card>
        </Group>
    );
})

interface BlogDetailsSortableListProps extends SortableContainerProps {
    items: BlogELementProps[]
}

const BlogDetailsSortableList = (props: BlogDetailsSortableListProps) => {
    const { items } = props
    return (
        <Stack spacing={10}>
            {items?.map((value: BlogELementProps, index: number) => (
                <SortableItem key={`item-${index}`} index={index} item={value} />
            ))}
        </Stack>
    );
}

export default SortableContainer<BlogDetailsSortableListProps>(BlogDetailsSortableList);