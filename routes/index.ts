import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.render('index') // Render the index.ejs file
})

export default router
