package com.yang.dao;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @auther YF
 * @create 2020-11-01-20:04
 */
public class MapperTest {


    private CityMapper cityMapper;

    private UnionMapper unionMapper;

    private ScheduleMapper scheduleMapper;

    @Before
    public void before() {
        ApplicationContext context = new ClassPathXmlApplicationContext("spring/applicationContext.xml");
        cityMapper = context.getBean("cityMapper", CityMapper.class);
        unionMapper = context.getBean("unionMapper", UnionMapper.class);
        scheduleMapper = context.getBean("scheduleMapper", ScheduleMapper.class);

    }

    @Test
    public void testGetCityNames() {
        List<String> cityNames = cityMapper.getCityNames();
        cityNames.forEach(System.out::println);
        System.out.println("size = " + cityNames.size());
    }

    @Test
    public void testGetIATACode() {
        List<String> iataCode = cityMapper.getIATACode();
        iataCode.forEach(System.out::println);
        System.out.println("size = " + iataCode.size());
    }


    @Test
    public void test01() {
        List<Map<String, Object>> allSeat = unionMapper.getSeats(280, false);
        System.out.println(JSON.toJSONString(allSeat));
        allSeat.forEach(val -> {
            val.forEach((k, v) -> {
                System.out.println(k);
                if (v instanceof String){
                    System.out.println(v);
                }else if (v instanceof List){
                    ((List)v ).forEach(System.out::println);
                }
            });
        });
    }
    @Test
    public void test02() throws JsonProcessingException {
        System.out.println(scheduleMapper.getScheduleInfoById(280));
//        ObjectMapper mapper = new ObjectMapper();
//        String s = mapper.writeValueAsString(new HashMap<String, Object>() {{
//            put("name", "张三");
//            put("age", 18);
//        }});
//        System.out.println(s);
    }

}
