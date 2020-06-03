package com.example.storeproject.service;

import com.example.storeproject.model.User;

public interface UserService {
    void save(User user);

    User findByUsername(String username);
}