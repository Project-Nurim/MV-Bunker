package com.nurim.mvbunker.common.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetails;
    @Autowired private CustomOAuth2UserService customOauth2UserService;
    @Autowired private AuthenticationFailureHandler customFailureHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        // 시큐리티 거치지 않을 곳
        web.ignoring().antMatchers("/content/**", "/img/**", "/css/**", "/js/**",
                "/pic/**").antMatchers("/favicon.ico", "/resources/**", "/error");
    }
    @Override
    public void configure(HttpSecurity security) throws Exception {
        security.csrf().disable();

        security.authorizeRequests() // 인증이 필요한 모든 요청에 대해
                .antMatchers("/home", "/developers", "/user/login", "/user/join", "/user/auth", "/movies/boxoffice", "/movies/genre", "/movies/genreDetail"
                , "/movies/recommendation", "/movies/search", "/review/review", "/review/reviewDetail", "/review/getMovieEvalAvg", "/review/reviewDetailInfiniteScrolling"
                , "/review/getAllReview")
//                .antMatchers("/**") // test 용
                .permitAll() // 위에 애들은 인증이 필요 없다.(모두에게 허용)
                .anyRequest().authenticated(); // 그외에는 다 인증 필요
                // .and() 로 바로 연결 가능
        security.formLogin()
                .loginPage("/home")
                .loginProcessingUrl("/user/login")
                .usernameParameter("uid")
                .passwordParameter("upw")
                .defaultSuccessUrl("/home") // 로그인 성공시 갈 곳 *
                .failureHandler(customFailureHandler);	// 실패 핸들러

        security.oauth2Login()
                .loginPage("/user/login")
                .defaultSuccessUrl("/home")
                .failureUrl("/home")
                .userInfoEndpoint() //OAuth 2 로그인 성공 이후 사용자 정보를 가져올 때의 설정들을 담당합니다.
                .userService(customOauth2UserService);

        security.logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/user/logout")) // 로그아웃 요청 주소
                .logoutSuccessUrl("/home")// 로그아웃 성공시 *
                .invalidateHttpSession(true);


    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetails).passwordEncoder(passwordEncoder());
    }
}
