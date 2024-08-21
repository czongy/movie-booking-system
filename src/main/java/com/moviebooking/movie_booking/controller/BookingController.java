package com.moviebooking.movie_booking.controller;

import com.moviebooking.movie_booking.model.Booking;
import com.moviebooking.movie_booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("/booking")
public class BookingController {
    @Autowired
    private BookingService service;

    @GetMapping("/restrict/{userId}")
    public ResponseEntity<?> getBookingByUserId(@PathVariable int userId) {
        try {
            return new ResponseEntity<>(service.getBookingByUserId(userId), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/restrict/movieId")
    public ResponseEntity<?> getAllBooking(@RequestParam int movieId) {
        try {
            return new ResponseEntity<>(service.getBookingByMovieId(movieId), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/restrict/add/{showtimeId}")
    public ResponseEntity<?> addBooking(@RequestBody Booking booking, @PathVariable int showtimeId) {
        try {
            return new ResponseEntity<>(service.addBooking(booking, showtimeId), HttpStatus.OK);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
