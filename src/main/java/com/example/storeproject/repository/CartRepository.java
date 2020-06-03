package com.example.storeproject.repository;

import java.util.ArrayList;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.storeproject.model.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart,Long>{
	Cart findFirstByOrderByIdDesc();
	
	@Query("SELECT ca FROM Cart ca, Customer cu WHERE ca.customer = cu")
	ArrayList<Cart> findAllCartWithCustomer();
}
