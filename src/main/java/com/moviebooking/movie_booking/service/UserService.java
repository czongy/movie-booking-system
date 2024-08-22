package com.moviebooking.movie_booking.service;

import com.moviebooking.movie_booking.model.Users;
import com.moviebooking.movie_booking.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo repo;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

    public Users registerUser(Users user) {
        try {
            if (repo.existsByUsername(user.getUsername())) {
                throw new IllegalArgumentException("User with username '" + user.getUsername() + "' already exists.");
            }

            if (repo.existsByEmail(user.getEmail())) {
                throw new IllegalArgumentException("User with email '" + user.getEmail() + "' already exists.");
            }

            user.setPassword(encoder.encode(user.getPassword()));
            user.setRole("USER");
            return repo.save(user);
        } catch (DataAccessException e) {
            throw new RuntimeException("Database error while registering user", e);
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error while registering user", e);
        }
    }
}
