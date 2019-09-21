import express from "express"
import { applyMiddleware } from './utils'
import middleware from './middleware'
import routes from './routes'

class App {

    public app: express.Application

    constructor() {
        this.app = express()
        this.bootstrap()
    }

    private bootstrap(): void {

        applyMiddleware(middleware, this.app)

        this.app.use('/rest', routes)
    }
}

export default new App().app