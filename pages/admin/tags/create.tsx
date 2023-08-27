import React from 'react'
import AdminWrapper from '../../../layouts/AdminWrapper'
import AddTags from '../../../components/blogs/AddTags'
import { Stack, Title } from '@mantine/core'

const AddTagsPage = () => {
    return (
        <Stack>
            <Title>Add Tags</Title>
            <AddTags />
        </Stack>
    )
}

AddTagsPage.PageLayout = AdminWrapper
export default AddTagsPage