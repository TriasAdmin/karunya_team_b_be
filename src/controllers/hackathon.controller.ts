import { mainService } from "../services/hackathon.services";

const MainService = new mainService();

export async function getApi(req: Request, res: Response) {
    // console.log('frontend made a call');
    return MainService.getApi(req, res);
}
export async function postApi(req: Request, res: Response) {
    console.log('frontend made a call');
    return MainService.postApi(req, res);
}
export async function updateApi(req: Request, res: Response) {
    console.log('frontend made a update call');
    return MainService.updateApi(req, res);
}