import { Stack, Text, Title } from "@mantine/core"
import { DataTable } from "mantine-datatable"
import { toDate, makeRequestOne } from "../../../config/config"
import { DEFAULT_APP_URL, URLS } from "../../../config/constants"
import AdminWrapper from "../../../layouts/AdminWrapper"
import requireAdminMiddleware from "../../../middleware/requireAdminMiddleware"
import { LOCAL_STORAGE_KEYS } from "../../../providers/appProvider"
import { useRouter } from "next/router"
import { CustomLinkPagination } from "../../../components/common/CustomPagination"
import AddCategories from "../../../components/blogs/AddCategories"



interface ICategories {
  categories: any
  total_pages: any
  active_page: any
}

const Categories = ({ categories, total_pages, active_page }: ICategories) => {

  const router = useRouter()

  const pageURL = `${DEFAULT_APP_URL}/admin/categories`
  const pageURLwithParams = router.asPath

  return (
    <div>
      <Stack mt="md">
        <Title>Categories</Title>
        <AddCategories />
        <Title order={2}>Categories</Title>
        <CustomLinkPagination pages={total_pages} pageURL={pageURLwithParams} active={active_page} />
        <DataTable
          minHeight={150}
          records={categories}
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

  const categoriesQuery = await makeRequestOne({
    url: URLS.BLOG_CATEGORIES,
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
      categories: categoriesQuery.data.results,
      total_pages: categoriesQuery.data?.total_pages,
      active_page: page,
    }
  }
}

Categories.PageLayout = AdminWrapper
export default Categories