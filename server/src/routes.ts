import express from 'express'
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRopository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot} = req.body;

    const prismaFeedbacksRopository = new PrismaFeedbacksRopository();
    const nodemailerMailAdapater = new NodemailerMailAdapter();

    const submitFeedback = new SubmitFeedbackUseCase(prismaFeedbacksRopository,nodemailerMailAdapater)

    await submitFeedback.execute({
        type,
        comment,
        screenshot,
    });

    return res.status(201).json();
});