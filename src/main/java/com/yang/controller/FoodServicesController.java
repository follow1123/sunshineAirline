package com.yang.controller;

import com.yang.pojo.Flightfoodreservation;
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

    private FoodServicesServiceImpl foodServicesService;

    private ReservationServiceImpl reservationService;

    @Autowired
    @Qualifier("reservationServiceImpl")
    public void setReservationService(ReservationServiceImpl reservationService) {
        this.reservationService = reservationService;
    }

    @Autowired
    @Qualifier("foodServicesServiceImpl")
    public void setFoodServicesService(FoodServicesServiceImpl foodServicesService) {
        this.foodServicesService = foodServicesService;
    }

    @RequestMapping("/flightInfo")
    public String flightInfo(String idType, String idTypeNumber) {
        if (idType == null || idTypeNumber == null) {
            return pack(404, "");
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
            return pack(400, "");
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
