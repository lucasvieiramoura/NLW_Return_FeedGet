import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy },
    {sendMail: sendMailSpy },
)

describe('Subimit feedback',()=>{
    it('shoould be able to submit a feedback', async ()=>{
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Exemaple",
            screenshot: 'data:image/png;base64'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('shoould not be able to submit feedback without type', async ()=>{
        await expect(submitFeedback.execute({
            type: "",
            comment: "Exemaple",
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow();
    })

    it('shoould not be able to submit feedback without comment', async ()=>{
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow();
    })

    it('shoould not be able to submit feedback with an invalid screenshot', async ()=>{
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Ta tudo bugado",
            screenshot: 'test.jpg'
        })).rejects.toThrow();
    })
})