package com.example.storeproject.model;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

// Used to leave out fields from Json output
// import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name = "products")
public class Product {
	@Id
	@GeneratedValue(generator = "product_generator")
	@SequenceGenerator(name = "product_generator", sequenceName = "product_sequence", initialValue = 1000)

	private Long id;
	
	@NotBlank
	@Column(columnDefinition = "text")
	private String name;
	
	@NotBlank
	@Column(columnDefinition = "text")
	private String description;

	@Column(columnDefinition = "money", nullable = true)
	private BigDecimal cost;
	
	private String image;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public double getCost() {
		return this.cost.doubleValue();
	}

	public void setCost(double cost) {
		BigDecimal convertedCost = new BigDecimal(cost);
		this.cost = convertedCost;
	}
	
	public void minusCost(double cost){
		double currentValue = this.cost.doubleValue();
		System.out.println("The product's cost before minus is " + currentValue);
		System.out.println( (currentValue - cost));
		if(currentValue - cost > 0) {
			setCost(currentValue - cost);
		}
	}
	
	public void setImage(String image) {
		this.image = image;
	}
	
	public String getImage() {
		return this.image;
	}

}
