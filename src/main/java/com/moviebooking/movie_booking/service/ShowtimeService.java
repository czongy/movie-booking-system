package com.moviebooking.movie_booking.service;

import com.moviebooking.movie_booking.model.Movie;
import com.moviebooking.movie_booking.model.Showtime;
import com.moviebooking.movie_booking.repository.MovieRepo;
import com.moviebooking.movie_booking.repository.ShowtimeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ShowtimeService {
    @Autowired
    private ShowtimeRepo repo;
    @Autowired
    private MovieRepo mrepo;

    public List<Showtime> getShowtimeByMovieId(int movieId) {
        try {
            Movie movie = mrepo.findById(movieId).orElseThrow(() ->
                    new NoSuchElementException("(Get) Movie not found with ID: " + movieId));
            return repo.getShowtimeByMovieId(movie);
        } catch (DataAccessException e) {
            throw new RuntimeException("Database error while retrieving showtime by movie ID: " + movieId, e);
        } catch (NoSuchElementException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while retrieving showtime by movie ID: " + movieId, e);
        }
    }

    public Showtime getShowtimeByShowtimeId(int showtimeId) {
        try {
            return repo.findById(showtimeId).orElseThrow(() ->
                new NoSuchElementException("(Get) Showtime not found with ID: " + showtimeId));
        } catch (DataAccessException e) {
            throw new RuntimeException("Database error while retrieving showtime by movie ID: " + showtimeId, e);
        } catch (NoSuchElementException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while retrieving showtime by movie ID: " + showtimeId, e);
        }
    }

    public List<Showtime> getAllShowtime() {
        try {
            return repo.getAllShowtimeSortedByDate();
        } catch (DataAccessException e) {
            throw new RuntimeException("Database error while retrieving all showtime", e);
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while retrieving all showtime", e);
        }
    }

    public Showtime addShowtime(Showtime showtime, int movieId) {
        try {
            Movie movie = mrepo.findById(movieId).orElseThrow(() ->
                    new NoSuchElementException("(Get) Movie not found with ID: " + movieId));
            showtime.setMovie(movie);
            return repo.save(showtime);
        } catch (DataAccessException e) {
            throw new RuntimeException("Database error while adding showtime", e);
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while adding showtime", e);
        }
    }

    public Showtime updateShowtime(int showtimeId, Showtime showtime) {
        try {
            if (!repo.existsById(showtimeId)) {
                throw new NoSuchElementException("(Update) Showtime not found with ID: " + showtimeId);
            }
            showtime.setId(showtimeId);
            return repo.save(showtime);
        } catch (DataAccessException e) {
            throw new RuntimeException("Database error while updating showtime with ID: " + showtimeId, e);
        } catch (NoSuchElementException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while updating showtime with ID: " + showtimeId, e);
        }
    }

    public void deleteShowtime(int showtimeId) {
        try {
            if (!repo.existsById(showtimeId)) {
                throw new NoSuchElementException("Delete) Showtime not found with ID: " + showtimeId);
            }
            repo.deleteById(showtimeId);
        } catch (DataAccessException e) {
            throw new RuntimeException("Database error while deleting showtime with ID: " + showtimeId, e);
        } catch (NoSuchElementException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error occurred while deleting showtime with ID: " + showtimeId, e);
        }
    }
}
