import { MysqlError } from "mysql";
import { ProjectCategory } from "../../models/project-category.model";

import db from '../dbpool'

const DATABASE_NAME = 'ambekar-associates'
const TABLE_NAME = 'project_categories'
const PROJECTS_TABLE_NAME = 'projects'

class ProjectCategoryController {

    getById = (projectCategoryId: number): Promise<ProjectCategory> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` WHERE `id`=?;"
            db.query(sql, [projectCategoryId], (error:MysqlError|null, results: any) => {
                if(error || !results || results.length!==1) reject(error)
                else resolve(results[0])
            })
        })
    }

    getAll = (): Promise<ProjectCategory[]> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` ORDER BY `priority` DESC;"
            db.query(sql, (error:MysqlError|null, results: any) => {
                if(error || !results) reject(error)
                else resolve(results)
            })
        })
    }
    
    createNew = (projectCategory: ProjectCategory): Promise<number> => {
        return new Promise((resolve, reject) => {
            db.query("SELECT MAX(`priority`)+1 AS `priority` FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"`", (error:MysqlError|null, results: any) => {
                if(error || !results) reject(error)
                else {
                    let sql = "INSERT INTO `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` (`name`, `priority`) VALUES (?, ?);"
                    db.query(sql, [projectCategory.name, parseInt(results[0].priority)], (error:MysqlError|null, results: any) => {
                        if(error || !results.insertId) reject(error)
                        else resolve(results.insertId)
                    })
                }
            })
        })
    }
    
    update = (projectCategory: ProjectCategory): Promise<void> => {
        return new Promise((resolve, reject) => {
            this.getById(projectCategory.id).then((oldProjectCategory: ProjectCategory) => {
                db.query(
                    "UPDATE `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` SET `name`=?, `priority`=? WHERE `id`=?;", 
                    [projectCategory.name, projectCategory.priority, projectCategory.id], 
                    (error:MysqlError|null, results: any) => {
                        if(error) reject(error)
                        else if(oldProjectCategory.name!==projectCategory.name) {
                            db.query(
                                "UPDATE `"+DATABASE_NAME+"`.`"+PROJECTS_TABLE_NAME+"` SET `projectCategoryName`=? WHERE `projectCategoryName`=?;", 
                                [projectCategory.name, oldProjectCategory.name], 
                                (error:MysqlError|null, results: any) => {
                                    if(error) reject(error)
                                    else resolve()
                                }
                            )
                        } else resolve()
                    }
                )
            })
        })
    }
    
    delete = (projectCategoryId: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            this.getById(projectCategoryId).then((projectCategory:ProjectCategory) => {
                let sql = "DELETE FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` WHERE `id`=?;"
                db.query(sql, [projectCategoryId], (error:MysqlError|null, results: any) => {
                    if(error) reject(error)
                    else {
                        db.query(
                            "UPDATE `"+DATABASE_NAME+"`.`"+PROJECTS_TABLE_NAME+"` SET `projectCategoryName`=null WHERE `projectCategoryName`=?;", 
                            [projectCategory.name], 
                            (error:MysqlError|null, results: any) => {
                                if(error) reject(error)
                                else resolve()
                            }
                        )
                    }
                })
            }).catch(err=>reject(err))
        })
    }
}

export default new ProjectCategoryController()