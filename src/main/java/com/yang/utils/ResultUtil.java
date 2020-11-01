package com.yang.utils;

import com.alibaba.fastjson.JSON;

import java.util.List;
import java.util.concurrent.Callable;

/**
 * @auther YF
 * @create 2020-10-05-14:51
 * json工具对fastjson进行封装
 */
public class ResultUtil {
    /**
     * 将内容和code封装成固定的json格式
     * @param code
     * @param content
     * @return
     */
    public static String pack(int code, Object content){
        return JSON.toJSONString(new Result(code, content));
    }

    /**
     * 返表示请求语法错误
     * @return
     */
    public static String packBadRequest(){
        return pack(400, "Bad Request");
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
            if ((result instanceof List && ((List)result).size() == 0) || result == null){
                code = 404;
            }
        }catch (Exception e){
            System.out.println(e.getMessage());;
            code = 500;
        }
        return pack(code, result);
    }

    /**
     * json固定格式
     */
    private static class Result {
        private int code;
        private Object content;

        public Result(int code, Object content) {
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
