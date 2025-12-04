import express, { Request, Response } from 'express'
import cors from 'cors'
import requestLoggerMiddleware from './middleware/requestLogger.middleware'
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "../docs/swagger";
import testRoutes from './routes/__test__.routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLoggerMiddleware)

app.use("/api", testRoutes)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", (_: Request, res: Response) => res.sendStatus(404))

export default app