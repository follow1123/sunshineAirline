package com.yang.utils;

import com.alibaba.fastjson.JSON;

import java.util.List;
import java.util.concurrent.Callable;

/**
 * @auther YF
 * @create 2020-10-05-14:51
 * json工具对fastjson进行封装
 */
public class JsonUtils {
    /**
     * 将内容和code封装成固定的json格式
     * @param code
     * @param content
     * @return
     */
    public static String pack(int code, Object content){
        return JSON.toJSONString(new JsonPackage(code, content));
    }

    /**
     * 根据事件自动判断code生成固定的json格式
     * @param event
     * @return
     */
    public static String pack(Callable<Object> event){
        int code = 200;
        Object result = null;
        try {
            result = event.call();
        }catch (Exception e){
            code = 500;
        }finally {
            if (result instanceof List && ((List)result).size() == 0){
                code = 404;
            }
        }
        return pack(code, result);
    }

    /**
     * json固定格式
     */
    private static class JsonPackage{
        private int code;
        private Object content;

        public JsonPackage(int code, Object content) {
            this.code = code;
            this.content = content;
        }

        public int getCode() {
            return code;
        }

        public void setCode(int code) {
            this.code = code;
        }

        public Object getContent() {
            return content;
        }

        public void setContent(Object content) {
            this.content = content;
        }
    }
}
