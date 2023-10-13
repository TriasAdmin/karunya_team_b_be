import { mainService } from "../services/hackathon.services";

const MainService = new mainService();

export async function getApi(req: Request, res: Response) {
    return MainService.getApi(req, res);
}