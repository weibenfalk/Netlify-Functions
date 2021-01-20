const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
  console.log(event.queryStringParameters);
  const userName = event.queryStringParameters.userName;
  const userEmail = event.queryStringParameters.userEmail;
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();
  console.log(testAccount);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Thomas Weibenfalk" <thomas@example.com>', // sender address
    to: 'coooool@example.com, evencooooler@example.com', // list of receivers
    subject: 'New user registered!', // Subject line
    text: `Name registered: ${userName}, email registered: ${userEmail}`, // plain text body
    html: `<b>New user registered!<br/><br/>Name registered: ${userName}, email registered: ${userEmail}</b>` // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  return {
    statusCode: 200,
    body: JSON.stringify({ previewURL: nodemailer.getTestMessageUrl(info) })
  };
};
