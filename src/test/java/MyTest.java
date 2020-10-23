import com.yang.dao.FoodMapper;
import com.yang.dao.ReservationMapper;
import com.yang.dao.UnionMapper;
import com.yang.pojo.Flightfoodreservation;
import com.yang.vo.FlightInfo;
import com.yang.pojo.Flightfood;
import com.yang.vo.Ticket;
import com.yang.utils.PojoUtils;
import org.junit.Test;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @auther YF
 * @create 2020-08-23-14:34
 */
public class MyTest {

    private ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

    @Test
    public void test01() {
        SqlSessionTemplate sqlSession = context.getBean("sqlSession", SqlSessionTemplate.class);
        PojoUtils.initPojo(sqlSession);
    }

    @Test
    public void test02() {
//        UserService userMapper = context.getBean("userServiceImpl", UserService.class);
//
//        for (Users users : userMapper.verification()) {
//            System.out.println(users);
//        }
    }

    @Test
    public void test03() {
        UnionMapper unionMapper = context.getBean("unionMapper", UnionMapper.class);
        String from = "Beijing";
//        String from = null;
//        String to = "Los Angeles";
        String to = null;
//        String date = "2020-01-11";
        String date = null;
        List<Ticket> tickets = unionMapper.getTickets(from, to, date);
        System.out.println(tickets.size());
//        for (Ticket ticket : tickets) {
//            System.out.println(ticket);
//        }
//        Map<String, List<Ticket>> collect = tickets.stream().collect(Collectors.groupingBy(Ticket::getTo));
//        collect.forEach((k, v)->{
//            System.out.println(k +"---"+ Arrays.toString(v.toArray()));
//        });
        List<Ticket> finalListTicket = null;
        if (from == null){
            finalListTicket = getFinalTickets(tickets, date, Ticket::getFrom);
        }else if (to == null){
            finalListTicket = getFinalTickets(tickets, date, Ticket::getTo);
        }else {
            finalListTicket = new ArrayList<>();
            if (date == null){
                List<List<Ticket>> split = splitBy(tickets, Ticket::getDepartureDate);
                for (List<Ticket> ticketList : split) {
                    finalListTicket.add(sameTicket(ticketList));
                }
            }else {
                finalListTicket.add(sameTicket(tickets));
            }
        }
        finalListTicket.forEach(System.out::println);
    }
    private List<Ticket> getFinalTickets(List<Ticket> tics, String date, Function<Ticket, String> fun){
        ArrayList<Ticket> tickets = new ArrayList<>();
        List<List<Ticket>> stringListMap = splitBy(tics, fun);
        if (date == null){
            for (List<Ticket> ticketList : stringListMap) {
                List<List<Ticket>> lists = splitBy(ticketList, Ticket::getDepartureDate);
                for (List<Ticket> list : lists) {
                    tickets.add(sameTicket(list));
                }
            }
        }else {
            for (List<Ticket> ticketList : stringListMap) {
                tickets.add(sameTicket(ticketList));
            }
        }
        return tickets;
    }
    private List<List<Ticket>> splitBy(List<Ticket> tickets, Function<Ticket, String> fun) {
        return new ArrayList<>(tickets.stream().collect(Collectors.groupingBy(fun)).values());
    }

    private Ticket sameTicket(List<Ticket> tickets) {
        int[] cabinType = new int[3];
        tickets.forEach(t -> cabinType[t.getCabinTypeId() - 1]++);

        Ticket ticket = tickets.get(0);

        ticket.setCabinType(cabinType);

        return ticket;
    }

    @Test
    public void test04(){
        UnionMapper unionMapper = context.getBean("unionMapper", UnionMapper.class);

        List<Integer> bookedSeats = unionMapper.getBookedSeats("2020-09-17", 23);
        bookedSeats.forEach(System.out::println);
    }

    @Test
    public void test05(){
        UnionMapper unionMapper = context.getBean("unionMapper", UnionMapper.class);
        List<FlightInfo> passport = unionMapper.getFlightInfo("Pasort", "346912888");
        passport.forEach(System.out::println);
        System.out.println(passport.size());
    }
    @Test
    public void test06(){
        FoodMapper foodMapper = context.getBean("foodMapper", FoodMapper.class);
        List<Flightfood> passport = foodMapper.getFood(3);
        passport.forEach(System.out::println);
        System.out.println(passport.size());
    }
    @Test
    public void test07(){
        ReservationMapper foodMapper = context.getBean("reservationMapper", ReservationMapper.class);
        List<Flightfoodreservation> foodReservationOrder = foodMapper.getFoodReservationOrder(null  );
        foodReservationOrder.forEach(System.out::println);
        System.out.println(foodReservationOrder.size());
//        int i = foodMapper.setFoodReservation(new Flightfoodreservation() {
//            {
//                setReservationId(123);
//                setReservationId(1);
//                setReservationId(11);
//            }
//        });
//        System.out.println(i);
//        int i = foodMapper.deleteFoodReservation(11);
//        System.out.println(i);
    }
}
