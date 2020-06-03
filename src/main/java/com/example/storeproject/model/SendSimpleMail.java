package com.example.storeproject.model;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import com.example.storeproject.spring.AppConfig;

public class SendSimpleMail {

	public static void sendMail(User user, String emailContent) throws MessagingException {
		AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
		ctx.register(AppConfig.class);
		ctx.refresh();
		JavaMailSenderImpl mailSender = ctx.getBean(JavaMailSenderImpl.class);
		MimeMessage mimeMessage = mailSender.createMimeMessage();
		MimeMessageHelper mailMsg = new MimeMessageHelper(mimeMessage, true);
		mailMsg.setFrom("shopo2910@gmail.com");
		mailMsg.setTo(user.getEmail());
		mailMsg.setSubject("Purchase Receipt");

		mailMsg.setText(emailContent, true);
		mailSender.send(mimeMessage);
		System.out.println("---Done---");
	}
}