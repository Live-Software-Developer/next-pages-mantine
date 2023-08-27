import { NextApiRequest, NextApiResponse } from 'next';
import { URLS } from '../../../../../config/constants';
import { makeRequestOne } from '../../../../../config/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const params = req.query
        const data = req.body
        const headers = req.headers
        const reqMethod: any = req.method
        
        let reqheaders:any = {}
        if (headers?.authorization){
            reqheaders['authorization'] = headers?.authorization
        }
        if (headers?.['content-type']){
            reqheaders['content-type'] = headers?.['content-type']
        }
        console.log("reached here")
        const response = await makeRequestOne({url: `${URLS.BLOG_TAGS}/${params.id}`, method: reqMethod, extra_headers: {...reqheaders}, data: {...data}, params: { ...params }})
        res.status(response?.status).json(response.data);
    } catch (error: any) {
        res.status(error?.response?.status).json(error?.response?.data);
    }
}
