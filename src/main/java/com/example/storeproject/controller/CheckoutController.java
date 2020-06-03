package com.example.storeproject.controller;

import java.util.ArrayList;
import java.util.Date;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.storeproject.model.Cart;
import com.example.storeproject.model.Checkout;
import com.example.storeproject.model.Customer;
import com.example.storeproject.model.Inventory;
import com.example.storeproject.model.Product;
import com.example.storeproject.model.SendSimpleMail;
import com.example.storeproject.model.User;
import com.example.storeproject.repository.*;

///Mail packages
import com.example.storeproject.repository.UserRepository;
import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;



@RestController
@RequestMapping("/api")
public class CheckoutController {
	
	@Autowired
	private CheckoutRepository checkoutRepository;
	
	@Autowired 
	private CartRepository cartRepository;
	
	@Autowired 
	private CustomerRepository customerRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired 
	private InventoryRepository inventoryRepository;
	
	@Autowired 
	private UserRepository userRepository;
	
	
	private static Gson gson = new Gson();
	
	static class ItemBody {
		@SerializedName("name")
		String name;
		@SerializedName("description")
		String description;
		@SerializedName("cost")
		double cost;
		@SerializedName("quantity")
		int quantity;
		
		public String getName() {
			return name;
		}
		
		public String getDescription() {
			return description;
		}
		
		public double getCost() {
			return cost;
		}
		
		public int getQuantity(){
			return quantity;
		}
	}
	
	
	static class CheckoutBody {
		@SerializedName("customer")
		String customer;
		
		@SerializedName("items")
	    ArrayList<ItemBody> items;
		
		public ArrayList<ItemBody> getItems(){
			return items;
		}
		
		public String getCustomer() {
			return customer;
		}
	}
	
	@GetMapping("/checkouts")
	public Page<Checkout> getCheckouts(Pageable pageable) {
        return checkoutRepository.findAll(pageable);
    }
	
	@GetMapping("/checkouts/{cartId}")
	public ArrayList<Checkout> getCheckoutsByCartId(@PathVariable Long cartId){
		return checkoutRepository.findByCartId(cartId);
	}
	
	@PostMapping("/checkouts")
	public void performCheckouts(@RequestBody String requestBody ) {
		
		CheckoutBody req = gson.fromJson(requestBody, CheckoutBody.class);
		Date date = new Date();
		User user = userRepository.findByUsername(req.getCustomer());
		Customer customer = customerRepository.findByName(req.getCustomer());
		Cart cart = createCart(date,customer);
		
		StringBuilder invoiceBody = new StringBuilder();
		double finalPrice = 0;
		
		for(ItemBody item : req.getItems()) {
			// Item attributes
			String itemName = item.getName();
			double itemPrice = item.getCost();
			int productOrderQuantity = item.getQuantity();
			int unitPriceMultiplyQuantity = (int) Math.round(productOrderQuantity * itemPrice * 100)/ 100;
			Product product = productRepository.findByName(item.getName());
			
			constructInvoice(invoiceBody,itemName,itemPrice,productOrderQuantity,unitPriceMultiplyQuantity);
			finalPrice += unitPriceMultiplyQuantity;
			insertCheckoutEntry(cart,product,productOrderQuantity);
			adjustInventory(product,productOrderQuantity);
		}
		
		String emailContent = generateMail(invoiceBody.toString(),cart,user,finalPrice);
		sendInvoice(user,emailContent);
		
	}
	
	public String generateMail(String body, Cart currentCart, User user, double finalPrice){
		StringBuilder string = new StringBuilder();
		string.append("<div>Hello," + user.getUsername() + "</div><br></br>");
		string.append("<div>Thank you for shopping with us!</div>");
		string.append("<div>Your order receipt: </div><br></br>");
		string.append("<table style='border: 1px solid black'><tr>\r\n" + 
				"    <th align='left'>Item</th>\r\n" + 
				"    <th align='right'> Unit Price($)</th>\r\n" + 
				"    <th align='right'> Quantity</th>" +
				"    <th align='right'> Total Price($)</th>\r\n" + 
				"  </tr>");
		string.append(body);
		string.append("</table><br></br>");
		string.append("<div>Total Cost : $ " + finalPrice + "</div>");
		string.append("<div>Purchase ID : " + currentCart.getId() + "</div>");
		string.append("<div>Delivery address: " + user.getAddress() + "</div>");
		string.append("<div>Please get back to us at shop2910@gmail.com with your Purchase ID if you have not received your purchase after 3 working days.</div>");
		string.append("<br></br><div>Kind Regards,</div>");
		string.append("<div>shopo2910</div>");
		String emailContent = string.toString();
		return emailContent;
	}
	
	public void sendInvoice(User user, String emailContent) {
		try {
			SendSimpleMail.sendMail(user, emailContent);
			} catch (MessagingException e) {
		        e.printStackTrace();
		    } 
	}
	
	static void constructInvoice(StringBuilder body, String itemName, double itemPrice, int productOrderQuantity, int unitPriceMultiplyQuantity) {
		String template = "<tr><td> %s </td><td align='right'> %s </td><td align='right'> %s </td><td align='right'> %s </td></tr>";
		String result = String.format(template, itemName, itemPrice, productOrderQuantity, unitPriceMultiplyQuantity);
		body.append(result);
	}
	
	public void adjustInventory(Product product, int productOrderQuantity) {
		Inventory inventory = inventoryRepository.findByProduct(product);
		int prevQuantity = inventory.getQuantity();
		inventory.setQuantity(prevQuantity - productOrderQuantity);
		inventoryRepository.save(inventory);
	}
	
	public void insertCheckoutEntry(Cart cart, Product product, int productOrderQuantity) {
		Checkout checkout = new Checkout();
		checkout.setCart(cart);
		checkout.setProduct(product);
		checkout.setQuantity(productOrderQuantity);
		checkoutRepository.save(checkout);
	}
	
	public Cart createCart(Date date,Customer customer) {
		Cart cart = new Cart();
		cart.setPurchasedAt(date);
		cart.setCustomer(customer);
		cartRepository.save(cart);
		return cart;
	}
	
}


