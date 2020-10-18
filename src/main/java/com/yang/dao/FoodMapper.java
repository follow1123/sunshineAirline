package com.yang.dao;

import com.yang.pojo.Flightfood;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @auther YF
 * @create 2020-10-08-18:54
 */
public interface FoodMapper {
    List<Flightfood> getFood(@Param("id") Integer id);
}
