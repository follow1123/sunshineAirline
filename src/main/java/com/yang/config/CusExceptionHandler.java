package com.yang.config;

import com.yang.exception.httpCode.BusException;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * @auther YF
 * @create 2021-01-08-8:53
 */
@Component
public class CusExceptionHandler implements HandlerExceptionResolver {
    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object o, Exception e) {
        System.out.println(o);
        e.printStackTrace();
        ModelAndView view = new ModelAndView(new MappingJackson2JsonView());
        view.addObject("timestamp", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(LocalDateTime.now()));
        view.addObject("url", request.getRequestURI());
        if (e instanceof BusException) {
            view.addObject("code", ((BusException) e).getCode());
        } else {
            view.addObject("code", 500);
        }
        view.addObject("message", e.getMessage());
        return view;
    }

}
