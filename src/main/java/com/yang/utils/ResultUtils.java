package com.yang.utils;

import com.alibaba.fastjson.JSON;
import com.yang.exception.httpCode.Code404Exception;
import com.yang.exception.httpCode.Code500Exception;

import java.net.URLEncoder;
import java.util.concurrent.Callable;

import static com.yang.utils.JacksonUtils.*;

/**
 * @auther YF
 * @create 2021-01-08-10:45
 */
public class ResultUtils {

    public static String pack(Callable<?> event) {
        try {
            Object call = event.call();
            if (call == null) throw new Code404Exception();
            return stringify(new Result(call));
        } catch (Exception e) {
            throw new Code500Exception(e.getMessage());
        }
    }


    /**
     * json固定格式
     */
    private static class Result {
        private int code;
        private Object content;

        public Result() {
        }

        public Result(int code) {
            this(code, "");
        }

        public Result(Object content) {
            this(200, content);
        }

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
