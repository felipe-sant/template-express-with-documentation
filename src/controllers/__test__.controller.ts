import { Request, Response } from "express";
import TestService from "../services/__test__.service";

class TestController {
    private testService: TestService

    constructor() {
        this.testService = new TestService()
    }

    /**
     * @swagger
     * /test:
     *   post:
     *     summary: Cria um novo teste
     *     tags: [Test]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *     responses:
     *       201:
     *         description: Test criado
     *       500:
     *         description: Erro interno
     */
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const query = req.query
            const body = req.body
            const result = this.testService.create(body, query)
            res.status(201).json(result)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }

    /**
     * @swagger
     * /test/{id}:
     *   put:
     *     summary: Atualiza um teste pelo ID
     *     tags: [Test]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do teste
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *     responses:
     *       200:
     *         description: Test atualizado
     *       400:
     *         description: ID inválido ou ausente
     *       500:
     *         description: Erro interno
     */
    public async update(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id
            const query = req.query
            const body = req.body
            if (!id) {
                res.status(400).json({ message: "id is required!" })
                return
            }
            const result = this.testService.update(id, body, query)
            res.status(200).json(result)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }

    /**
     * @swagger
     * /test:
     *   get:
     *     summary: Lista todos os testes
     *     tags: [Test]
     *     responses:
     *       200:
     *         description: Lista retornada
     *       500:
     *         description: Erro interno
     */
    public async read(req: Request, res: Response): Promise<void> {
        try {
            const query = req.query
            const result = this.testService.read(query)
            res.status(200).json(result)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }

    /**
     * @swagger
     * /test/{id}:
     *   get:
     *     summary: Busca um teste pelo ID
     *     tags: [Test]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do teste
     *     responses:
     *       200:
     *         description: Test encontrado
     *       400:
     *         description: ID inválido ou ausente
     *       500:
     *         description: Erro interno
     */
    public async readOne(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id
            const query = req.query
            if (!id) {
                res.status(400).json({ message: "id is required!" })
                return
            }
            const result = this.testService.readOne(id, query)
            res.status(200).json(result)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }

    /**
     * @swagger
     * /test/{id}:
     *   delete:
     *     summary: Deleta um teste pelo ID
     *     tags: [Test]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do teste
     *     responses:
     *       204:
     *         description: Test removido
     *       500:
     *         description: Erro interno
     */
    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id
            const query = req.query
            const result = this.testService.delete(id, query)
            res.status(204).json(result)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }

    public async __test__(_: Request, res: Response) {
        try {
            const testService = this.testService.__test__()
            if (testService) {
                res.sendStatus(200)
                return
            } else {
                res.sendStatus(500)
                return
            }
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }
}

export default TestController