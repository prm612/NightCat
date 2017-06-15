import mailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import async from 'async'
import config from '../config'
import logger from './logger'
import opn from 'opn'

let transporter = mailer.createTransport(smtpTransport(config.mail_opts))

/**
 * Send an email
 * @param {Object} data 邮件对象
 */
export const sendMail = async(data, link) => {
	let success = false
	await	transporter.sendMail(data)
	.then((res) => {
		success = true
		logger.info('发送邮件成功', data)
	})
	.catch((err) => {
		logger.error('发送邮件失败', err, data);
	})

	return success
}

/*  发送激活通知邮件  */
export const sendActiveMail = async(link, who, account) => {
	let from = config.mail_opts.auth.user
	let to = who
	let subject = config.name + '账号激活'
	let html = `
	<style>
		.my-article {
			font-family: 'Montserrat', 'Segoe UI', 'Microsoft Yahei', Helvetica, Arial;
			border: 1px solid #f05b72;
			margin: 0;
			padding: 0;
		}

		.my-article h1 {
			width: 100%;
			padding: 10px 0;
			margin: 0;
			background-color: #f05b72;
			color: #fff;
			text-align: center;
		}
		.my-article h1 a {
			text-decoration: none;
			color: #fff;
		}
		.my-article p {
			padding: 20px;
			font-size: 14px;
			color: #3498db;
		}
		.miao {
			position: relative;
			text-align: center;
			height: 420px;
			display: block;
	    text-indent: 10000px;
	    white-space: nowrap;
		}
		.miao::after {
			content: '';
			width: 0;
			height: 0;
			position: absolute;
			left: 10px;
			top: 10px;
			box-shadow: 180px 0px 0 10px #130c0e,200px 0px 0 10px #130c0e,220px 0px 0 10px #130c0e,240px 0px 0 10px #130c0e,260px 0px 0 10px #130c0e,280px 0px 0 10px #130c0e,300px 0px 0 10px #130c0e,320px 0px 0 10px #130c0e,340px 0px 0 10px #130c0e,360px 0px 0 10px #130c0e,380px 0px 0 10px #130c0e,400px 0px 0 10px #130c0e,420px 0px 0 10px #130c0e,440px 0px 0 10px #130c0e,460px 0px 0 10px #130c0e,480px 0px 0 10px #130c0e,500px 0px 0 10px #130c0e,520px 0px 0 10px #130c0e,160px 20px 0 10px #130c0e,180px 20px 0 10px rgba(203,165,125,255),200px 20px 0 10px rgba(203,165,125,255),220px 20px 0 10px rgba(203,165,125,255),240px 20px 0 10px rgba(203,165,125,255),260px 20px 0 10px rgba(203,165,125,255),280px 20px 0 10px rgba(203,165,125,255),300px 20px 0 10px rgba(203,165,125,255),320px 20px 0 10px rgba(203,165,125,255),340px 20px 0 10px rgba(203,165,125,255),360px 20px 0 10px rgba(203,165,125,255),380px 20px 0 10px rgba(203,165,125,255),400px 20px 0 10px rgba(203,165,125,255),420px 20px 0 10px rgba(203,165,125,255),440px 20px 0 10px rgba(203,165,125,255),460px 20px 0 10px rgba(203,165,125,255),480px 20px 0 10px rgba(203,165,125,255),500px 20px 0 10px rgba(203,165,125,255),520px 20px 0 10px rgba(203,165,125,255),540px 20px 0 10px #130c0e,140px 40px 0 10px rgba(4,7,7,255),160px 40px 0 10px rgba(253,204,153,255),180px 40px 0 10px rgba(253,204,153,255),200px 40px 0 10px rgba(253,204,153,255),220px 40px 0 10px rgba(255,153,255,255),240px 40px 0 10px rgba(255,153,255,255),260px 40px 0 10px rgba(255,153,255,255),280px 40px 0 10px rgba(255,153,255,255),300px 40px 0 10px rgba(255,153,255,255),320px 40px 0 10px rgba(255,153,255,255),340px 40px 0 10px rgba(255,153,255,255),360px 40px 0 10px rgba(255,153,255,255),380px 40px 0 10px rgba(255,153,255,255),400px 40px 0 10px rgba(255,153,255,255),420px 40px 0 10px rgba(255,153,255,255),440px 40px 0 10px rgba(255,153,255,255),460px 40px 0 10px rgba(255,153,255,255),480px 40px 0 10px rgba(255,152,255,255),500px 40px 0 10px rgba(253,204,153,255),520px 40px 0 10px rgba(253,204,153,255),540px 40px 0 10px rgba(255,206,155,255),560px 40px 0 10px rgba(1,1,1,255),140px 60px 0 10px rgba(4,7,7,255),160px 60px 0 10px rgba(253,204,153,255),180px 60px 0 10px rgba(253,204,153,255),200px 60px 0 10px rgba(255,153,255,255),220px 60px 0 10px rgba(255,153,255,255),240px 60px 0 10px rgba(255,153,255,255),260px 60px 0 10px rgba(255,153,255,255),280px 60px 0 10px rgba(255,153,255,255),300px 60px 0 10px rgba(255,153,255,255),320px 60px 0 10px rgba(238,50,146,255),340px 60px 0 10px rgba(251,134,232,255),360px 60px 0 10px rgba(255,153,255,255),380px 60px 0 10px rgba(255,154,254,255),400px 60px 0 10px rgba(242,73,171,255),420px 60px 0 10px rgba(255,153,255,255),440px 60px 0 10px rgba(255,153,255,255),460px 60px 0 10px rgba(255,153,255,255),480px 60px 0 10px rgba(255,153,255,255),500px 60px 0 10px rgba(255,150,254,255),520px 60px 0 10px rgba(253,204,153,255),540px 60px 0 10px rgba(253,204,153,255),560px 60px 0 10px rgba(4,7,7,255),140px 80px 0 10px rgba(4,7,7,255),160px 80px 0 10px rgba(253,204,153,255),180px 80px 0 10px rgba(255,157,247,255),200px 80px 0 10px rgba(255,153,255,255),220px 80px 0 10px rgba(238,57,153,255),240px 80px 0 10px rgba(255,153,255,255),260px 80px 0 10px rgba(255,153,255,255),280px 80px 0 10px rgba(255,153,255,255),300px 80px 0 10px rgba(255,153,255,255),320px 80px 0 10px rgba(254,150,252,255),340px 80px 0 10px rgba(255,153,255,255),360px 80px 0 10px rgba(255,153,255,255),380px 80px 0 10px rgba(255,153,255,255),400px 80px 0 10px rgba(255,151,253,255),420px 80px 0 10px rgba(255,153,255,255),440px 80px 0 10px rgba(255,153,255,255),460px 80px 0 10px rgba(255,153,255,255),480px 80px 0 10px rgba(255,153,255,255),500px 80px 0 10px rgba(255,153,255,255),520px 80px 0 10px rgba(255,155,252,255),540px 80px 0 10px rgba(253,204,153,255),560px 80px 0 10px rgba(4,7,7,255),140px 100px 0 10px rgba(4,7,7,255),160px 100px 0 10px rgba(253,204,153,255),180px 100px 0 10px rgba(255,153,255,255),200px 100px 0 10px rgba(255,153,255,255),220px 100px 0 10px rgba(252,140,239,255),240px 100px 0 10px rgba(255,153,255,255),260px 100px 0 10px rgba(255,153,255,255),280px 100px 0 10px rgba(255,153,255,255),300px 100px 0 10px rgba(255,153,255,255),320px 100px 0 10px rgba(255,153,255,255),340px 100px 0 10px rgba(255,153,255,255),360px 100px 0 10px rgba(255,153,255,255),380px 100px 0 10px rgba(255,153,255,255),400px 100px 0 10px rgba(255,154,255,255),420px 100px 0 10px rgba(4,7,7,255),440px 100px 0 10px rgba(4,7,7,255),460px 100px 0 10px rgba(255,154,255,255),480px 100px 0 10px rgba(237,49,146,255),500px 100px 0 10px rgba(255,153,255,255),520px 100px 0 10px rgba(255,153,255,255),540px 100px 0 10px rgba(253,204,153,255),560px 100px 0 10px rgba(4,7,7,255),620px 100px 0 10px rgba(4,7,7,255),640px 100px 0 10px rgba(4,7,7,255),140px 120px 0 10px rgba(4,7,7,255),160px 120px 0 10px rgba(253,204,153,255),180px 120px 0 10px rgba(255,153,255,255),200px 120px 0 10px rgba(255,153,255,255),220px 120px 0 10px rgba(255,153,255,255),240px 120px 0 10px rgba(255,153,255,255),260px 120px 0 10px rgba(255,153,255,255),280px 120px 0 10px rgba(255,153,255,255),300px 120px 0 10px rgba(255,153,255,255),320px 120px 0 10px rgba(255,153,255,255),340px 120px 0 10px rgba(255,153,255,255),360px 120px 0 10px rgba(255,153,255,255),380px 120px 0 10px rgba(253,154,253,255),400px 120px 0 10px rgba(3,5,5,255),420px 120px 0 10px rgba(153,153,153,255),440px 120px 0 10px rgba(153,153,153,255),460px 120px 0 10px rgba(4,7,7,255),480px 120px 0 10px rgba(255,153,255,255),500px 120px 0 10px rgba(255,153,255,255),520px 120px 0 10px rgba(255,153,255,255),540px 120px 0 10px rgba(253,204,153,255),560px 120px 0 10px rgba(4,7,7,255),600px 120px 0 10px rgba(4,7,7,255),620px 120px 0 10px rgba(153,153,153,255),640px 120px 0 10px rgba(153,153,153,255),660px 120px 0 10px rgba(4,7,7,255),140px 140px 0 10px rgba(4,7,7,255),160px 140px 0 10px rgba(253,204,153,255),180px 140px 0 10px rgba(255,153,255,255),200px 140px 0 10px rgba(255,153,255,255),220px 140px 0 10px rgba(255,153,255,255),240px 140px 0 10px rgba(255,153,255,255),260px 140px 0 10px rgba(255,153,255,255),280px 140px 0 10px rgba(255,153,255,255),300px 140px 0 10px rgba(238,54,150,255),320px 140px 0 10px rgba(255,154,255,255),340px 140px 0 10px rgba(255,153,255,255),360px 140px 0 10px rgba(255,153,255,255),380px 140px 0 10px rgba(253,154,253,255),400px 140px 0 10px rgba(3,5,5,255),420px 140px 0 10px rgba(153,153,153,255),440px 140px 0 10px rgba(153,153,153,255),460px 140px 0 10px rgba(153,153,153,255),480px 140px 0 10px rgba(4,7,7,255),500px 140px 0 10px rgba(255,153,255,255),520px 140px 0 10px rgba(255,153,255,255),540px 140px 0 10px rgba(253,204,153,255),560px 140px 0 10px rgba(4,7,7,255),580px 140px 0 10px rgba(4,7,7,255),600px 140px 0 10px rgba(153,153,153,255),620px 140px 0 10px rgba(153,153,153,255),640px 140px 0 10px rgba(153,153,153,255),660px 140px 0 10px rgba(4,7,7,255),40px 160px 0 10px rgba(3,5,5,255),60px 160px 0 10px rgba(3,5,5,255),140px 160px 0 10px rgba(4,7,7,255),160px 160px 0 10px rgba(253,204,153,255),180px 160px 0 10px rgba(255,153,255,255),200px 160px 0 10px rgba(255,153,255,255),220px 160px 0 10px rgba(255,153,255,255),240px 160px 0 10px rgba(255,153,255,255),260px 160px 0 10px rgba(255,153,255,255),280px 160px 0 10px rgba(255,153,255,255),300px 160px 0 10px rgba(255,153,255,255),320px 160px 0 10px rgba(255,153,255,255),340px 160px 0 10px rgba(255,153,255,255),360px 160px 0 10px rgba(255,153,255,255),380px 160px 0 10px rgba(253,154,253,255),400px 160px 0 10px rgba(3,5,5,255),420px 160px 0 10px rgba(153,153,153,255),440px 160px 0 10px rgba(153,153,153,255),460px 160px 0 10px rgba(153,153,153,255),480px 160px 0 10px rgba(153,153,153,255),500px 160px 0 10px rgba(4,7,7,255),520px 160px 0 10px rgba(4,7,7,255),540px 160px 0 10px rgba(4,7,7,255),560px 160px 0 10px rgba(4,7,7,255),580px 160px 0 10px rgba(153,153,153,255),600px 160px 0 10px rgba(153,153,153,255),620px 160px 0 10px rgba(153,153,153,255),640px 160px 0 10px rgba(153,153,153,255),660px 160px 0 10px rgba(4,7,7,255),20px 180px 0 10px #130c0e,40px 180px 0 10px rgba(139,139,139,255),60px 180px 0 10px rgba(139,139,139,255),80px 180px 0 10px #130c0e,140px 180px 0 10px rgba(4,7,7,255),160px 180px 0 10px rgba(253,204,153,255),180px 180px 0 10px rgba(255,153,255,255),200px 180px 0 10px rgba(255,153,255,255),220px 180px 0 10px rgba(255,153,255,255),240px 180px 0 10px rgba(238,54,150,255),260px 180px 0 10px rgba(255,153,255,255),280px 180px 0 10px rgba(255,153,255,255),300px 180px 0 10px rgba(255,153,255,255),320px 180px 0 10px rgba(255,153,255,255),340px 180px 0 10px rgba(255,153,255,255),360px 180px 0 10px rgba(255,153,255,255),380px 180px 0 10px rgba(253,154,253,255),400px 180px 0 10px rgba(3,5,5,255),420px 180px 0 10px rgba(153,153,153,255),440px 180px 0 10px rgba(153,153,153,255),460px 180px 0 10px rgba(153,153,153,255),480px 180px 0 10px rgba(153,153,153,255),500px 180px 0 10px rgba(153,153,153,255),520px 180px 0 10px rgba(153,153,153,255),540px 180px 0 10px rgba(153,153,153,255),560px 180px 0 10px rgba(153,153,153,255),580px 180px 0 10px rgba(153,153,153,255),600px 180px 0 10px rgba(153,153,153,255),620px 180px 0 10px rgba(153,153,153,255),640px 180px 0 10px rgba(153,153,153,255),660px 180px 0 10px rgba(4,7,7,255),20px 200px 0 10px rgba(4,7,7,255),40px 200px 0 10px rgba(153,153,153,255),60px 200px 0 10px rgba(153,153,153,255),80px 200px 0 10px rgba(4,7,7,255),100px 200px 0 10px rgba(4,7,7,255),120px 200px 0 10px rgba(4,7,7,255),140px 200px 0 10px rgba(4,7,7,255),160px 200px 0 10px rgba(253,204,153,255),180px 200px 0 10px rgba(255,153,255,255),200px 200px 0 10px rgba(255,153,255,255),220px 200px 0 10px rgba(255,153,255,255),240px 200px 0 10px rgba(255,153,255,255),260px 200px 0 10px rgba(255,153,255,255),280px 200px 0 10px rgba(255,153,255,255),300px 200px 0 10px rgba(255,153,255,255),320px 200px 0 10px rgba(237,48,145,255),340px 200px 0 10px rgba(248,119,216,255),360px 200px 0 10px rgba(208,125,208,255),380px 200px 0 10px rgba(3,3,3,255),400px 200px 0 10px rgba(153,153,153,255),420px 200px 0 10px rgba(153,153,153,255),440px 200px 0 10px rgba(153,153,153,255),460px 200px 0 10px rgba(153,153,153,255),480px 200px 0 10px rgba(153,153,153,255),500px 200px 0 10px rgba(153,153,153,255),520px 200px 0 10px rgba(153,153,153,255),540px 200px 0 10px rgba(153,153,153,255),560px 200px 0 10px rgba(153,153,153,255),580px 200px 0 10px rgba(153,153,153,255),600px 200px 0 10px rgba(153,153,153,255),620px 200px 0 10px rgba(153,153,153,255),640px 200px 0 10px rgba(153,153,153,255),660px 200px 0 10px rgba(153,153,153,255),680px 200px 0 10px rgba(2,3,3,255),20px 220px 0 10px rgba(253,253,253,255),40px 220px 0 10px rgba(2,2,2,255),60px 220px 0 10px rgba(153,153,153,255),80px 220px 0 10px rgba(153,153,153,255),100px 220px 0 10px rgba(153,153,153,255),120px 220px 0 10px rgba(153,153,153,255),140px 220px 0 10px rgba(4,7,7,255),160px 220px 0 10px rgba(253,204,153,255),180px 220px 0 10px rgba(255,153,255,255),200px 220px 0 10px rgba(238,54,150,255),220px 220px 0 10px rgba(255,153,255,255),240px 220px 0 10px rgba(255,153,255,255),260px 220px 0 10px rgba(255,153,255,255),280px 220px 0 10px rgba(255,153,255,255),300px 220px 0 10px rgba(255,153,255,255),320px 220px 0 10px rgba(255,153,255,255),340px 220px 0 10px rgba(255,153,255,255),360px 220px 0 10px rgba(208,125,208,255),380px 220px 0 10px rgba(3,3,3,255),400px 220px 0 10px rgba(153,153,153,255),420px 220px 0 10px rgba(153,153,153,255),440px 220px 0 10px rgba(153,153,153,255),480px 220px 0 10px rgba(0,0,0,255),500px 220px 0 10px rgba(153,153,153,255),520px 220px 0 10px rgba(153,153,153,255),540px 220px 0 10px rgba(153,153,153,255),560px 220px 0 10px rgba(153,153,153,255),580px 220px 0 10px rgba(153,153,153,255),620px 220px 0 10px rgba(4,7,7,255),640px 220px 0 10px rgba(153,153,153,255),660px 220px 0 10px rgba(153,153,153,255),680px 220px 0 10px rgba(2,3,3,255),40px 240px 0 10px rgba(250,250,250,255),60px 240px 0 10px rgba(13,13,13,255),80px 240px 0 10px rgba(13,13,13,255),100px 240px 0 10px rgba(153,153,153,255),120px 240px 0 10px rgba(153,153,153,255),140px 240px 0 10px rgba(4,7,7,255),160px 240px 0 10px rgba(253,204,153,255),180px 240px 0 10px rgba(255,153,255,255),200px 240px 0 10px rgba(254,147,247,255),220px 240px 0 10px rgba(255,153,255,255),240px 240px 0 10px rgba(255,153,255,255),260px 240px 0 10px rgba(255,153,255,255),280px 240px 0 10px rgba(255,153,255,255),300px 240px 0 10px rgba(255,153,255,255),320px 240px 0 10px rgba(255,153,255,255),340px 240px 0 10px rgba(255,153,255,255),360px 240px 0 10px rgba(208,125,208,255),380px 240px 0 10px rgba(3,3,3,255),400px 240px 0 10px rgba(153,153,153,255),420px 240px 0 10px rgba(153,153,153,255),440px 240px 0 10px rgba(153,153,153,255),460px 240px 0 10px rgba(0,0,0,255),480px 240px 0 10px rgba(0,0,0,255),500px 240px 0 10px rgba(153,153,153,255),520px 240px 0 10px rgba(153,153,153,255),540px 240px 0 10px rgba(153,153,153,255),560px 240px 0 10px rgba(4,7,7,255),580px 240px 0 10px rgba(153,153,153,255),600px 240px 0 10px rgba(4,7,7,255),620px 240px 0 10px rgba(4,7,7,255),640px 240px 0 10px rgba(153,153,153,255),660px 240px 0 10px rgba(153,153,153,255),680px 240px 0 10px rgba(2,3,3,255),100px 260px 0 10px rgba(2,3,3,255),120px 260px 0 10px rgba(2,3,3,255),140px 260px 0 10px rgba(4,7,7,255),160px 260px 0 10px rgba(253,204,153,255),180px 260px 0 10px rgba(255,153,255,255),200px 260px 0 10px rgba(255,153,255,255),220px 260px 0 10px rgba(255,153,255,255),240px 260px 0 10px rgba(255,153,255,255),260px 260px 0 10px rgba(255,153,255,255),280px 260px 0 10px rgba(238,55,151,255),300px 260px 0 10px rgba(255,157,255,255),320px 260px 0 10px rgba(255,153,255,255),340px 260px 0 10px rgba(255,153,255,255),360px 260px 0 10px rgba(208,125,208,255),380px 260px 0 10px rgba(3,3,3,255),400px 260px 0 10px rgba(175,152,153,255),420px 260px 0 10px rgba(245,151,153,255),440px 260px 0 10px rgba(245,151,153,255),460px 260px 0 10px rgba(153,153,153,255),480px 260px 0 10px rgba(153,153,153,255),500px 260px 0 10px rgba(153,153,153,255),520px 260px 0 10px rgba(153,153,153,255),540px 260px 0 10px rgba(153,153,153,255),560px 260px 0 10px rgba(153,153,153,255),580px 260px 0 10px rgba(153,153,153,255),600px 260px 0 10px rgba(153,153,153,255),620px 260px 0 10px rgba(153,153,153,255),640px 260px 0 10px rgba(245,151,153,255),660px 260px 0 10px rgba(245,151,153,255),680px 260px 0 10px rgba(2,3,3,255),140px 280px 0 10px rgba(4,7,7,255),160px 280px 0 10px rgba(253,204,153,255),180px 280px 0 10px rgba(253,204,153,255),200px 280px 0 10px rgba(255,153,255,255),220px 280px 0 10px rgba(238,54,150,255),240px 280px 0 10px rgba(255,154,255,255),260px 280px 0 10px rgba(255,153,255,255),280px 280px 0 10px rgba(255,153,255,255),300px 280px 0 10px rgba(255,153,255,255),320px 280px 0 10px rgba(255,153,255,255),340px 280px 0 10px rgba(255,153,255,255),360px 280px 0 10px rgba(208,125,208,255),380px 280px 0 10px rgba(3,3,3,255),400px 280px 0 10px rgba(175,152,153,255),420px 280px 0 10px rgba(245,151,153,255),440px 280px 0 10px rgba(245,151,153,255),460px 280px 0 10px rgba(153,153,153,255),480px 280px 0 10px rgba(3,6,6,255),500px 280px 0 10px rgba(153,153,153,255),520px 280px 0 10px rgba(153,153,153,255),540px 280px 0 10px rgba(4,7,7,255),560px 280px 0 10px rgba(153,153,153,255),580px 280px 0 10px rgba(153,153,153,255),600px 280px 0 10px rgba(4,7,7,255),620px 280px 0 10px rgba(153,153,153,255),640px 280px 0 10px rgba(245,151,153,255),660px 280px 0 10px rgba(245,151,153,255),680px 280px 0 10px rgba(2,3,3,255),140px 300px 0 10px rgba(4,7,7,255),160px 300px 0 10px rgba(253,204,153,255),180px 300px 0 10px rgba(253,204,153,255),200px 300px 0 10px rgba(253,204,153,255),220px 300px 0 10px rgba(255,153,255,255),240px 300px 0 10px rgba(255,153,255,255),260px 300px 0 10px rgba(255,153,255,255),280px 300px 0 10px rgba(255,153,255,255),300px 300px 0 10px rgba(255,153,255,255),320px 300px 0 10px rgba(255,153,255,255),340px 300px 0 10px rgba(255,153,255,255),360px 300px 0 10px rgba(255,153,255,255),380px 300px 0 10px rgba(253,153,252,255),400px 300px 0 10px rgba(38,38,38,255),420px 300px 0 10px rgba(153,153,153,255),440px 300px 0 10px rgba(153,153,153,255),460px 300px 0 10px rgba(153,153,153,255),480px 300px 0 10px rgba(4,7,7,255),500px 300px 0 10px rgba(4,7,7,255),520px 300px 0 10px rgba(4,7,7,255),540px 300px 0 10px rgba(4,7,7,255),560px 300px 0 10px rgba(4,7,7,255),580px 300px 0 10px rgba(4,7,7,255),600px 300px 0 10px rgba(4,7,7,255),620px 300px 0 10px rgba(153,153,153,255),640px 300px 0 10px rgba(153,153,153,255),660px 300px 0 10px rgba(4,7,7,255),140px 320px 0 10px rgba(4,7,7,255),160px 320px 0 10px rgba(4,7,7,255),180px 320px 0 10px rgba(253,204,153,255),200px 320px 0 10px rgba(253,204,153,255),220px 320px 0 10px rgba(253,204,153,255),240px 320px 0 10px rgba(253,204,153,255),260px 320px 0 10px rgba(253,204,153,255),280px 320px 0 10px rgba(253,204,153,255),300px 320px 0 10px rgba(253,204,153,255),320px 320px 0 10px rgba(253,204,153,255),340px 320px 0 10px rgba(253,204,153,255),360px 320px 0 10px rgba(253,204,153,255),380px 320px 0 10px rgba(253,204,153,255),400px 320px 0 10px rgba(206,168,127,255),420px 320px 0 10px rgba(2,3,3,255),440px 320px 0 10px rgba(153,153,153,255),460px 320px 0 10px rgba(153,153,153,255),480px 320px 0 10px rgba(153,153,153,255),500px 320px 0 10px rgba(153,153,153,255),520px 320px 0 10px rgba(153,153,153,255),540px 320px 0 10px rgba(153,153,153,255),560px 320px 0 10px rgba(153,153,153,255),580px 320px 0 10px rgba(153,153,153,255),600px 320px 0 10px rgba(153,153,153,255),620px 320px 0 10px rgba(153,153,153,255),640px 320px 0 10px rgba(4,7,7,255),120px 340px 0 10px rgba(4,7,7,255),140px 340px 0 10px rgba(153,153,153,255),160px 340px 0 10px rgba(153,153,153,255),180px 340px 0 10px rgba(4,7,7,255),200px 340px 0 10px rgba(4,7,7,255),220px 340px 0 10px rgba(4,7,7,255),240px 340px 0 10px rgba(4,7,7,255),260px 340px 0 10px rgba(4,7,7,255),280px 340px 0 10px rgba(4,7,7,255),300px 340px 0 10px rgba(4,7,7,255),320px 340px 0 10px rgba(4,7,7,255),340px 340px 0 10px rgba(4,7,7,255),360px 340px 0 10px rgba(4,7,7,255),380px 340px 0 10px rgba(4,7,7,255),400px 340px 0 10px rgba(4,7,7,255),420px 340px 0 10px rgba(4,7,7,255),440px 340px 0 10px rgba(4,7,7,255),460px 340px 0 10px rgba(4,7,7,255),480px 340px 0 10px rgba(4,7,7,255),500px 340px 0 10px rgba(4,7,7,255),520px 340px 0 10px rgba(4,7,7,255),540px 340px 0 10px rgba(4,7,7,255),560px 340px 0 10px rgba(4,7,7,255),580px 340px 0 10px rgba(4,7,7,255),600px 340px 0 10px rgba(4,7,7,255),620px 340px 0 10px rgba(4,7,7,255),120px 360px 0 10px rgba(4,7,7,255),140px 360px 0 10px rgba(153,153,153,255),160px 360px 0 10px rgba(153,153,153,255),180px 360px 0 10px rgba(4,7,7,255),220px 360px 0 10px rgba(4,7,7,255),240px 360px 0 10px rgba(153,153,153,255),260px 360px 0 10px rgba(153,153,153,255),280px 360px 0 10px rgba(0,1,1,255),420px 360px 0 10px rgba(127,127,127,255),440px 360px 0 10px rgba(59,59,59,255),460px 360px 0 10px rgba(153,153,153,255),480px 360px 0 10px rgba(153,153,153,255),500px 360px 0 10px rgba(4,7,7,255),540px 360px 0 10px rgba(4,7,7,255),560px 360px 0 10px rgba(153,153,153,255),580px 360px 0 10px rgba(153,153,153,255),600px 360px 0 10px rgba(4,7,7,255),120px 380px 0 10px rgba(4,7,7,255),140px 380px 0 10px rgba(4,7,7,255),160px 380px 0 10px rgba(4,7,7,255),240px 380px 0 10px rgba(4,7,7,255),260px 380px 0 10px rgba(4,7,7,255),280px 380px 0 10px rgba(4,7,7,255),440px 380px 0 10px rgba(210,210,210,255),460px 380px 0 10px rgba(4,7,7,255),480px 380px 0 10px rgba(4,7,7,255),500px 380px 0 10px rgba(4,7,7,255),560px 380px 0 10px rgba(4,7,7,255),580px 380px 0 10px rgba(4,7,7,255),600px 380px 0 10px rgba(4,7,7,255);
		}
	</style>
	<article class="my-article">
		<h1>Hello, ${account}</h1>
		<p>请点击下方的链接，完成账号激活ヽ(≧Д≦)ノ</p>
		<a href="${link}" class="miao">激活链接</a>
	</article>
	`

	return await sendMail({
		from: from,
		to: to,
		subject: subject,
		html: html
	}, link)
}

export default {
	sendMail,
	sendActiveMail,
}