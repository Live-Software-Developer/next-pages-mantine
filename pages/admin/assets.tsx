import React from 'react'
import Media from '../../components/media/Media'
import HeaderAndFooterWrapper from '../../layouts/HeaderAndFooterWrapper'
import { Card, Container } from '@mantine/core'
import { containerSize } from '../../config/constants'
import AdminWrapper from '../../layouts/AdminWrapper'
import requireAdminMiddleware from '../../middleware/requireAdminMiddleware'

const Assets = () => {
    return (
        <>
            <Container size={containerSize}>
                <Card radius="lg">
                    <Media padding={"4px"} radius="md"  />
                </Card>
            </Container>
        </>
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

Assets.PageLayout = AdminWrapper

export default Assets