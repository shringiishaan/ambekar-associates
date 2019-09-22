import { Router, Response, Request } from "express"
import db from './db'
import { logger } from "../../logger"
import { AppImage } from "../../models/app-image.model"

let toErrorString = (req:Request, error:string) => {
    return "AppImagesRouter ["+req.url+"] : "+error
}

var router: Router = Router()

router.get("/all", (req: Request, res: Response) => {
    db.getAll().then((appImages: AppImage[]) => {
        res.status(200).json({
            success: true,
            appImages: appImages
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

router.get("/one/:appImageId", (req: Request, res: Response) => {
    let appImageId: number = parseInt(req.params.appImageId)
    if(Number.isInteger(appImageId) && appImageId) {
        db.getById(appImageId).then((appImage: AppImage) => {
            res.status(200).json({
                success: true,
                appImage: appImage
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
            error: 'Invalid parameter : appImageId'
        })
    }
})

router.post("/new", (req: Request, res: Response) => {
    let appImage: AppImage = req.body.appImage
    if(appImage) {
        db.createNew(appImage).then((newId:number) => {
            res.status(200).json({success: true,newAppImageId:newId})
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
            error: 'Invalid parameter : appImage'
        })
    }
})

router.post("/update", (req: Request, res: Response) => {
    let appImage: AppImage = req.body.appImage
    if(appImage) {
        db.update(appImage).then(() => {
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
            error: 'Invalid parameter : appImage'
        })
    }
})

router.post("/delete/:appImageId", (req: Request, res: Response) => {
    let appImageId: number = parseInt(req.params.appImageId)
    if(Number.isInteger(appImageId) && appImageId) {
        db.delete(appImageId).then(() => {
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
            error: 'Invalid parameter : appImageId'
        })
    }
})

export default router