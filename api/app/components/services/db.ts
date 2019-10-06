import { MysqlError, FieldInfo } from "mysql";
import { Service } from "../../models/service.model";

import db from '../dbpool'

const DATABASE_NAME = 'ambekar-associates'
const TABLE_NAME = 'services'
const IMAGE_TABLE_NAME = 'service_images'

const DEFAULT_ARTICLE_DATA = `<h3>Main Heading</h3>
<hr />
<p>Paragrah text is contained within 'p' tags. An horizontal division line can be formed using 'hr' tag.</p>
<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 
'Content here, content here', making it look like readable English.</p>
<h5>Sub Heading</h5>
<p>Some other text formats include <b>Bold text</b>, <i>Italic Text</i> and <u>Underlined Text</u>.
<h5>Unordered List</h5>
<p>Bullet points are contained within 'ul' tags and points are enclosed in 'li' tags each.</p>
<ul>
	<li>Point One</li>
	<li>Point Two</li>
	<li>Point Three</li>
</ul>
<h5>Ordered List</h5>
<p>Numbered points are contained within 'ol' tags and points are enclosed in 'li' tags each.</p>
<ol>
	<li>Point One</li>
	<li>Point Two</li>
	<li>Point Three</li>
</ol>
<p>You can also provide a hiperlink to a page within this website or even some other website. Example <a href="http://www.google.com">click here</a> to visit 'www.google.com'.</p>`

class ServiceController {

    getById = (serviceId: number): Promise<Service> => {
        return new Promise((resolve, reject) => {
            let query = "SELECT `id`,`title`,`priority` FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` WHERE `id`=?;"
            db.query(query, [serviceId], (error:MysqlError|null, results: any) => {
                if(error || !results || results.length!==1) {
                    reject(error)
                }
                else {
                    let service: Service = new Service()
                    service.id = results[0].id
                    service.priority = results[0].priority
                    service.title = results[0].title
                    query = "SELECT `imageId`,`priority` FROM `"+DATABASE_NAME+"`.`"+IMAGE_TABLE_NAME+"` WHERE `serviceId`=? ORDER BY `priority` DESC;"
                    db.query(query, [serviceId], (error:MysqlError|null, results: any) => {
                        if(error || !results) {
                            reject(error)
                        }
                        else {
                            results.forEach((result:any) => {
                                service.imageIds.push({
                                    id: result.imageId,
                                    priority: result.priority
                                })
                            })
                            resolve(service)
                        } 
                    })
                } 
            })
        })
    }

    getAll = (): Promise<Service[]> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT `id`,`title`,`priority` FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` ORDER BY `priority` DESC;"
            db.query(sql, (error:MysqlError|null, results: any) => {
                if(error || !results) {
                    reject(error)
                }
                else {
                    let services: Service[] = []
                    let totalServices: number = results.length
                    results.forEach((result:any) => {
                        let service: Service = new Service()
                        service.id = result.id
                        service.priority = result.priority
                        service.title = result.title
                        let query = "SELECT `imageId`,`priority` FROM `"+DATABASE_NAME+"`.`"+IMAGE_TABLE_NAME+"` WHERE `serviceId`=? ORDER BY `priority` DESC;"
                        db.query(query, [service.id], (error:MysqlError|null, results: any) => {
                            if(error || !results) {
                                totalServices--
                            }
                            else {
                                results.forEach((result:any) => {
                                    service.imageIds.push({
                                        id: result.imageId,
                                        priority: result.priority
                                    })
                                })
                                services.push(service)
                                totalServices--
                            } 
                        })
                    })
                    let int = setInterval(() => {
                        if(!totalServices) {
                            clearInterval(int)
                            resolve(services)
                        }
                    }, 50)
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
            db.query(sql, [service.title, service.priority, DEFAULT_ARTICLE_DATA], (error:MysqlError|null, results: any) => {
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
                else {
                    sql = "DELETE FROM `"+DATABASE_NAME+"`.`"+IMAGE_TABLE_NAME+"` WHERE `serviceId`=?;"
                    db.query(sql, [serviceId], (error:MysqlError|null, results: any) => {
                        if(error) reject(error)
                        else resolve()
                    })
                }
            })
        })
    }
}

export default new ServiceController()