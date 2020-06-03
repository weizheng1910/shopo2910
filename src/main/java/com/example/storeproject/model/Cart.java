package com.example.storeproject.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "carts")
public class Cart {
	@Id
	@GeneratedValue(generator = "cart_generator")
	@SequenceGenerator(name = "cart_generator", sequenceName = "cart_sequence", initialValue = 1000)
	private Long id;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "purchased_at", nullable = false, updatable = false)
	private Date purchasedAt;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "customer_id", nullable = false)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
	private Customer customer;
	
	public Long getId() {
		return id;
	}
	
	public Date getPurchasedAt() {
        return purchasedAt;
    }
	
	public Customer getCustomer() {
		return this.customer;
	}

    public void setPurchasedAt(Date purchasedAt) {
        this.purchasedAt = purchasedAt;
    }
    
    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    
    
}
