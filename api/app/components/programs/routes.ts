import { Router, Response, Request } from "express"
import db from './db'
import { Program } from "../../models/program.model";

var router: Router = Router()

router.get("/channel/:channel_id", (req: Request, res: Response) => {
    let channel_id: number = parseInt(req.params.channel_id)
    if(Number.isInteger(channel_id) && channel_id) {
        db.get_all_programs_by_channel(channel_id).then((programs: Program[]) => {
            res.status(200).json({
                success: true,
                programs: programs
            })
        })
    } else {
        res.status(200).json({
            success: false,
            error: "Invalid channel_id parameter"
        })
    }
})

router.get("/:program_id", (req: Request, res: Response) => {
    let program_id: number = parseInt(req.params.program_id)
    if(Number.isInteger(program_id) && program_id) {
        db.get_program_by_id(program_id).then((program:Program) => {
            res.status(200).json({
                success: true,
                program: program
            })
        }).catch((error) => {
            res.status(200).json({
                success: false,
                error: error
            })
        })
    } else {
        res.status(200).json({
            success: false,
            error: "Invalid program_id parameter"
        })
    }
})

router.post("/", (req: Request, res: Response) => {
    let program: Program = req.body.program
    if(program) {
        db.new_program(program)
        .then((new_id: number) => {
            res.status(200).json({
                success: true,
                new_program_id: new_id
            })
        }).catch((error) => {
            res.status(200).json({
                success: false,
                error: error
            })
        })
    } else {
        res.status(200).json({
            success: false,
            error: "Program parameter missing"
        })
    }
})

router.put("/", (req: Request, res: Response) => {
    let program: Program = req.body.program
    if(program) {
        db.update_program(program)
        .then(() => {
            res.status(200).json({success: true})
        }).catch((error) => {
            res.status(200).json({
                success: false,
                error: error
            })
        })
    } else {
        res.status(200).json({
            success: false,
            error: "Program parameter missing"
        })
    }
})

router.delete("/:program_id", (req: Request, res: Response) => {
    let program_id: number = parseInt(req.params.program_id)
    if(program_id) {
        db.delete_program(program_id)
        .then(() => {
            res.status(200).json({success: true})
        }).catch((error) => {
            res.status(200).json({
                success: false,
                error: error
            })
        })
    } else {
        res.status(200).json({
            success: false,
            error: "Program parameter missing"
        })
    }
})

export default router