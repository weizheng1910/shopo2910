package com.example.storeproject.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "checkouts")
public class Checkout {
	@Id
    @GeneratedValue(generator = "checkout_generator")
    @SequenceGenerator(
            name = "checkout_generator",
            sequenceName = "checkout_sequence",
            initialValue = 1000
    )
    private Long id;
	
	@ManyToOne
	@JoinColumn(name="cart_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Cart cart;
	
	
	@ManyToOne
	@JoinColumn(name="product_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Product product;
	
	@Column(nullable = false)
	private int quantity;
	
	public void setCart(Cart cart){
		this.cart = cart;
	}
	
	public void setProduct(Product product) {
		this.product = product;
	}
	
	public void setQuantity(int qty) {
		this.quantity = qty;
	}
	
	public Cart getCart(){
		return cart;
	}
	
	public Product getProduct() {
		return product;
	}
	
	public int getQuantity() {
		return quantity;
	}
	
}
