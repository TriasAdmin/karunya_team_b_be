import { mainService } from "../services/hackathon.services";

const MainService = new mainService();

export async function getApi(req: Request, res: Response) {
    return MainService.getApi(req, res);
}
export async function getVitals(req: Request, res: Response) {
    return MainService.getVitals(req, res);
}
export async function getVital(req: Request, res: Response) {
    return MainService.getVital(req, res);
}
export async function postVitals(req: Request, res: Response) {
    return MainService.postVitals(req, res);
}