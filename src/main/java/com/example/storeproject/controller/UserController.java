package com.example.storeproject.controller;

import com.example.storeproject.controller.StripeController.CreatePaymentBody;

import com.example.storeproject.model.User;
import com.example.storeproject.repository.UserRepository;
import com.example.storeproject.service.SecurityService;
import com.example.storeproject.service.UserService;
import com.google.gson.annotations.SerializedName;
import com.google.gson.Gson;

import org.springframework.beans.factory.annotation.Autowired;



import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
	private static Gson gson = new Gson();
	
    @Autowired
    private UserService userService;
    
    @Autowired 
    private UserRepository userRepository;

    @Autowired
    private SecurityService securityService;
    
    static class EmailAndAddressBody {
        @SerializedName("email")
        String email;

        @SerializedName("address")
        String address;

        public String getEmail() {
            return email;
        }

        public String getAddress() {
            return address;
        }
    }

    
    @GetMapping("/users/{username}")
    public String getUserByUsername(@PathVariable String username) {
    	return userRepository.findUserWithUserName(username);
    }
    

    @PostMapping("/newAccount")
    public void registration(@RequestBody User user) {
       userService.save(user);
       securityService.autoLogin(user.getUsername(), user.getPassword());
    }

    
}