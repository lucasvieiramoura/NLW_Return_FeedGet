import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer  from "nodemailer"

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c3b186c38df7dc",
      pass: "e3e1cf21173fc7"
    }
  });


export class NodemailerMailAdapter implements MailAdapter {
    async sendMail ({subject, body} : SendMailData){
       await transport.sendMail({
       from: "Equipe Feedget <contato@feedget.com>",
        to: 'Lucas Vieira <lucasvieiramoura@gmail.com>',
        subject,
        html: body,
    })
    };
}