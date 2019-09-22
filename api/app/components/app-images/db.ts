import { MysqlError, FieldInfo } from "mysql";
import { AppImage } from "../../models/app-image.model";

import db from '../dbpool'

const DATABASE_NAME = 'ambekar-webapp'
const TABLE_NAME = 'images'

class ProjectController {

    getById = (appImageId: number): Promise<AppImage> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT `id`,`name` FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` WHERE `id`=?;"
            db.query(sql, [appImageId], (error:MysqlError|null, results: any) => {
                if(error || !results || results.length!==1) {
                    reject(error)
                }
                else {
                    resolve(results[0])
                } 
            })
        })
    }

    getAll = (): Promise<AppImage[]> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT `id`,`name` FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"`;"
            db.query(sql, (error:MysqlError|null, results: any) => {
                if(error || !results || results.length!==1) {
                    reject(error)
                }
                else {
                    resolve(results)
                } 
            })
        })
    }
    
    createNew = (appImage: AppImage): Promise<number> => {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` (`name`) VALUES (?);"
            db.query(sql, [appImage.name], (error:MysqlError|null, results: any) => {
                if(error || !results.insertId) reject(error)
                else resolve(results.insertId)
            })
        })
    }
    
    update = (appImage: AppImage): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` SET `name`=? WHERE `id`=?;"
            db.query(sql, [appImage.name, appImage.id], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else resolve()
            })
        })
    }
    
    delete = (appImageId: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` WHERE `id`=?;"
            db.query(sql, [appImageId], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else resolve()
            })
        })
    }
}

export default new ProjectController()