package com.yang.exception.httpCode;

/**
 * @auther YF
 * @create 2021-01-08-11:05
 */
public class Code400Exception extends BusException {

    public Code400Exception(String msg) {
        super(400, msg);
    }

    public Code400Exception() {
        this("请求参数错误");
    }

}
