import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';
import { checkBonusHistory } from '../../../services/memberDB';

export const onPost: RequestHandler = async ( ev :RequestEvent ) => {
    try {
    const formData = new FormData();
    const apiData = await checkBonusHistory(ev, formData);
    ev.json(200, apiData); 
} catch (error) {
    ev.json(500, error); 
}
};