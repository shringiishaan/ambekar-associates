import { Router, Response, Request } from "express"
import db from './db'
import { Service } from "../../models/service.model"
import { logger } from "../../logger"

let toErrorString = (req:Request, error:string) => {
    return "ServiceRouter ["+req.url+"] : "+error
}

var router: Router = Router()

router.get("/all", (req: Request, res: Response) => {
    db.getAll().then((services: Service[]) => {
        res.status(200).json({
            success: true,
            channels: services
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

router.get("/one/:serviceId", (req: Request, res: Response) => {
    let serviceId: number = parseInt(req.params.serviceId)
    if(Number.isInteger(serviceId) && serviceId) {
        db.getById(serviceId).then((service: Service) => {
            res.status(200).json({
                success: true,
                service: service
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
            error: 'Invalid parameter : serviceId'
        })
    }
})

router.get("/article/:serviceId", (req: Request, res: Response) => {
    let serviceId: number = parseInt(req.params.serviceId)
    if(Number.isInteger(serviceId) && serviceId) {
        db.getArticleData(serviceId).then((article: string) => {
            res.status(200).json({
                success: true,
                article: article
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
            error: 'Invalid parameter : serviceId'
        })
    }
})

router.post("/new", (req: Request, res: Response) => {
    let service: Service = req.body.service
    if(service) {
        db.createNew(service).then((newId:number) => {
            res.status(200).json({success: true,newServiceId:newId})
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
            error: 'Invalid parameter : service'
        })
    }
})

router.post("/update", (req: Request, res: Response) => {
    let service: Service = req.body.service
    if(service) {
        db.update(service).then(() => {
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
            error: 'Invalid parameter : service'
        })
    }
})

router.post("/updateArticleData", (req: Request, res: Response) => {
    let serviceId: number = req.body.serviceId
    let articleData: string = req.body.articleData
    if(Number.isInteger(serviceId) && serviceId && articleData) {
        db.updateArticleData(serviceId, articleData).then(() => {
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
            error: 'Invalid parameter : serviceId||articleData'
        })
    }
})

router.post("/delete/:serviceId", (req: Request, res: Response) => {
    let serviceId: number = parseInt(req.params.serviceId)
    if(Number.isInteger(serviceId) && serviceId) {
        db.delete(serviceId).then(() => {
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
            error: 'Invalid parameter : serviceId'
        })
    }
})

export default router