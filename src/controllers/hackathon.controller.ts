import { mainService } from "../services/hackathon.services";

const MainService = new mainService();

export async function getApi(req: Request, res: Response) {
    return MainService.getApi(req, res);
}

export async function postApi(req: Request, res: Response) {
    return MainService.postApi(req, res);
}

export async function statApi(req: Request, res: Response) {
    return MainService.statApi(req, res);
}