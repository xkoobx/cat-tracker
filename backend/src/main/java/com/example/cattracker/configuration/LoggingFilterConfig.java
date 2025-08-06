package com.example.cattracker.configuration;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.nio.charset.StandardCharsets;


@Configuration
public class LoggingFilterConfig {

    @Bean
    public FilterRegistrationBean<LoggingFilter> loggingFilterRegistration() {
        FilterRegistrationBean<LoggingFilter> registrationBean = new FilterRegistrationBean<>();

        registrationBean.setFilter(new LoggingFilter());
        registrationBean.addUrlPatterns("/api/cats/*");
        registrationBean.setOrder(1);

        return registrationBean;
    }

    public static class LoggingFilter implements Filter {

        private static final Logger logger = LoggerFactory.getLogger(LoggingFilter.class);

        @Override
        public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
                throws IOException, ServletException {

            ContentCachingRequestWrapper wrappedRequest = new ContentCachingRequestWrapper((HttpServletRequest) request);
            ContentCachingResponseWrapper wrappedResponse = new ContentCachingResponseWrapper((HttpServletResponse) response);

            long startTime = System.currentTimeMillis();

            try {
                chain.doFilter(wrappedRequest, wrappedResponse);
            } finally {
                long duration = System.currentTimeMillis() - startTime;

                String requestBody = getRequestBody(wrappedRequest);
                String responseBody = getResponseBody(wrappedResponse);

                logger.info("""
                    ➤ HTTP {} {} ({} ms)
                    Request Body: {}
                    ⇦ Response Status: {}
                    Response Body: {}
                    --------------------------------------------
                    """,
                            wrappedRequest.getMethod(),
                            wrappedRequest.getRequestURI(),
                            duration,
                            requestBody,
                            wrappedResponse.getStatus(),
                            responseBody
                );

                wrappedResponse.copyBodyToResponse(); // IMPORTANT: send response back to client
            }
        }

        private String getRequestBody(ContentCachingRequestWrapper request) {
            byte[] buf = request.getContentAsByteArray();
            return buf.length > 0 ? new String(buf, StandardCharsets.UTF_8) : "[empty]";
        }

        private String getResponseBody(ContentCachingResponseWrapper response) {
            byte[] buf = response.getContentAsByteArray();
            return buf.length > 0 ? new String(buf, StandardCharsets.UTF_8) : "[empty]";
        }
    }
}
