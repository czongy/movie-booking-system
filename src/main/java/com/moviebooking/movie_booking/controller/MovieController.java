package com.moviebooking.movie_booking.controller;

import com.moviebooking.movie_booking.model.Movie;
import com.moviebooking.movie_booking.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("/movie")
public class MovieController {

    @Autowired
    private MovieService service;

    @GetMapping("")
    public ResponseEntity<?> getAllMovies() {
        try {
            return new ResponseEntity<>(service.getAllMovies(), HttpStatus.OK);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{movieId}")
    public ResponseEntity<?> getMovieById(@PathVariable int movieId) {
        try {
            return new ResponseEntity<>(service.getMovieById(movieId), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchMovies(@RequestParam String keyword) {
        try {
            return new ResponseEntity<>(service.searchMovies(keyword), HttpStatus.OK);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/restrict/add")
    public ResponseEntity<?> addMovie(@RequestBody Movie movie) {
        try {
            return new ResponseEntity<>(service.addMovie(movie), HttpStatus.OK);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/restrict/update/{movieId}")
    public ResponseEntity<?> updateMovie(@PathVariable int movieId, @RequestBody Movie movie) {
        try {
            return new ResponseEntity<>(service.updateMovie(movieId, movie), HttpStatus.OK);
        } catch (NoSuchElementException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/restrict/delete/{movieId}")
    public ResponseEntity<?> deleteMovie(@PathVariable int movieId) {
        try {
            service.deleteMovie(movieId);
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
