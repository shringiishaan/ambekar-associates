import { MysqlError, FieldInfo } from "mysql";
import { AppImage } from "../../models/app-image.model";

import db from '../dbpool'

const DATABASE_NAME = 'ambekar-associates'
const TABLE_NAME = 'images'
const PROJECT_IMAGES_TABLE_NAME = 'project_images'
const SERVICE_IMAGES_TABLE_NAME = 'service_images'

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
                if(error || !results) {
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
    
    newInProject = (projectId: number, appImageId: number): Promise<number> => {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT max(`priority`)+1 AS `priority` FROM `"+DATABASE_NAME+"`.`"+PROJECT_IMAGES_TABLE_NAME+"` WHERE `projectId`=?;", 
                [projectId], 
                (error:MysqlError|null, results: any) => {
                    if(error) reject(error)
                    else {
                        let priority: number = parseInt(results[0].priority)
                        if(!priority) priority = 1
                        db.query(
                            "INSERT INTO `"+DATABASE_NAME+"`.`"+PROJECT_IMAGES_TABLE_NAME+"` (`projectId`, `imageId`, `priority`) VALUES (?,?,?);", 
                            [projectId, appImageId, priority], (error:MysqlError|null, results: any) => {
                                if(error || !results.insertId) reject(error)
                                else resolve(results.insertId)
                            }
                        )
                    }
                }
            )
        })
    }
    
    newInService = (serviceId: number, appImageId: number): Promise<number> => {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT max(`priority`)+1 AS `priority` FROM `"+DATABASE_NAME+"`.`"+SERVICE_IMAGES_TABLE_NAME+"` WHERE `serviceId`=?;", 
                [serviceId], 
                (error:MysqlError|null, results: any) => {
                    if(error) reject(error)
                    else {
                        let priority: number = parseInt(results[0].priority)
                        if(!priority) priority = 1
                        db.query(
                            "INSERT INTO `"+DATABASE_NAME+"`.`"+SERVICE_IMAGES_TABLE_NAME+"` (`serviceId`, `imageId`, `priority`) VALUES (?,?,?);", 
                            [serviceId, appImageId, priority], (error:MysqlError|null, results: any) => {
                                if(error || !results.insertId) reject(error)
                                else resolve(results.insertId)
                            }
                        )
                    }
                }
            )
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
    
    deleteInProject = (projectId: number, appImageId: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM `"+DATABASE_NAME+"`.`"+PROJECT_IMAGES_TABLE_NAME+"` WHERE `projectId`=? AND `imageId`=?;"
            db.query(sql, [projectId, appImageId], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else resolve()
            })
        })
    }
    
    deleteInService = (serviceId: number, appImageId: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM `"+DATABASE_NAME+"`.`"+SERVICE_IMAGES_TABLE_NAME+"` WHERE `serviceId`=? AND `imageId`=?;"
            db.query(sql, [serviceId, appImageId], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else resolve()
            })
        })
    }
    
    updatePriorityInService = (serviceId: number, appImageId: number, priority: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE `"+DATABASE_NAME+"`.`"+SERVICE_IMAGES_TABLE_NAME+"` SET `priority`=? WHERE `serviceId`=? AND `imageId`=?;"
            db.query(sql, [priority, serviceId, appImageId], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else resolve()
            })
        })
    }
    
    updatePriorityInProject = (projectId: number, appImageId: number, priority: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE `"+DATABASE_NAME+"`.`"+PROJECT_IMAGES_TABLE_NAME+"` SET `priority`=? WHERE `projectId`=? AND `imageId`=?;"
            db.query(sql, [priority, projectId, appImageId], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else resolve()
            })
        })
    }
}

export default new ProjectController()