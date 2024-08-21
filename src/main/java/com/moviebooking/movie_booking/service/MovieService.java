package com.moviebooking.movie_booking.service;

import com.moviebooking.movie_booking.model.Movie;
import com.moviebooking.movie_booking.repository.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class MovieService {

    @Autowired
    private MovieRepo repo;

    public List<Movie> getAllMovies() {
        try {
            return repo.getAllMovie();
        } catch (DataAccessException e) {
            throw new RuntimeException("Database error while retrieving all movie data", e);
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while retrieving all movie data", e);
        }
    }

    public Movie getMovieById(int movieId) {
        try {
            return repo.findById(movieId).orElseThrow(() ->
                new NoSuchElementException("(Get) Movie not found with ID: " + movieId));
        } catch (DataAccessException e) {
            throw new RuntimeException("Database error while retrieving movie with ID: " + movieId, e);
        } catch (NoSuchElementException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while retrieving movie with ID: " + movieId, e);
        }
    }

    public List<Movie> searchMovies(String keyword) {
        try {
            return repo.searchMovies(keyword);
        } catch (DataAccessException e) {
            throw new RuntimeException("Database error while searching for movie with keyword: " + keyword, e);
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while searching for movie with keyword: " + keyword, e);
        }
    }

    public Movie addMovie(Movie movie) {
        try {
            return repo.save(movie);
        } catch (DataAccessException e) {
            throw new RuntimeException("Database error while adding movie", e);
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while adding movie", e);
        }
    }

    public Movie updateMovie(int movieId, Movie movie) {
        try {
            if (!repo.existsById(movieId)) {
                throw new NoSuchElementException("(Update) Movie not found with ID: " + movieId);
            }
            movie.setId(movieId);
            return repo.save(movie);
        } catch (DataAccessException e) {
            throw new RuntimeException("Database error while updating movie with ID: " + movieId, e);
        } catch (NoSuchElementException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while updating movie with ID: " + movieId, e);
        }
    }

    public void deleteMovie(int movieId) {
        try {
            if (!repo.existsById(movieId)) {
                throw new NoSuchElementException("Delete) Movie not found with ID: " + movieId);
            }
            repo.deleteById(movieId);
        } catch (DataAccessException e) {
            throw new RuntimeException("Database error while deleting movie with ID: " + movieId, e);
        } catch (NoSuchElementException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while deleting movie with ID: " + movieId, e);
        }
    }
}
