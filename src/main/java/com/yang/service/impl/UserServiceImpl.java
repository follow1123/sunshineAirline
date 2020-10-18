package com.yang.service.impl;

import com.yang.dao.UserMapper;
import com.yang.pojo.Users;
import com.yang.service.UserService;

/**
 * @auther YF
 * @create 2020-08-23-14:56
 */
//@Service
public class UserServiceImpl implements UserService {

    private UserMapper userMapper;
//    @Autowired
//    @Qualifier("userMapper")
    public void setUserMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public Users verification(String email, String password) {
        return userMapper.getUser(email, password);
    }
}
