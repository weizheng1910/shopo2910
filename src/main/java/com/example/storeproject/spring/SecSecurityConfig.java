package com.example.storeproject.spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@Profile("!https")
public class SecSecurityConfig extends WebSecurityConfigurerAdapter {

    public SecSecurityConfig() {
        super();
    }
    
    @Qualifier("userDetailsServiceImpl")
    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // @formatter:off
        http
        .csrf().disable()
        .authorizeRequests()
 
        .antMatchers("/api/**").permitAll()//delete
        .antMatchers("/users/**").permitAll()//delete
        .antMatchers("/checkouts/**").permitAll()//delete
        .antMatchers("/create-payment-intent").permitAll()//delete
        .antMatchers("/newAccount").permitAll()
        .antMatchers("/register").permitAll()
        //.antMatchers("/carts").permitAll()
        .antMatchers("/").permitAll()
        .antMatchers("/products").permitAll()
        .antMatchers("/dist/**").permitAll()
        //.antMatchers("/admin/**").hasAuthority("ADMIN")
        .antMatchers("/admin/**").hasRole("ADMIN")
        .antMatchers("/anonymous*").anonymous()
        .antMatchers(HttpMethod.GET, "/index*", "/static/**", "/*.js", "/*.json", "/*.ico").permitAll()
        .anyRequest().authenticated()
        .and()
        .formLogin()
        .loginPage("/").permitAll()
        .loginProcessingUrl("/perform_login")
        .defaultSuccessUrl("/dashboard",true)
        .failureUrl("/nay.html")
        .and()
        .logout()
        .logoutUrl("/perform_logout")
        .deleteCookies("JSESSIONID");
        // @formatter:on
    }
    
    @Bean
    public AuthenticationManager customAuthenticationManager() throws Exception {
        return authenticationManager();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    	auth.inMemoryAuthentication()
        .withUser("user1").password(bCryptPasswordEncoder().encode("user1Pass")).roles("USER")
        .and()
        .withUser("x").password(bCryptPasswordEncoder().encode("x")).roles("USER")
        .and()
        .withUser("admin").password(bCryptPasswordEncoder().encode("admin0Pass")).roles("ADMIN");
    	
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
    }


}