import { Router, Response, Request } from "express"
import db from './db'
import { logger } from "../../logger"
import { AppImage } from "../../models/app-image.model"
import multer from 'multer'
import path from 'path'
import fs from 'fs'

let toErrorString = (req:Request, error:string) => {
    return "AppImagesRouter ["+req.url+"] : "+error
}

var UPLOAD_DIR = './images/'
var imageUploader = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, UPLOAD_DIR)
        },
        filename: (req: Request, file: Express.Multer.File, cb) => {
            let image: AppImage = new AppImage()
            image.name = file.originalname
            db.createNew(image).then((newImageId: number) => {
                cb(null, newImageId + '.png')
            }).catch(err => console.error(err))
        }
    })
}).single('image')

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
        res.sendFile(path.resolve('./images/', req.params.appImageId + '.png'))
    } else {
        res.sendFile(path.resolve('./images/ERROR404.png'))
    }
})

router.get("/oneObject/:appImageId", (req: Request, res: Response) => {
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
    imageUploader(req, res, (err) => {
        if (err) {
            logger.error(toErrorString(req, err))
            res.status(200).json({
                success: false,
                error: err
            })
        }
        else {
            let filename: string = req.file.filename
            let idStr: string = filename.split('.')[0]
            let id: number = parseInt(idStr)
            res.status(200).json({
                success: true,
                newAppImageId: id
            })
        }
    })
})

router.post("/newInProject", (req: Request, res: Response) => {
    imageUploader(req, res, (err) => {
        if (err) {
            logger.error(toErrorString(req, err))
            res.status(200).json({
                success: false,
                error: err
            })
        }
        else {
            let filename: string = req.file.filename
            let idStr: string = filename.split('.')[0]
            let imageId: number = parseInt(idStr)
            let projectId: number = parseInt(req.body.projectId)
            db.newInProject(projectId, imageId).then(() => {
                res.status(200).json({
                    success: true,
                    newAppImageId: imageId
                })
            }).catch(err => console.error(err))
        }
    })
})

router.post("/newInService", (req: Request, res: Response) => {
    imageUploader(req, res, (err) => {
        if (err) {
            logger.error(toErrorString(req, err))
            res.status(200).json({
                success: false,
                error: err
            })
        }
        else {
            let filename: string = req.file.filename
            let idStr: string = filename.split('.')[0]
            let imageId: number = parseInt(idStr)
            let serviceId: number = parseInt(req.body.serviceId)
            db.newInService(serviceId, imageId).then(() => {
                res.status(200).json({
                    success: true,
                    newAppImageId: imageId
                })
            }).catch(err => console.error(err))
        }
    })
})

router.post("/delete/:appImageId", (req: Request, res: Response) => {
    let appImageId: number = parseInt(req.params.appImageId)
    if(Number.isInteger(appImageId) && appImageId) {
        let imagePath: string = path.resolve('./images/', req.params.appImageId + '.png')
        db.delete(appImageId).then(() => {
            fs.unlink(imagePath, (error) => {
              if (error) {
                logger.error(toErrorString(req, error.message))
                res.status(200).json({
                    success: false,
                    error: error
                })
              } else {
                res.status(200).json({success: true})
              }
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

router.post("/deleteInProject/:projectId/:appImageId", (req: Request, res: Response) => {
    let appImageId: number = parseInt(req.params.appImageId)
    let projectId: number = parseInt(req.params.projectId)
    if(Number.isInteger(appImageId) && appImageId && Number.isInteger(projectId) && projectId) {
        db.deleteInProject(projectId, appImageId).then(() => {
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
            error: 'Invalid parameter : projectId || appImageId'
        })
    }
})

router.post("/deleteInService/:serviceId/:appImageId", (req: Request, res: Response) => {
    let appImageId: number = parseInt(req.params.appImageId)
    let serviceId: number = parseInt(req.params.serviceId)
    if(Number.isInteger(appImageId) && appImageId && Number.isInteger(serviceId) && serviceId) {
        db.deleteInService(serviceId, appImageId).then(() => {
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
            error: 'Invalid parameter : serviceId || appImageId'
        })
    }
})

router.post("/updatePriorityInProject/:projectId/:appImageId", (req: Request, res: Response) => {
    let appImageId: number = parseInt(req.params.appImageId)
    let projectId: number = parseInt(req.params.projectId)
    let priority: number = req.body.priority
    if(Number.isInteger(appImageId) && appImageId && Number.isInteger(projectId) && projectId && Number.isInteger(priority) && priority) {
        db.updatePriorityInProject(projectId, appImageId, priority).then(() => {
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
            error: 'Invalid parameter : projectId||appImageId||priority'
        })
    }
})

router.post("/updatePriorityInService/:serviceId/:appImageId", (req: Request, res: Response) => {
    let appImageId: number = parseInt(req.params.appImageId)
    let serviceId: number = parseInt(req.params.serviceId)
    let priority: number = req.body.priority
    if(Number.isInteger(appImageId) && appImageId && Number.isInteger(serviceId) && serviceId && Number.isInteger(priority) && priority) {
        db.updatePriorityInService(serviceId, appImageId, priority).then(() => {
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
            error: 'Invalid parameter : serviceId||appImageId||priority'
        })
    }
})

export default router