package com.example.storeproject.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.storeproject.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
	Product findByName(String name);
	
	@Query("SELECT i FROM Product p, Inventory i WHERE i.product = p")
	Page<Product> findAllProductsWithQuantity(Pageable pageable);
}
