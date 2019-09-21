import app from "./app"
import {logger} from './logger'

const HOST = "0.0.0.0"
const PORT = 3000

app.listen(PORT, HOST, () => {
    console.log("API Server listening on " + PORT)
    logger.info("API Server listening on " + PORT)
})