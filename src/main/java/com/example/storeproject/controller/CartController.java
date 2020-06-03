package com.example.storeproject.controller;

import java.util.ArrayList;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.storeproject.model.Cart;
import com.example.storeproject.repository.CartRepository;

@RestController
@RequestMapping("/api")
public class CartController {
	@Autowired
	private CartRepository cartRepository;

	@GetMapping("/carts")
	public ArrayList<Cart> getCarts() {
		return cartRepository.findAllCartWithCustomer();
	}

	@PostMapping("/carts")
	public Cart createCart(@Valid @RequestBody Cart cart) {
		return cartRepository.save(cart);
	}
}
