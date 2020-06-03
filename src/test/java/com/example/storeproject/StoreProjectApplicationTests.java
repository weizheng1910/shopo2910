package com.example.storeproject;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.example.storeproject.model.Inventory;
import com.example.storeproject.model.Product;
import com.example.storeproject.repository.InventoryRepository;
import com.example.storeproject.repository.ProductRepository;

@EnableJpaRepositories
@SpringBootTest
class StoreProjectApplicationTests {
	
	/* @Autowired
	 private ProductRepository productRepository;
	 @Autowired
	 private InventoryRepository inventoryRepository;

	@Test
	void contextLoads() {
		System.out.println("Beginning Test");
		
		List<Product> products = productRepository.findAll();
		
		for(int i = 1; i <= 5; i++) {
			Product thisProduct = products.get(i);
			
			Inventory inv = new Inventory();
			inv.setProduct(thisProduct);
			inv.setQuantity(100);
			inventoryRepository.save(inv);
		}
		

		System.out.println("End Test");
		
		
		
		
	}
	
	@Test 
	void fiveProductsInTable() {
		List<Product> currentList = productRepository.findAll();
		assertEquals(5, currentList.size());
	}
	
	void create(String name, String description, double cost) {
		Product product = new Product();
		product.setName(name);
		product.setDescription(description);
		product.setCost(cost);
		
		productRepository.save(product);
		System.out.println("Product saved");
	}
	
	void decreaseCostInProduct(String name, double cost) {
		Product theProduct = productRepository.findByName(name);
		System.out.println(theProduct.getName() + "is being edited.");
		theProduct.minusCost(cost);
		productRepository.save(theProduct);
	}
	
*/

}
