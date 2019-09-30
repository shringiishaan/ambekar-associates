import { MysqlError } from "mysql";
import { ProjectCategory } from "../../models/project-category.model";

import db from '../dbpool'

const DATABASE_NAME = 'ambekar-associates'
const TABLE_NAME = 'project_categories'

class ProjectCategoryController {

    getById = (projectCategoryId: number): Promise<ProjectCategory> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` WHERE `id`=?;"
            db.query(sql, [projectCategoryId], (error:MysqlError|null, results: any) => {
                if(error || !results || results.length!==1) {
                    reject(error)
                }
                else {
                    resolve(results[0])
                } 
            })
        })
    }

    getAll = (): Promise<ProjectCategory[]> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` ORDER BY `priority` DESC;"
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
    
    createNew = (projectCategory: ProjectCategory): Promise<number> => {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` (`name`, `priority`) VALUES (?, ?);"
            db.query(sql, [projectCategory.name, projectCategory.priority], (error:MysqlError|null, results: any) => {
                if(error || !results.insertId) reject(error)
                else resolve(results.insertId)
            })
        })
    }
    
    update = (projectCategory: ProjectCategory): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` SET `name`=?, `priority`=? WHERE `id`=?;"
            db.query(sql, [projectCategory.name, projectCategory.priority, projectCategory.id], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else resolve()
            })
        })
    }
    
    delete = (projectCategoryId: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` WHERE `id`=?;"
            db.query(sql, [projectCategoryId], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else resolve()
            })
        })
    }
}

export default new ProjectCategoryController()