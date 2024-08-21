package com.moviebooking.movie_booking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Showtime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private int hallId;
    private List<Integer> seatsOccupied;
    @ManyToOne
    @JoinColumn(name="movieId")
    private Movie movie;

    public void setId(int id) {
        this.id = id;
    }

    public List<Integer> getSeatsOccupied() {
        return seatsOccupied;
    }

    public void setSeatsOccupied(List<Integer> seatsOccupied) {
        this.seatsOccupied = seatsOccupied;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }
}
