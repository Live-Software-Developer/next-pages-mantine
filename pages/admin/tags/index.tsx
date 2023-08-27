import { Stack, Text, Title } from "@mantine/core"
import { DataTable } from "mantine-datatable"
import { toDate, makeRequestOne } from "../../../config/config"
import { DEFAULT_APP_URL, URLS } from "../../../config/constants"
import AdminWrapper from "../../../layouts/AdminWrapper"
import requireAdminMiddleware from "../../../middleware/requireAdminMiddleware"
import { LOCAL_STORAGE_KEYS } from "../../../providers/appProvider"
import AddTags from "../../../components/blogs/AddTags"
import { useRouter } from "next/router"
import { CustomLinkPagination } from "../../../components/common/CustomPagination"



interface ITags {
  tags: any
  total_pages: any
  active_page: any
}

const Tags = ({ tags, total_pages, active_page }: ITags) => {

  const router = useRouter()

  const pageURL = `${DEFAULT_APP_URL}/admin/tags`
  const pageURLwithParams = router.asPath

  return (
    <div>
      <Stack mt="md">
        <Title>Tags</Title>
        <AddTags />
        <Title order={2}>Tags</Title>
        <CustomLinkPagination pages={total_pages} pageURL={pageURLwithParams} active={active_page} />
        <DataTable
          minHeight={150}
          records={tags}
          verticalSpacing="sm"
          columns={[
            {
              accessor: "id",
              title: "#",
              render: (tag: any, i: number) => (
                <Text>{i + 1}</Text>
              )
            },
            {
              accessor: "title",
              title: "Title"
            },
            {
              accessor: "created_on",
              title: "Created On",
              render: (budget_line: any, i: number) => (
                <Text>{toDate(budget_line?.created_on, true)}</Text>
              )
            },
          ]}
        />
        <CustomLinkPagination pages={total_pages} pageURL={pageURLwithParams} active={active_page} />
      </Stack>
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  requireAdminMiddleware(context.req, context.res, () => { })

  const cookies = context.req.cookies
  // const userDetails_: any = cookies[LOCAL_STORAGE_KEYS.token]
  const token = cookies[LOCAL_STORAGE_KEYS.token]

  const { params, query } = context
  const page = query?.page ?? 1

  for (let key in query) {
    if (query.hasOwnProperty(key)) {
      if (query[key] === null || query[key] === 'null' || query[key] === '') {
        delete query[key];
      }
    }
  }

  const tagsQuery = await makeRequestOne({
    url: URLS.BLOG_TAGS,
    method: "GET",
    params: {
      ...query,
      limit: 20,
      fields: 'id,title,created_on'
    },
    extra_headers: {
      authorization: `Bearer ${token}`
    }
  })

  return {
    props: {
      tags: tagsQuery.data.results,
      total_pages: tagsQuery.data?.total_pages,
      active_page: page,
    }
  }
}

Tags.PageLayout = AdminWrapper
export default Tags