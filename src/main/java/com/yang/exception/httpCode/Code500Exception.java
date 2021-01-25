package com.yang.exception.httpCode;

/**
 * @auther YF
 * @create 2021-01-08-11:08
 */
public class Code500Exception extends BusException {
    public Code500Exception(String msg) {
        super(500, msg);
    }

    public Code500Exception() {
        this("服务器异常");
    }
}
