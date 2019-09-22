import { Router, Response, Request } from "express"
import db from './db'
import { logger } from "../../logger"
import { ProjectCategory } from "../../models/project-category.model"

let toErrorString = (req:Request, error:string) => {
    return "ProjectCategoryRouter ["+req.url+"] : "+error
}

var router: Router = Router()

router.get("/all", (req: Request, res: Response) => {
    db.getAll().then((projectCategories: ProjectCategory[]) => {
        res.status(200).json({
            success: true,
            projectCategories: projectCategories
        })
    })
    .catch(err => {
        logger.error(toErrorString(req, err))
        res.status(200).json({
            success: false,
            error: err
        })
    })
})

router.get("/one/:projectCategoryId", (req: Request, res: Response) => {
    let projectCategoryId: number = parseInt(req.params.projectCategoryId)
    if(Number.isInteger(projectCategoryId) && projectCategoryId) {
        db.getById(projectCategoryId).then((projectCategory: ProjectCategory) => {
            res.status(200).json({
                success: true,
                projectCategory: projectCategory
            })
        }).catch((error) => {
            logger.error(toErrorString(req, error))
            res.status(200).json({
                success: false,
                error: error
            })
        })
    } else {
        res.status(200).json({
            success: false,
            error: 'Invalid parameter : projectCategoryId'
        })
    }
})

router.post("/new", (req: Request, res: Response) => {
    let projectCategory: ProjectCategory = req.body.projectCategory
    if(projectCategory) {
        db.createNew(projectCategory).then((newId:number) => {
            res.status(200).json({success: true,newProjectCategoryId:newId})
        }).catch((error) => {
            logger.error(toErrorString(req, error))
            res.status(200).json({
                success: false,
                error: error
            })
        })
    } else {
        res.status(200).json({
            success: false,
            error: 'Invalid parameter : projectCategory'
        })
    }
})

router.post("/update", (req: Request, res: Response) => {
    let projectCategory: ProjectCategory = req.body.projectCategory
    if(projectCategory) {
        db.update(projectCategory).then(() => {
            res.status(200).json({success: true})
        }).catch((error) => {
            logger.error(toErrorString(req, error))
            res.status(200).json({
                success: false,
                error: error
            })
        })
    } else {
        res.status(200).json({
            success: false,
            error: 'Invalid parameter : projectCategory'
        })
    }
})

router.post("/delete/:projectCategoryId", (req: Request, res: Response) => {
    let projectCategoryId: number = parseInt(req.params.projectCategoryId)
    if(Number.isInteger(projectCategoryId) && projectCategoryId) {
        db.delete(projectCategoryId).then(() => {
            res.status(200).json({success: true})
        }).catch((error) => {
            logger.error(toErrorString(req, error))
            res.status(200).json({
                success: false,
                error: error
            })
        })
    } else {
        res.status(200).json({
            success: false,
            error: 'Invalid parameter : projectCategoryId'
        })
    }
})

export default router