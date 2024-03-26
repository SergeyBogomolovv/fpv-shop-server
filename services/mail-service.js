import nodemailer from 'nodemailer'

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'geraxfn@gmail.com',
        pass: 'rvsm epcq nzcf obmm',
      },
      secure: false,
    })
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject: `Активация пользователя`,
      text: '',
      html: `
          <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href=${link}>ссылка</a>
          </div>
      `,
    })
  }
  async sendOrderMail(to, message, addres, product, price) {
    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject: `У вас новый заказ`,
      text: '',
      html: `
          <div>
            <h1>Новый заказ</h1>
            <p>${message}</p>
            <h2>Товар: ${product}</h2>
            <p>Сумма: ${price}$</p>
            <p>Адрес: ${addres}</p>
          </div>
      `,
    })
  }
}
export default new MailService()
