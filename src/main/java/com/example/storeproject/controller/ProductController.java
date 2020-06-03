package com.example.storeproject.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.storeproject.exception.ResourceNotFoundException;
import com.example.storeproject.model.Inventory;
import com.example.storeproject.model.Product;

import com.example.storeproject.repository.InventoryRepository;
import com.example.storeproject.repository.ProductRepository;
import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200", "http://localhost:8081" })
@RestController
@RequestMapping("/api")
public class ProductController {

	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private InventoryRepository inventoryRepository;

	private static Gson gson = new Gson();

	static class ProductBody {
		@SerializedName("id")
		private long id;
		@SerializedName("name")
		private String name;
		@SerializedName("description")
		private String description;
		@SerializedName("quantity")
		private int quantity;
		@SerializedName("cost")
		private double cost;
		@SerializedName("image")
		private String image;

		public long getId() {
			return id;
		}

		public String getName() {
			return name;
		}

		public String getDescription() {
			return description;
		}

		public double getCost() {
			return cost;
		}

		public int getQuantity() {
			return quantity;
		}

		public String getImage() {
			return image;
		}
	}

	@GetMapping("/products")
	public Page<Product> getProducts(Pageable pageable) {
		return productRepository.findAllProductsWithQuantity(pageable);
	}

	@PostMapping("/products")
	public void createProduct(@Valid @RequestBody String requestBody) {

		ProductBody newProduct = gson.fromJson(requestBody, ProductBody.class);

		Product product = new Product();
		product.setName(newProduct.getName());
		product.setDescription(newProduct.getDescription());
		product.setCost(newProduct.getCost());
		product.setImage(newProduct.getImage());

		Inventory inv = new Inventory();
		inv.setProduct(product);
		inv.setQuantity(newProduct.getQuantity());

		productRepository.save(product);
		inventoryRepository.save(inv);
	}

	@PutMapping("/products/{productId}")
	public ResponseEntity<?> updateProduct(@PathVariable Long productId, @Valid @RequestBody String requestBody) {

		ProductBody productRequest = gson.fromJson(requestBody, ProductBody.class);

		return productRepository.findById(productId).map(product -> {
			product.setCost(productRequest.getCost());
			product.setDescription(productRequest.getDescription());
			product.setName(productRequest.getName());
			product.setImage(productRequest.getImage());
			productRepository.save(product);

			Inventory inv = inventoryRepository.findByProduct(product);
			inv.setQuantity(productRequest.getQuantity());
			inventoryRepository.save(inv);
			return ResponseEntity.ok().build();

		}).orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + productId));
	}

	@DeleteMapping("/products/{productId}")
	public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
		return productRepository.findById(productId).map(question -> {
			productRepository.delete(question);
			return ResponseEntity.ok().build();
		}).orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + productId));

	}

}
