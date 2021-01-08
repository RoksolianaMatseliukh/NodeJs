const EmailTemplates = require('email-templates');
const mailer = require('nodemailer');
const path = require('path');

const {
    appConfigs: {
        ROOT_EMAIL, ROOT_EMAIL_PASS, ROOT_EMAIL_SERVICE, ROOT_EMAIL_FROM
    }
} = require('../../configs');
const { ErrorHandler, customErrors: { WRONG_TEMPLATE_NAME } } = require('../../errors');
const templatesInfo = require('../../email-templates');

const transporter = mailer.createTransport({
    service: ROOT_EMAIL_SERVICE,
    auth: {
        pass: ROOT_EMAIL_PASS,
        user: ROOT_EMAIL
    }
});

const emailTemplates = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const sendMail = async (userMail, action, context) => {
    try {
        const templateInfo = templatesInfo[action];

        if (!templateInfo) {
            throw new ErrorHandler(WRONG_TEMPLATE_NAME.message, WRONG_TEMPLATE_NAME.code);
        }

        const html = await emailTemplates.render(templateInfo.templateName, context);

        return transporter.sendMail({
            from: ROOT_EMAIL_FROM,
            to: userMail,
            subject: templateInfo.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendMail
};
