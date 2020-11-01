package com.yang.service.impl;

import com.yang.dao.CityMapper;
import com.yang.dao.UnionMapper;
import com.yang.service.SearchFlightService;
import com.yang.vo.Ticket;
import com.yang.vo.TransitTicket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @auther YF
 * @create 2020-08-31-21:02
 */
@Service
public class SearchFlightServiceImpl implements SearchFlightService {

    private UnionMapper unionMapper;
    private CityMapper cityMapper;

    public SearchFlightServiceImpl(UnionMapper unionMapper, CityMapper cityMapper) {
        this.unionMapper = unionMapper;
        this.cityMapper = cityMapper;
    }

    @Override
    public List<Ticket> search(String depCity, String arrCity, String date) {
        return unionMapper.getTickets(depCity, arrCity, date);
    }

    @Override
    public List<String> getCityName() {
        return cityMapper.getCityNames();
    }

    @Override
    public List<Integer> getBookedSeats(String date, int scheduleId) {
        return unionMapper.getBookedSeats(date, scheduleId);
    }

    /**
     * 搜索单程票
     * @param from
     * @param to
     * @param date
     * @return
     */
    public List<Ticket> searchOneWayTickets(String from, String to, String date){
        List<Ticket> metaTicket = search(from, to, date);
        if (metaTicket == null || metaTicket.size() == 0 || (from == null && to == null)){
            return new ArrayList<>();
        }
        List<Ticket> finalListTicket = new ArrayList<>();
        if (from == null) {
            List<List<Ticket>> groupByFrom = splitBy(metaTicket, Ticket::getFrom);
           addFinalTickets(finalListTicket, groupByFrom, date);
        } else if (to == null) {
            List<List<Ticket>> groupByTo = splitBy(metaTicket, Ticket::getTo);
            addFinalTickets(finalListTicket, groupByTo, date);
        } else {
            addFinalTickets(finalListTicket, new ArrayList<List<Ticket>>(){{ add(metaTicket); }}, date);
        }
        //减去已经被购买的票
        for (Ticket ticket : finalListTicket) {
            List<Integer> bookedSeats = getBookedSeats(ticket.getDepartureDate(), ticket.getScheduleId());
            if (bookedSeats != null && bookedSeats.size() > 0) {
                for (int i = 0; i < bookedSeats.size(); i++) {
                    ticket.getCabinType()[i] -= bookedSeats.get(i);
                }

            }
        }
        return finalListTicket;
    }

    /**
     * 搜索中转票
     * @param from
     * @param to
     * @param date
     * @return
     */
    public List<TransitTicket> searchTransitTickets(String from, String to, String date){
        List<Ticket> fromTickets = searchOneWayTickets(from, null, date);
        List<Ticket> toTickets = searchOneWayTickets(null, to, date);
        List<TransitTicket> transitTickets = new ArrayList<>();
        for (Ticket fromTicket : fromTickets) {
            for (Ticket toTicket : toTickets) {
                if (fromTicket.getTo().equals(toTicket.getFrom())){
                    transitTickets.add(new TransitTicket(fromTicket, toTicket));
                    break;
                }
            }
        }
        return transitTickets;
    }

    /**
     * 根据日期进行分组
     * @param finalTickets
     * @param ticketGroupByCityName
     * @param date
     */
    private void addFinalTickets(List<Ticket> finalTickets, List<List<Ticket>> ticketGroupByCityName, String date) {
        if (date == null) {
            for (List<Ticket> ticketList : ticketGroupByCityName) {
                addGroupedTickets(finalTickets, splitBy(ticketList, Ticket::getDepartureDate));
            }
        } else {
            addGroupedTickets(finalTickets, ticketGroupByCityName);
        }
    }

    /**
     * 将已分好组的票计算好后添加到最终的票里面
     * @param finalTickets
     * @param ticketGroup
     */
    private void addGroupedTickets(List<Ticket> finalTickets, List<List<Ticket>> ticketGroup){
        for (List<Ticket> ticketList : ticketGroup) {
            finalTickets.add(countTicket(ticketList));
        }
    }

    /**
     * 根据对象的某个字段进行分组
     * @param tickets
     * @param fun
     * @return
     */
    private List<List<Ticket>> splitBy(List<Ticket> tickets, Function<Ticket, String> fun) {
        return new ArrayList<>(tickets.stream().collect(Collectors.groupingBy(fun)).values());
    }

    /**
     * 计算所有票中各个机票类型的个数
     * @param tickets
     * @return
     */
    private Ticket countTicket(List<Ticket> tickets) {
        int[] cabinType = new int[3];
        tickets.forEach(t -> cabinType[t.getCabinTypeId() - 1]++);
        Ticket ticket = tickets.get(0);
        ticket.setCabinType(cabinType);
        return ticket;
    }
}
