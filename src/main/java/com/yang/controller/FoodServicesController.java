package com.yang.controller;

import com.yang.pojo.Flightfoodreservation;
import com.yang.service.FoodServicesService;
import com.yang.service.impl.FoodServicesServiceImpl;
import com.yang.service.impl.ReservationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.yang.utils.ResultUtil.*;

/**
 * @auther YF
 * @create 2020-10-08-16:33
 */
@RestController
@RequestMapping("/FS")
public class FoodServicesController {

    private FoodServicesService foodServicesService;

    private ReservationServiceImpl reservationService;

    @Autowired
    public FoodServicesController(FoodServicesService foodServicesService, ReservationServiceImpl reservationService) {
        this.foodServicesService = foodServicesService;
        this.reservationService = reservationService;
    }

    @RequestMapping("/flightInfo")
    public String flightInfo(String idType, String idTypeNumber) {
        if (idType == null || idTypeNumber == null) {
            return packBadRequest();
        }
        System.out.println("进入flightInfo");
        return pack(() -> foodServicesService.getFlightInfo(idType, idTypeNumber));
    }

    @RequestMapping("/food")
    public String foodInfo(Integer id) {
        return pack(() -> foodServicesService.getFood(id));
    }

    @RequestMapping("/orderFood")
    public String orderFood(Flightfoodreservation food) {
        if (food == null || food.getReservationId() == 0) {
            return packBadRequest();
        }
        int code = reservationService.setFoodReservation(food) < 0 ? 500 : 200;
        return pack(code, "");
    }

    @RequestMapping("/orderById")
    public String foodOrderByReservationId(String reservationId) {
        if (null == reservationId) {
            return pack(400,"");
        }
        return pack(() -> reservationService.getFoodReservationOrder(Integer.parseInt(reservationId)));
    }

}
