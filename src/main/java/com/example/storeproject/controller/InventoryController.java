package com.example.storeproject.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.storeproject.repository.InventoryRepository;
import com.example.storeproject.exception.ResourceNotFoundException;
import com.example.storeproject.model.Inventory;

@RestController
@RequestMapping("/api")
public class InventoryController {
	@Autowired
	private InventoryRepository inventoryRepository;

	@GetMapping("/inventories")
	public Page<Inventory> getInventories(Pageable pageable) {
		return inventoryRepository.findAll(pageable);

	}
	//@PostMapping is at ProductController. A new product
	
	//Edit add quantity
	@PutMapping("/inventories/{inventoryId}")
	public Inventory updateInventories(@PathVariable Long inventoryId, @RequestBody Inventory inventoryRequest) {
		return inventoryRepository.findById(inventoryId).map(inventory -> {
			inventory.setQuantity(inventoryRequest.getQuantity());
			inventory.setProduct(inventoryRequest.getProduct());
			return inventoryRepository.save(inventory);			
		}).orElseThrow(() -> new ResourceNotFoundException("Inventory not found with id " + inventoryId));
	}
	
	@DeleteMapping("/inventories/{inventoryId}")
	public ResponseEntity<?> deleteInventory(@PathVariable Long inventoryId) {
		return inventoryRepository.findById(inventoryId)
                .map(question -> {
                    inventoryRepository.delete(question);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Inventory not found with id " + inventoryId));
	}
	
	
}
