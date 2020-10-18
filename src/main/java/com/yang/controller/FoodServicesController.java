package com.yang.controller;

import com.yang.service.impl.FoodServicesServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import static com.yang.utils.JsonUtils.*;
/**
 * @auther YF
 * @create 2020-10-08-16:33
 */
@RestController
@RequestMapping("/FS")
public class FoodServicesController {

    private FoodServicesServiceImpl foodServicesService;
    @Autowired
    @Qualifier("foodServicesServiceImpl")
    public void setFoodServicesService(FoodServicesServiceImpl foodServicesService) {
        this.foodServicesService = foodServicesService;
    }

    @RequestMapping("/flightInfo")
    public String flightInfo(String idType, String idTypeNumber){
        if (idType == null || idTypeNumber == null){
            return pack(404, "");
        }
        System.out.println("进入flightInfo");
        return pack(()->foodServicesService.getFlightInfo(idType, idTypeNumber));
    }
    @RequestMapping("/food")
    public String foodInfo(Integer id){
        return pack(()->foodServicesService.getFood(id));
    }
}
