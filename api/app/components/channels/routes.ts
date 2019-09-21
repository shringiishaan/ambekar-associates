import { Router, Response, Request } from "express"
import db from './db'
import { Channel } from "../../models/channel.model";

var router: Router = Router()

router.get("/", (req: Request, res: Response) => {
    db.get_all_channels().then((channels: any) => {
        res.status(200).json({
            success: true,
            channels: channels
        })
    })
})

router.get("/:channel_id", (req: Request, res: Response) => {
    let channel_id: number = parseInt(req.params.channel_id)
    if(Number.isInteger(channel_id) && channel_id) {
        db.get_channel_by_id(channel_id).then((channel: Channel) => {
            res.status(200).json({
                success: true,
                channel: channel
            })
        }).catch((error) => {
            res.status(200).json({
                success: false,
                error: error
            })
        })
    }
})

export default router