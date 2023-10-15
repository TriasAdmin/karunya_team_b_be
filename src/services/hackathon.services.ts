import { db_multi_instance, sequelizeConnect } from "../../config/connection.config";
import { Sequelize } from 'sequelize';


export class mainService {
    constructor() {}
  
    async getApi(req: any, res: any){
        try {
            if (!db_multi_instance) {
                await sequelizeConnect();
              }
           
              await db_multi_instance.query(
          `select * from pillbox`
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
    async postApi(req: any, res: any){
      try {
          if (!db_multi_instance) {
              await sequelizeConnect();
          }
          
          // Prepare your data
          const data = [
              req.body.name,
              req.body.form,
              req.body.strength,
              req.body.dosage,
              req.body.qualifier,
              req.body.startDate,
              req.body.duration,
              req.body.morning,
              req.body.afternoon,
              req.body.evening,
              req.body.night,
              req.body.currentStock,
              req.body.reminderWhen
          ];
  
          await db_multi_instance.query(
              "INSERT INTO pillbox (`name`, `form`, `strength`, `dosage`, `qualifier`, `startDate`, `duration`, `morning`, `afternoon`, `evening`, `night`, `currentStock`, `reminderWhen`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              { replacements: data}
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