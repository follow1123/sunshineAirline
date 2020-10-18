package com.yang.service;

import com.yang.pojo.Users;

/**
 * @auther YF
 * @create 2020-08-23-14:52
 */
public interface UserService {
    Users verification(String email, String password);
}
