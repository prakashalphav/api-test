import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';
import { updateMemoStatus } from '../../../services/memberDB';

export const onPost: RequestHandler = async ( ev :RequestEvent ) => {
  

    try {
        const formData = await  ev.request.formData()
        console.log('memoStatus', formData);
        const apiData = await updateMemoStatus(ev, formData);
        ev.json(200, apiData); 

    } catch (error) {
        ev.json(500, error); 
    }
};