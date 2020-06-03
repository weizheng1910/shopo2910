package com.example.storeproject.service;

public interface SecurityService {
    String findLoggedInUsername();

    void autoLogin(String username, String password);
}
