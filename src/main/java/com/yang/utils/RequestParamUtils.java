package com.yang.utils;

import com.yang.exception.httpCode.Code400Exception;

/**
 * @auther YF
 * @create 2021-01-08-10:37
 */
public class RequestParamUtils {
    public static void notNoll(Object... params){
        for (Object param : params) {
            if (param == null) throw new Code400Exception();
        }
    }
}
