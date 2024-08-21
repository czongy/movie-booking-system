package com.moviebooking.movie_booking.repository;

import com.moviebooking.movie_booking.model.Movie;
import com.moviebooking.movie_booking.model.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowtimeRepo extends JpaRepository<Showtime, Integer> {
    @Query ("SELECT s FROM Showtime s WHERE s.movie = :movie" +
            " ORDER BY date ASC, startTime ASC")
    List<Showtime> getShowtimeByMovieId(Movie movie);

    @Query ("SELECT s FROM Showtime s" +
            " ORDER BY date ASC, startTime ASC")
    List<Showtime> getAllShowtimeSortedByDate();
}
