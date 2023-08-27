import { NextApiRequest, NextApiResponse } from 'next';
import { makeRequestOne } from '../../../app/appFunctions';
import { API_ENDPOINTS } from '../../../app/configs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const params = req.query
        const response = await makeRequestOne(`${API_ENDPOINTS.emails}`, 'GET', {}, {}, { ...params })
        const data = response.data
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
