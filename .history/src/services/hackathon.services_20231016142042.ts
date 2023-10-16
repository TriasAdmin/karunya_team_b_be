import { db_multi_instance, sequelizeConnect } from "../../config/connection.config";
// const vitalstable = require('../models/vitalstable');
const shortid = require('shortid');

export class mainService {
    constructor() {}
  
    async getApi(req: any, res: any){
        try {
            if (!db_multi_instance) {
                await sequelizeConnect();
              }
           
              await db_multi_instance.query(
          `select * from hackathon.patients`
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

    async getVitals(req: any, res: any){
      try {
          if (!db_multi_instance) {
              await sequelizeConnect();
          }
         
          const data = await db_multi_instance.query(
              `WITH LatestVitals AS (
                    SELECT v.idvitals, v.vitalreading, v.time_s,
                        ROW_NUMBER() OVER (PARTITION BY v.idvitals ORDER BY v.time_s DESC) AS rn
                    FROM vitaltest v
                    JOIN vitalmaster m ON v.idvitals = m.idvitals
                )
                SELECT lv.idvitals, m.vitalsName, m.unit, lv.vitalreading, lv.time_s
                FROM LatestVitals lv
                JOIN vitalmaster m ON lv.idvitals = m.idvitals
                WHERE lv.rn = 1;`,
              // `SELECT * FROM vitalstable;`,
          );
          
          res.status(200).json(data[0]);
      } catch (error){
          res.status(500).json({
              message: error.toString(),
          });
         } 
      }

    async getVital(req: any, res: any){
      try {
          if (!db_multi_instance) {
              await sequelizeConnect();
          }

          const { vital } = req.query;
          const data = await db_multi_instance.query(
            `
            SELECT vitaltest.vitalreading, vitaltest.time_s, vitaltest.idvitals
            FROM vitaltest
            WHERE idvitals = ? ;
            `,
            {
                replacements: [vital],
                // type: QueryTypes.SELECT
            }
          );

          const latest = await db_multi_instance.query(
            `
            SELECT vitaltest.vitalreading, vitaltest.time_s, vitalmaster.unit FROM vitaltest JOIN vitalmaster ON vitaltest.idvitals = vitalmaster.idvitals 
            WHERE vitaltest.idvitals = ?
            ORDER BY time_s DESC
            LIMIT 1;
            `,
            {
                replacements: [vital],
                // type: QueryTypes.SELECT
            }
          );
          
          const response = {
            data: data[0],    // Assuming data is an array
            latestReading: latest[0],  // Assuming latest is an array
          };
          
          res.status(200).json(response);
        //   console.log(vital)
        //   res.json({ message: `Fetching data for vital ${vital}` });
      } catch (error){
          res.status(500).json({
              message: error.toString(),
          });
         } 
      }

    async postVitals(req: any, res: any){
      try {
          if (!db_multi_instance) {
              await sequelizeConnect();
          }

          const data = req.body; 

        //   console.log(data);

          const insertedVitals = [];


          for (const vital of data) {
            if (vital.vitalreading!=''){
                const query = `insert into vitaltest(idvitals, vitalreading, time_s) values (?,?,?);`;
                const values = [vital.idvitals, vital.vitalreading, vital.time_stamp];
                const [result] = await db_multi_instance.query(query, {
                replacements: values,
                });
                insertedVitals.push(vital);
            }
        }
            
          // const vitaldata = await vitalstable.bulkCreate(data);
          res.status(200).json({
            message: "Vitals data inserted successfully",
            data: insertedVitals,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            message: "Internal server error",
          });
      }
  }
  }