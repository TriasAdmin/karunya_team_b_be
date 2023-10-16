import { db_multi_instance, sequelizeConnect } from "../../config/connection.config";
import { QueryTypes } from 'sequelize';

export class mainService {
    constructor() {}
  
    async getApi(req: any, res: any){
        try {
          if (!db_multi_instance) {
              await sequelizeConnect();
            }
            //console.log(req)
           
              await db_multi_instance.query(
          `select * from healthsolution.vitalsdir where pid = 2 order by TimeMeasured DESC Limit 9`
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
            
          const reqData = req.body; // JSON data is sent in the request body

          if (!reqData) {
            res.status(400).json({
              message: "Invalid JSON data in the request body",
            });
          return;
          }
          else{
            console.log('red',reqData)
            //console.log("datareached")
          }

          var patid: any
          var a = reqData
          // Insert the JSON data iteratively into the vitalsdir table
          for (let key in a) {
            const value = a[key];
            console.log(`Key: ${key}, Value: ${value}`);
          
          //for (let item of reqData) {

          //  console.log(item)

          //   if (name == 'pid') {
          //     patid = value;
          //     console.log('pid' + patid);
          //   }
          //   if (value !== undefined) {
          //     console.log(name, ":", value);

          //     const vitalQuery = await db_multi_instance.query(
          //       `SELECT id FROM vital_master WHERE name = ?`,
          //       { replacements: [name], type: QueryTypes.SELECT }
          //     );

          //     if (vitalQuery){
          //       const vitalId = vitalQuery[0];

          
            //key = (key=="DT") ? '':key;
            
            if (key!=='10'){
              // Insert the data into the vitalsdir table
              await db_multi_instance.query(
                `INSERT INTO healthsolution.vitalsdir (pid, vid, value) VALUES (?, ?, ?)`,
                { replacements: [2, key, value], type: QueryTypes.INSERT }
              )
            }
            else{
              console.log(`Key: ${key}, Value: ${value}`);
            }   
          }

          //   else {
          //     // Handle the case where the vital name is not found in the mapping
          //     console.log(`Vital name '${name}' not found in the mapping.`);
          //   }
          // }
        // }
        
          res.status(200).json({
            message: "Data inserted successfully",
          });
          
        }
        catch (error){
            res.status(500).json({
                message: "error!!!!!!!!",
              });
        }

    }

    async statApi(req: any, res: any){
      try {
        if (!db_multi_instance) {
            await sequelizeConnect();
          }
          var vid =req.query['vital']
          console.log(vid)
         
            await db_multi_instance.query(
        `select * from healthsolution.vitalsdir where pid = ? and VID = ? order by TimeMeasured DESC `,
        { replacements: [2,vid], type: QueryTypes.SELECT }
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