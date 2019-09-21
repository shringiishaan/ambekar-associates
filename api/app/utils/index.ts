import { Router, Request, Response, NextFunction } from "express"

type Wrapper = ((router: Router) => void)

export const applyMiddleware = (middleware: Wrapper[], router: Router) => {
    for (const component of middleware) {
        component(router)
    }
}