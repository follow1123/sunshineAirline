package com.yang.dao;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

/**
 * @auther YF
 * @create 2020-11-01-20:04
 */
public class CityMapperTest {


    private CityMapper cityMapper;

    @Before
    public void before(){
        cityMapper = new ClassPathXmlApplicationContext("spring/applicationContext.xml")
        .getBean("cityMapper", CityMapper.class);
    }

    @Test
    public void testGetCityNames(){
        List<String> cityNames = cityMapper.getCityNames();
        cityNames.forEach(System.out::println);
        System.out.println("size = " + cityNames.size());
    }

    @Test
    public void testGetIATACode(){
        List<String> iataCode = cityMapper.getIATACode();
        iataCode.forEach(System.out::println);
        System.out.println("size = " + iataCode.size());
    }


}
