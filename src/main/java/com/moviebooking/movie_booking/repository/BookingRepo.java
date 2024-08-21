package com.moviebooking.movie_booking.repository;

import com.moviebooking.movie_booking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Integer> {
    @Query("SELECT b FROM Booking b WHERE b.userId = :userId " +
            "ORDER BY b.showtime.date DESC, b.showtime.startTime DESC")
    List<Booking> findByUserId(int userId);

    @Query("SELECT b FROM Booking b WHERE b.showtime.movie.id = :movieId " +
            "ORDER BY b.showtime.date DESC, b.showtime.startTime DESC")
    List<Booking> getBookingByMovieId(int movieId);
}
