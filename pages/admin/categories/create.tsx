import React from 'react'
import AdminWrapper from '../../../layouts/AdminWrapper'
import AddCategories from '../../../components/blogs/AddCategories'
import { Stack, Title } from '@mantine/core'

const AddCategoriesPage = () => {
    return (
        <Stack>
            <Title>Add Categories</Title>
            <AddCategories />
        </Stack>
    )
}

AddCategoriesPage.PageLayout = AdminWrapper
export default AddCategoriesPage