import * as express from 'express'
import serviceRoutes from "../components/services/routes"
import projectRoutes from "../components/projects/routes"
import projectCategoryRoutes from "../components/project-categories/routes"
import appImageRoutes from "../components/app-images/routes"

let router = express.Router()

router.use('/service', serviceRoutes)
router.use('/project', projectRoutes)
router.use('/projectCategory', projectCategoryRoutes)
router.use('/image', appImageRoutes)

export default router