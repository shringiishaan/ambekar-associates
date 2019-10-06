import { MysqlError, FieldInfo } from "mysql";
import { AppImage } from "../../models/app-image.model";

import db from '../dbpool'
import { Carousel } from "../../models/carousel.model";
import { Client } from "../../models/client.model";

const DATABASE_NAME = 'ambekar-associates'
const TABLE_NAME = 'images'
const PROJECT_IMAGES_TABLE_NAME = 'project_images'
const SERVICE_IMAGES_TABLE_NAME = 'service_images'
const CAROUSELS_TABLE_NAME = 'carousel'
const CLIENTS_TABLE_NAME = 'clients'

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
                else {
                    db.query(
                        "DELETE FROM `"+DATABASE_NAME+"`.`"+PROJECT_IMAGES_TABLE_NAME+"` WHERE `imageId`=?;", 
                        (error:MysqlError|null, results: any) => {
                            if(error) reject(error)
                            else {
                                db.query(
                                    "DELETE FROM `"+DATABASE_NAME+"`.`"+SERVICE_IMAGES_TABLE_NAME+"` WHERE `imageId`=?;", 
                                    (error:MysqlError|null, results: any) => {
                                        if(error) reject(error)
                                        else {
                                            resolve()
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
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



    

    getAllCarousels = (): Promise<Carousel[]> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `"+DATABASE_NAME+"`.`"+CAROUSELS_TABLE_NAME+"`;"
            db.query(sql, (error:MysqlError|null, results: any) => {
                if(error || !results) reject(error)
                else resolve(results)
            })
        })
    }
    
    newCarousel = (carousel: Carousel): Promise<number> => {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT max(`priority`)+1 AS `priority` FROM `"+DATABASE_NAME+"`.`"+CAROUSELS_TABLE_NAME+"`;", 
                (error:MysqlError|null, results: any) => {
                    if(error) reject(error)
                    else {
                        let priority = parseInt(results[0].priority)
                        if(!priority) priority = 1
                        let sql = "INSERT INTO `"+DATABASE_NAME+"`.`"+CAROUSELS_TABLE_NAME+"` (`imageId`,`title`,`description`,`priority`) VALUES (?,?,?,?);"
                        db.query(sql, [carousel.imageId,carousel.title,carousel.description,priority,carousel.id], (error:MysqlError|null, results: any) => {
                            if(error) reject(error)
                            else resolve(results.insertId)
                        })
                    }
                }
            )
        })
    }
    
    updateCarousel = (carousel: Carousel): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE `"+DATABASE_NAME+"`.`"+CAROUSELS_TABLE_NAME+"` SET `imageId`=?,`title`=?,`description`=?,`priority`=? WHERE `id`=?;"
            db.query(sql, [carousel.imageId,carousel.title,carousel.description,carousel.priority,carousel.id], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else resolve()
            })
        })
    }
    
    deleteCarousel = (carouselId: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM `"+DATABASE_NAME+"`.`"+CAROUSELS_TABLE_NAME+"` WHERE `id`=?;"
            db.query(sql, [carouselId], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else resolve()
            })
        })
    }


    

    

    getAllClients = (): Promise<Client[]> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `"+DATABASE_NAME+"`.`"+CLIENTS_TABLE_NAME+"` ORDER BY `priority` DESC;"
            db.query(sql, (error:MysqlError|null, results: any) => {
                if(error || !results) reject(error)
                else resolve(results)
            })
        })
    }
    
    newClient = (client: Client): Promise<number> => {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT max(`priority`)+1 AS `priority` FROM `"+DATABASE_NAME+"`.`"+CLIENTS_TABLE_NAME+"`;", 
                (error:MysqlError|null, results: any) => {
                    if(error) reject(error)
                    else {
                        let priority = parseInt(results[0].priority)
                        if(!priority) priority = 1
                        let sql = "INSERT INTO `"+DATABASE_NAME+"`.`"+CLIENTS_TABLE_NAME+"` (`imageId`,`name`,`priority`) VALUES (?,?,?);"
                        db.query(sql, [client.imageId,client.name,priority,client.id], (error:MysqlError|null, results: any) => {
                            if(error) reject(error)
                            else resolve(results.insertId)
                        })
                    }
                }
            )
        })
    }
    
    updateClient = (client: Client): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE `"+DATABASE_NAME+"`.`"+CLIENTS_TABLE_NAME+"` SET `imageId`=?,`name`=?,`priority`=? WHERE `id`=?;"
            db.query(sql, [client.imageId,client.name,client.priority,client.id], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else resolve()
            })
        })
    }
    
    deleteClient = (clientId: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM `"+DATABASE_NAME+"`.`"+CLIENTS_TABLE_NAME+"` WHERE `id`=?;"
            db.query(sql, [clientId], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else resolve()
            })
        })
    }
}

export default new ProjectController()