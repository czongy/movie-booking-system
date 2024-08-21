package com.moviebooking.movie_booking.repository;

import com.moviebooking.movie_booking.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {

    Users findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}