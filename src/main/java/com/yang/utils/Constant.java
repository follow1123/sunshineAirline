package com.yang.utils;

import java.util.HashMap;
import java.util.Map;

/**
 * @auther YF
 * @create 2020-08-24-20:16
 */
public class Constant {
    public static final String LOGGED_FLAG = "user";

    public static final Map<String, String> OFFICE_USER_TITLES = new HashMap<String, String>() {
        {
            put("Search Flights", "/SearchFlight");
            put("Food Services", "/FoodServices");
            put("Flight Status", "/FlightStatusInfo");
        }
    };
    public static final Map<String, String> ADMINISTRATOR_TITLES = new HashMap<String, String>() {
        {
            put("Flight Schedule Management", "");
            put("Ticket Statistics", "");
            put("User Management", "");
            put("Login Record", "");
        }
    };
}
