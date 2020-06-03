package com.example.storeproject.repository;

import java.util.ArrayList;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.storeproject.model.Checkout;
import com.example.storeproject.model.Product;

public interface CheckoutRepository extends JpaRepository<Checkout,Long>{
	ArrayList<Checkout> findByCartId(long id);
}
