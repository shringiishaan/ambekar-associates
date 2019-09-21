import * as express from 'express'
import channelRoutes from "../components/channels/routes";
import programRoutes from "../components/programs/routes";

let router = express.Router()

router.use('/channel', channelRoutes)

router.use('/program', programRoutes)

export default router