/**
 * 
 */
package com.idrene.emefana.web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * @author iddymagohe
 * @since 1.0
 */
@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {
	
	

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		//registry.addInterceptor(new RequestResponseLogger());
		super.addInterceptors(registry);
	}

	/* (non-Javadoc)
	 * @see org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter#addViewControllers(org.springframework.web.servlet.config.annotation.ViewControllerRegistry)
	 */
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		//registry.addViewController("/providers").setViewName("forward:/app/providers/index.html");
		//registry.addViewController("/providers/assets").setViewName("forward:/app/providers/index.html");
		super.addViewControllers(registry);
	}

	/* (non-Javadoc)
	 * @see org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter#addResourceHandlers(org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry)
	 */
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("providers/assets").addResourceLocations("/app/assets");
		super.addResourceHandlers(registry);
	}
	
	
	

}
