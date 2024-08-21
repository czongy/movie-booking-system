package com.moviebooking.movie_booking.service;

import com.moviebooking.movie_booking.model.Booking;
import com.moviebooking.movie_booking.model.Showtime;
import com.moviebooking.movie_booking.repository.BookingRepo;
import com.moviebooking.movie_booking.repository.ShowtimeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BookingService {
    @Autowired
    private BookingRepo repo;
    @Autowired
    private ShowtimeRepo srepo;

    public List<Booking> getBookingByUserId(int userId) {
        try {
            return repo.findByUserId(userId);
        } catch (DataAccessException e) {
            throw new RuntimeException("Database error while retrieving booking by user ID: " + userId, e);
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException("(Get) Booking not found with ID: " + userId, e);
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while retrieving booking with user ID: " + userId, e);
        }
    }

    public Booking addBooking(Booking booking, int showtimeId) {
        try {
            Showtime showtime = srepo.findById(showtimeId).orElseThrow(() ->
                    new NoSuchElementException("(Get) Showtime not found with ID: " + showtimeId));

            List<Integer> newOccupied = new ArrayList<>(showtime.getSeatsOccupied());
            newOccupied.addAll(booking.getSelectedSeats());
            showtime.setSeatsOccupied(newOccupied);
            booking.setShowtime(showtime);

            srepo.save(showtime);
            return repo.save(booking);
        } catch (DataAccessException e) {
            throw new RuntimeException("Database error while adding booking", e);
        } catch (NoSuchElementException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while adding booking", e);
        }
    }

    public List<Booking> getBookingByMovieId(int movieId) {
        try {
            return repo.getBookingByMovieId(movieId);
        } catch (DataAccessException e) {
            throw new RuntimeException("Database error while retrieving booking.", e);
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException("(Get) Booking not found with movie ID: " + movieId, e);
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while retrieving booking.", e);
        }
    }
}
