import * as express from 'express'
import serviceRoutes from "../components/services/routes"
import projectRoutes from "../components/projects/routes"
import projectCategoryRoutes from "../components/project-categories/routes"
import appImageRoutes from "../components/app-images/routes"

let router = express.Router()

router.use('/services', serviceRoutes)
router.use('/projects', projectRoutes)
router.use('/projectCategories', projectCategoryRoutes)
router.use('/images', appImageRoutes)

export default router