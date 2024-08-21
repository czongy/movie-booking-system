package com.moviebooking.movie_booking.controller;

import com.moviebooking.movie_booking.model.Showtime;
import com.moviebooking.movie_booking.service.ShowtimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("/showtime")
public class ShowtimeController {
    @Autowired
    private ShowtimeService service;

    @GetMapping("/movieId")
    public ResponseEntity<?> getShowtimeByMovieId(@RequestParam Integer movieId) {
        try {
            return new ResponseEntity<>(service.getShowtimeByMovieId(movieId), HttpStatus.OK);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/showId")
    public ResponseEntity<?> getShowtimeByShowtimeId(@RequestParam Integer showtimeId) {
        try {
            return new ResponseEntity<>(service.getShowtimeByShowtimeId(showtimeId), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/restrict/all")
    public ResponseEntity<?> getAllShowtime() {
        try {
            return new ResponseEntity<>(service.getAllShowtime(), HttpStatus.OK);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/restrict/add/{movieId}")
    public ResponseEntity<?> addShowtime(@RequestBody Showtime showtime, @PathVariable int movieId) {
        try {
            return new ResponseEntity<>(service.addShowtime(showtime, movieId), HttpStatus.OK);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/restrict/update/{showtimeId}")
    public ResponseEntity<?> updateShowtime(@PathVariable int showtimeId, @RequestBody Showtime showtime) {
        try {
            return new ResponseEntity<>(service.updateShowtime(showtimeId, showtime), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/restrict/delete/{showtimeId}")
    public ResponseEntity<?> deleteShowtime(@PathVariable int showtimeId) {
        try {
            service.deleteShowtime(showtimeId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (NoSuchElementException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
