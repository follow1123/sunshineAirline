package com.yang.dao;

import com.yang.pojo.Users;

import java.util.List;

/**
 * @auther YF
 * @create 2020-08-23-14:35
 */
public interface UserMapper {
    Users getUser(String email, String password);

    List<Users> getAllUser();
}
