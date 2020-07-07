const user = "devonsmath@gmail.com";
const pass = "purple42turtle";

const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const options = {
	auth: {
		api_user: user,
		api_key: pass
	}
};
const client = nodemailer.createTransport(sgTransport(options));

const emailActivate = {
	from: user,
	to: user,subject: "LocalHost Account Activated",
	text: `Hello $user, this is a test email to verify that you somewhat (around 3/10) know what you are doing and may not be the worst student in your career field`,
	//html: `Hello<strong> ${user.name}</strong>,
	//<br><br>
	//Your account has been successfully activated!`
};

// Send e-mail object to user
client.sendMail(emailActivate, function(err, info) 
{
	if (err) 
	{
		console.log(err);
	} 
	else 
	{
		console.log("Activiation Message Confirmation -  : " + info.response);
	}
});
//res.json({
//	succeed: true,
//	message: "User has been successfully activated"
//});