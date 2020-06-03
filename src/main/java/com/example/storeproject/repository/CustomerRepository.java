package com.example.storeproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.storeproject.model.Customer;
import com.example.storeproject.model.Product;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{
	Customer findByName(String name);
}
