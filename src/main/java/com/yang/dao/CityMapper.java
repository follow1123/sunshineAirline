package com.yang.dao;

import java.util.List;

/**
 * @auther YF
 * @create 2020-09-01-19:56
 */
public interface CityMapper {
    List<String> getCityNames();
    List<String> getIATACode();
}
