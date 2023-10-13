import { db_multi_instance, sequelizeConnect } from "../../config/connection.config";


export class mainService {
    constructor() {}
  
    async getApi(req: any, res: any){
        try {
            if (!db_multi_instance) {
                await sequelizeConnect();
              }
           
              await db_multi_instance.query(
          `select * from test_table`
        )
        .then(async (onfulfilled: any) => {
            
             res.status(200).json(onfulfilled[0]);
        })
        }
        catch (error){
            res.status(500).json({
                message: error.toString(),
              });
        }

    }
  }