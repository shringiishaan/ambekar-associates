import { MysqlError, FieldInfo } from "mysql";
import { Service } from "../../models/service.model";

import db from '../dbpool'

const DATABASE_NAME = 'ambekar-webapp'
const TABLE_NAME = 'services'

class ServiceController {

    getById = (serviceId: number): Promise<Service> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT `id`,`title`,`priority` FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` WHERE `id`=?;"
            db.query(sql, [serviceId], (error:MysqlError|null, results: any) => {
                if(error || !results || results.length!==1) {
                    reject(error)
                }
                else {
                    resolve(results[0])
                } 
            })
        })
    }

    getAll = (): Promise<Service[]> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT `id`,`title`,`priority` FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` ORDER BY `priority` DESC;"
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

    getArticleData = (serviceId: number): Promise<string> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT `articleData` FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` WHERE `id`=?;"
            db.query(sql, [serviceId], (error:MysqlError|null, results: any) => {
                if(error || !results || results.length!==1) {
                    reject(error)
                }
                else {
                    resolve(results[0].articleData)
                } 
            })
        })
    }
    
    createNew = (service: Service): Promise<number> => {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` (`title`, `priority`, `articleData`) VALUES (?, ?, ?);"
            db.query(sql, [service.title, service.priority, '<p>Enter article data</p>'], (error:MysqlError|null, results: any) => {
                if(error || !results.insertId) reject(error)
                else resolve(results.insertId)
            })
        })
    }
    
    update = (service: Service): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` SET `title`=?, `priority`=? WHERE `id`=?;"
            db.query(sql, [service.title, service.priority, service.id], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else resolve()
            })
        })
    }
    
    updateArticleData = (serviceId: number, articleData: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` SET `articleData`=? WHERE `id`=?;"
            db.query(sql, [articleData, serviceId], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else resolve()
            })
        })
    }
    
    delete = (serviceId: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` WHERE `id`=?;"
            db.query(sql, [serviceId], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else resolve()
            })
        })
    }
}

export default new ServiceController()