package com.moviebooking.movie_booking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int userId;
    private String payment;
    private List<Integer> selectedSeats;
    private double totalCost;
    @ManyToOne
    @JoinColumn(name = "showtimeId")
    private Showtime showtime;

    public void setShowtime(Showtime showtime) {
        this.showtime = showtime;
    }

    public List<Integer> getSelectedSeats() {
        return selectedSeats;
    }
}