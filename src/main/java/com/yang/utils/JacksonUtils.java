package com.yang.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @auther YF
 * @create 2021-01-08-11:18
 */
public class JacksonUtils {
    public static ObjectMapper getMapper() {
        return new ObjectMapper();
    }

    public static String stringify(Object o) throws JsonProcessingException {
        return getMapper().writeValueAsString(o);
    }
}
