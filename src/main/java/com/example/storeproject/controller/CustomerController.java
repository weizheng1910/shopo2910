package com.example.storeproject.controller;

import org.springframework.security.core.Authentication;




import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.storeproject.exception.ResourceNotFoundException;
import com.example.storeproject.model.Customer;

import com.example.storeproject.repository.CustomerRepository;




@RestController
@RequestMapping("/api")
public class CustomerController {
	@Autowired
	private CustomerRepository customerRepository;
	
	@GetMapping("/customers")
	public Page<Customer> getCustomers(Pageable pageable){
		return customerRepository.findAll(pageable);
	}
	
	@GetMapping("/role")
	public String getRole(@Valid Authentication authentication) {
		return authentication.getAuthorities().toString();
	}
	
	// Create new customer
	@PostMapping("/customers")
	public Customer createCustomer(@Valid Authentication authentication){
		String currentUser = authentication.getName();
		
		if(customerRepository.findByName(currentUser) == null) {
			Customer customer = new Customer();
			System.out.println(authentication.getName());
			customer.setName(authentication.getName());
			return customerRepository.save(customer);
		} else {
			
			
			System.out.println("**** Existing customer! ****");
			System.out.println(authentication.getAuthorities().toString());
			System.out.println("*!*!*!*!*!**!*!Auth");
			return customerRepository.findByName(currentUser);
		}
		
		
	}
	
	
	
	
	@PutMapping("/customers/{customerId}")
	public Customer updateCustomer(@PathVariable Long customerId, @RequestBody Customer customerRequest) {
		return customerRepository.findById(customerId).map(customer -> {
			customer.setName(customerRequest.getName());
			return customerRepository.save(customer);
		}).orElseThrow(() -> new ResourceNotFoundException("Customer not found with id " + customerId));
	}
	
	

}
