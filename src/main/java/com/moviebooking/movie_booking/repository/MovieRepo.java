package com.moviebooking.movie_booking.repository;

import com.moviebooking.movie_booking.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepo extends JpaRepository<Movie, Integer> {
    @Query("SELECT m from Movie m WHERE "+
            "LOWER(m.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(m.genre) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(m.movieCast) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(m.movieDirector) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Movie> searchMovies(String keyword);

    @Query("SELECT m from Movie m ORDER BY id ASC")
    List<Movie> getAllMovie();
}
