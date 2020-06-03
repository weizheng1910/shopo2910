package com.example.storeproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.storeproject.model.Inventory;
import com.example.storeproject.model.Product;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long>{
	Inventory findByProduct(Product product);
}
