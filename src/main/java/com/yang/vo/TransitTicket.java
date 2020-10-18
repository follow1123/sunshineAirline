package com.yang.vo;

/**
 * @auther YF
 * @create 2020-09-06-18:24
 */
public class TransitTicket {

    private Ticket firstTicket;

    private Ticket nextTicket;

    public TransitTicket(Ticket firstTicket, Ticket nextTicket) {
        this.firstTicket = firstTicket;
        this.nextTicket = nextTicket;
    }

    public Ticket getFirstTicket() {
        return firstTicket;
    }

    public void setFirstTicket(Ticket firstTicket) {
        this.firstTicket = firstTicket;
    }

    public Ticket getNextTicket() {
        return nextTicket;
    }

    public void setNextTicket(Ticket nextTicket) {
        this.nextTicket = nextTicket;
    }
}
