import React from 'react'
import AdminWrapper from '../../layouts/AdminWrapper'
import requireAdminMiddleware from '../../middleware/requireAdminMiddleware'

const Admin = () => {
  return (
    <div>
      Admin page
    </div>
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

Admin.PageLayout = AdminWrapper
export default Admin