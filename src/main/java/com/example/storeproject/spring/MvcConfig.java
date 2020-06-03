package com.example.storeproject.spring;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

@Configuration
@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer {

	public MvcConfig() {
		super();
	}

	private static final String[] CLASSPATH_RESOURCE_LOCATIONS = { "classpath:/META-INF/resources/",
			"classpath:/resources/", "classpath:/static/", "classpath:/public/", "classpath:/WEB-INF" };

	@Override
	public void addViewControllers(final ViewControllerRegistry registry) {
		registry.addViewController("/register").setViewName("forward:/view/register.html");
		registry.addViewController("/").setViewName("forward:/view/index.html");
		registry.addViewController("/dashboard").setViewName("forward:/view/dashboard.html");
		registry.addViewController("/admin/page").setViewName("forward:/view/admin.html");
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {

		registry.addResourceHandler("/**").addResourceLocations(CLASSPATH_RESOURCE_LOCATIONS);

		// String filePathToView =
		// "file:///C:/Users/weizheng/projectsGA/store-project/store-project/src/main/resources/static/view/";
		// String filePathToDist =
		// "file:///C:/Users/weizheng/projectsGA/store-project/store-project/src/main/resources/static/dist/";

		// registry.addResourceHandler("/**").addResourceLocations(filePathToView);
		// registry.addResourceHandler("/dist/**").addResourceLocations(filePathToDist);
		// registry.addResourceHandler("/*.js").addResourceLocations(filePathToView);

	}
	
	// Allow views to be seen
	@Bean
	public ViewResolver viewResolver() {
		final InternalResourceViewResolver bean = new InternalResourceViewResolver();

		

		return bean;
	}

}