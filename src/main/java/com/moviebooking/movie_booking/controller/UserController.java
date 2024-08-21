package com.moviebooking.movie_booking.controller;

import com.moviebooking.movie_booking.model.UserPrincipal;
import com.moviebooking.movie_booking.model.Users;
import com.moviebooking.movie_booking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class UserController {
    @Autowired
    private UserService service;

    @GetMapping("/login")
    public List<String> login() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = "";
        String email = "";
        String userId = "";
        if (authentication.getPrincipal() instanceof UserDetails) {
            if (authentication.getPrincipal() instanceof UserPrincipal) {
                UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
                username = userPrincipal.getUsername();
                email = userPrincipal.getEmail();
                userId = String.valueOf(userPrincipal.getId());
            } else {
                username = ((UserDetails) authentication.getPrincipal()).getUsername();
            }
        } else {
            username = authentication.getPrincipal().toString();
        }

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String roles = authorities.toString();

        return new ArrayList<>(List.of(username, email, roles, userId));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Users user) {
        try {
            return new ResponseEntity<>(service.registerUser(user), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
