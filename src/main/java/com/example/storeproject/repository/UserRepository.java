package com.example.storeproject.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.example.storeproject.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    
    @Query("SELECT u.email AS email, u.address AS address FROM User u WHERE u.username=:username")
	String findUserWithUserName(String username);
}