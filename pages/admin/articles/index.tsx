import React, { useState } from 'react'
import AdminWrapper from '../../../layouts/AdminWrapper'
import { Box, LoadingOverlay, Pagination, Stack, Title, Grid } from '@mantine/core'
import useSWR from 'swr'
import { makeRequestOne } from '../../../config/config'
import { URLS, DEFAULT_MEDIA_PAGE_SIZE } from '../../../config/constants'
import publicStyles from '../../../styles/publicStyles'
import BlogCardVertical from '../../../components/blogs/BlogCardVertical'
import requireAdminMiddleware from '../../../middleware/requireAdminMiddleware'

const initialFilterState = {
  search: "",
  ordering: "id",
}

const Articles = () => {
  const [filters, setFilter] = useState(initialFilterState)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const { data, error, isValidating, mutate, isLoading } = useSWR({ url: `${URLS.BLOGS}`, method: "GET", extra_headers: {}, data: {}, params: { page: page, search: filters.search, fields: "id, title, categories, tags, image, description, slug" }, useNext: true }, makeRequestOne)
  const articles = data?.data?.results
  const count = data?.data?.count
  const pages = count ? Math.ceil(count / DEFAULT_MEDIA_PAGE_SIZE) : 1

  return (
    <Box style={{
      position: "relative"
    }}>
      <Stack>
        <Title>Articles</Title>
        <LoadingOverlay visible={isValidating || isLoading || loading} />
        <Box pb={30}>
          <Pagination value={page} onChange={setPage} total={pages} />
        </Box>
        <Grid>
        {
            articles?.map((article: any, i: number) => (
              <Grid.Col key={`article_${article?.id}`} md={6} sm={12}>
              <BlogCardVertical {...article} isAdmin={true} />
              </Grid.Col>
            ))
          }
        </Grid>
        <Box pb={30}>
          <Pagination value={page} onChange={setPage} total={pages} />
        </Box>
      </Stack>
    </Box>
  )
}

export const getServerSideProps = async (context: any) => {
  requireAdminMiddleware(context.req, context.res, () => { })

  // const cookies = context.req.cookies
  // const userDetails_: any = cookies[LOCAL_STORAGE_KEYS.user]
  // const token = cookies[LOCAL_STORAGE_KEYS.token]

  return {
    props: {
      
    } 
  }
}

Articles.PageLayout = AdminWrapper
export default Articles