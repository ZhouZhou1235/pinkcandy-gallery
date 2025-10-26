// 邮件模块

import nodemailer from 'nodemailer'
import config from '../config.js';

export const transporter = nodemailer.createTransport(config.MAILER_transport);

// 发送邮件
export async function sendAMail(who='',content='',subject='PINKCANDY MAILER'){
    try{
        let option = {
            from: config.MAILER_transport.auth.user,
            to: who,
            html: content,
            subject: subject,
        }
        return await transporter.sendMail(option);
    }
    catch(e){console.log(e);}
}
