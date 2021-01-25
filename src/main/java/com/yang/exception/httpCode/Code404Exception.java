package com.yang.exception.httpCode;

/**
 * @auther YF
 * @create 2021-01-08-11:07
 */
public class Code404Exception extends BusException {
    public Code404Exception(String msg) {
        super(404, msg);
    }

    public Code404Exception() {
        this("资源找不到");
    }
}
