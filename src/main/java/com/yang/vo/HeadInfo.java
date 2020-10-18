package com.yang.vo;

import java.util.Map;

/**
 * @auther YF
 * @create 2020-08-24-20:26
 */
public class HeadInfo {
    String head;
    Map<String, String> titles;
    String username;

    public HeadInfo(String head, Map<String, String> titles, String username) {
        this.head = head;
        this.titles = titles;
        this.username = username;
    }

    public String getHead() {
        return head;
    }

    public Map<String, String> getTitles() {
        return titles;
    }

    public void setTitles(Map<String, String> titles) {
        this.titles = titles;
    }

    public void setHead(String head) {
        this.head = head;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
