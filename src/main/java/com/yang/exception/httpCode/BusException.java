package com.yang.exception.httpCode;

/**
 * @auther YF
 * @create 2021-01-08-8:58
 */
public class BusException extends RuntimeException {
    private int code;
    private String msg;

    public BusException(int code, String msg) {
        super(msg);
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
