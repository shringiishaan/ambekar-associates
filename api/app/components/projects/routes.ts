import { Router, Response, Request } from "express"
import db from './db'
import { logger } from "../../logger"
import { Project } from "../../models/project.model"

let toErrorString = (req:Request, error:string) => {
    return "ProjectsRouter ["+req.url+"] : "+error
}

var router: Router = Router()

router.get("/all", (req: Request, res: Response) => {
    db.getAll().then((projects: Project[]) => {
        res.status(200).json({
            success: true,
            projects: projects
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

router.get("/one/:projectId", (req: Request, res: Response) => {
    let projectId: number = parseInt(req.params.projectId)
    if(Number.isInteger(projectId) && projectId) {
        db.getById(projectId).then((project: Project) => {
            res.status(200).json({
                success: true,
                project: project
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
            error: 'Invalid parameter : projectId'
        })
    }
})

router.get("/article/:projectId", (req: Request, res: Response) => {
    let projectId: number = parseInt(req.params.projectId)
    if(Number.isInteger(projectId) && projectId) {
        db.getArticleData(projectId).then((article: string) => {
            res.status(200).json({
                success: true,
                articleData: article
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
            error: 'Invalid parameter : projectId'
        })
    }
})

router.post("/new", (req: Request, res: Response) => {
    let project: Project = req.body.project
    if(project) {
        db.createNew(project).then((newId:number) => {
            res.status(200).json({success: true,newProjectId:newId})
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
            error: 'Invalid parameter : project'
        })
    }
})

router.post("/update", (req: Request, res: Response) => {
    let project: Project = req.body.project
    if(project) {
        db.update(project).then(() => {
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
            error: 'Invalid parameter : project'
        })
    }
})

router.post("/updateArticleData", (req: Request, res: Response) => {
    let projectId: number = req.body.projectId
    let articleData: string = req.body.articleData
    if(Number.isInteger(projectId) && projectId && articleData) {
        db.updateArticleData(projectId, articleData).then(() => {
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
            error: 'Invalid parameter : projectId||articleData'
        })
    }
})

router.post("/delete/:projectId", (req: Request, res: Response) => {
    let projectId: number = parseInt(req.params.projectId)
    if(Number.isInteger(projectId) && projectId) {
        db.delete(projectId).then(() => {
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
            error: 'Invalid parameter : projectId'
        })
    }
})

export default router