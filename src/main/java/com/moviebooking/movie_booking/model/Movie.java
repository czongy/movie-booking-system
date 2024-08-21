package com.moviebooking.movie_booking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    private String movieCast;
    private String movieDirector;
    private LocalDate releaseDate;
    private String movieDuration;
    private String language;
    private String genre;
    private String rating;
    private String imageUrl;

    public void setId(int id) {
        this.id = id;
    }
}
