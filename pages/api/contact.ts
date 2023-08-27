import { NextApiRequest, NextApiResponse } from 'next';
import { makeRequestOne } from '../../config/config';
import { URLS } from '../../config/constants';

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
        const response = await makeRequestOne({url: `${URLS.CONTACT}`, method: reqMethod, extra_headers: {...reqheaders}, data: {...data}, params: { ...params }})
        res.status(response?.status).json(response.data);
    } catch (error: any) {
        res.status(error?.response?.status).json(error?.response?.data);
    }
}
