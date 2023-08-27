import React from 'react'
import HeaderAndFooterWrapper from '../../../layouts/HeaderAndFooterWrapper'
import { makeRequestOne } from '../../../config/config'
import { URLS } from '../../../config/constants'
import CreateArticle from '../create'
import requireAdminMiddleware from '../../../middleware/requireAdminMiddleware'

const UpdateArticle = (props: any) => {
    const { article, categories, tags } = props
    return (
        <>
            <CreateArticle updating={true} article={article} categories={categories} tags={tags} />
        </>
    )
}

export const getServerSideProps = async (context: any) => {
    requireAdminMiddleware(context.req, context.res, () => { })
    
    const { params } = context

    const articleQuery = await makeRequestOne(
        {
            url: `${URLS.BLOGS}/${params?.articleID}`,
            method: "GET",
            params: {}
        }
    )

    const categoriesQuery = await makeRequestOne(
        {
            url: `${URLS.BLOG_CATEGORIES}`,
            method: "GET",
            params: { limit: 100, fields: 'id,title,slug' }
        }
    )

    const tagsQuery = await makeRequestOne(
        {
            url: `${URLS.BLOG_TAGS}`,
            method: "GET",
            params: { limit: 100, fields: 'id,title,slug' }
        }
    )

    return {
        props: {
            article: articleQuery?.data,
            tags: tagsQuery?.data?.results,
            categories: categoriesQuery?.data?.results
        }
    }
}

UpdateArticle.PageLayout = HeaderAndFooterWrapper
export default UpdateArticle