package com.example.storeproject.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "customers")
public class Customer {
	@Id
	@GeneratedValue(generator = "customer_generator")
	@SequenceGenerator(
		name = "customer_generator",
	    sequenceName = "customer_sequence",
	    initialValue = 1000
	)
	private Long id;
	
	@Column(columnDefinition = "text")
    private String name;
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return this.name;
	}
	
}
