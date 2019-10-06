import { MysqlError, FieldInfo } from "mysql";
import { Project } from "../../models/project.model";

import db from '../dbpool'

const DATABASE_NAME = 'ambekar-associates'
const TABLE_NAME = 'projects'
const IMAGE_TABLE_NAME = 'project_images'

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

class ProjectController {

    getById = (projectId: number): Promise<Project> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT `id`,`title`,`projectCategoryName`,`completionTime` FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` WHERE `id`=?;"
            db.query(sql, [projectId], (error:MysqlError|null, results: any) => {
                if(error || !results || results.length!==1) {
                    reject(error)
                }
                else {
                    let project: Project = new Project()
                    project.id = results[0].id
                    project.title = results[0].title
                    project.projectCategoryName = results[0].projectCategoryName
                    project.completionTime = results[0].completionTime
                    sql = "SELECT `imageId`,`priority` FROM `"+DATABASE_NAME+"`.`"+IMAGE_TABLE_NAME+"` WHERE `projectId`=? ORDER BY `priority` DESC;"
                    db.query(sql, [projectId], (error:MysqlError|null, results: any) => {
                        if(error || !results) {
                            reject(error)
                        }
                        else {
                            results.forEach((result:any) => {
                                project.imageIds.push({
                                    id: result.imageId,
                                    priority: result.priority
                                })
                            })
                            resolve(project)
                        } 
                    })
                } 
            })
        })
    }

    getAll = (): Promise<Project[]> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT `id`,`title`,`projectCategoryName`,`completionTime` FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` ORDER BY `completionTime` DESC;"
            db.query(sql, (error:MysqlError|null, results: any) => {
                if(error || !results) {
                    reject(error)
                }
                else {
                    let projects: Project[] = []
                    let totalProjects: number = results.length
                    results.forEach((result:any) => {
                        let project: Project = new Project()
                        project.id = result.id
                        project.title = result.title
                        project.projectCategoryName = result.projectCategoryName
                        project.completionTime = result.completionTime
                        let query = "SELECT `imageId`,`priority` FROM `"+DATABASE_NAME+"`.`"+IMAGE_TABLE_NAME+"` WHERE `projectId`=? ORDER BY `priority` DESC;"
                        db.query(query, [project.id], (error:MysqlError|null, results: any) => {
                            if(error || !results) {
                                totalProjects--
                            }
                            else {
                                results.forEach((result:any) => {
                                    project.imageIds.push({
                                        id: result.imageId,
                                        priority: result.priority
                                    })
                                })
                                projects.push(project)
                                totalProjects--
                            } 
                        })
                    })
                    let int = setInterval(() => {
                        if(!totalProjects) {
                            clearInterval(int)
                            resolve(projects)
                        }
                    }, 50)
                } 
            })
        })
    }

    getArticleData = (projectId: number): Promise<string> => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT `articleData` FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` WHERE `id`=?;"
            db.query(sql, [projectId], (error:MysqlError|null, results: any) => {
                if(error || !results || results.length!==1) {
                    reject(error)
                }
                else {
                    resolve(results[0].articleData)
                } 
            })
        })
    }
    
    createNew = (project: Project): Promise<number> => {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` (`title`,`projectCategoryName`,`completionTime`,`articleData`) VALUES (?, ?, ?, ?);"
            db.query(sql, [project.title, project.projectCategoryName, project.completionTime, DEFAULT_ARTICLE_DATA], (error:MysqlError|null, results: any) => {
                if(error || !results.insertId) reject(error)
                else resolve(results.insertId)
            })
        })
    }
    
    update = (project: Project): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` SET `title`=?,`projectCategoryName`=?,`completionTime`=? WHERE `id`=?;"
            db.query(sql, [project.title, project.projectCategoryName, project.completionTime, project.id], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else resolve()
            })
        })
    }
    
    updateArticleData = (projectId: number, articleData: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` SET `articleData`=? WHERE `id`=?;"
            db.query(sql, [articleData, projectId], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else resolve()
            })
        })
    }
    
    delete = (projectId: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM `"+DATABASE_NAME+"`.`"+TABLE_NAME+"` WHERE `id`=?;"
            db.query(sql, [projectId], (error:MysqlError|null, results: any) => {
                if(error) reject(error)
                else {
                    sql = "DELETE FROM `"+DATABASE_NAME+"`.`"+IMAGE_TABLE_NAME+"` WHERE `projectId`=?;"
                    db.query(sql, [projectId], (error:MysqlError|null, results: any) => {
                        if(error) reject(error)
                        else resolve()
                    })
                }
            })
        })
    }
}

export default new ProjectController()