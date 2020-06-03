package com.example.storeproject.controller;

import java.util.ArrayList;
import java.util.stream.IntStream;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;




import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;
import io.github.cdimascio.dotenv.Dotenv;

//Stripe
import com.stripe.Stripe;
import com.stripe.net.ApiResource;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.PaymentIntent;
import com.stripe.exception.*;
import com.stripe.net.Webhook;
import com.stripe.param.PaymentIntentCreateParams;
//

@RestController
@RequestMapping("/api")
public class StripeController {
	//dotenv.get vs System.getenv
	// Dotenv dotenv = Dotenv.load();
	
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
	
	static class CreatePaymentBody {
        @SerializedName("items")
        ArrayList<ItemBody> items;

        @SerializedName("currency")
        String currency;

        public ArrayList<ItemBody> getItems() {
            return items;
        }

        public String getCurrency() {
            return currency;
        }
    }
	
	static class CreatePaymentResponse {
        private String publishableKey;
        private String clientSecret;

        public CreatePaymentResponse(String publishableKey, String clientSecret) {
            this.publishableKey = publishableKey;
            this.clientSecret = clientSecret;
        }
    }
	
	static double calculateOrderAmount(ArrayList<ItemBody> items) {
		// Amount in cents ** i.e. Multiply by 100
		return items.stream()
			.mapToInt(s ->  Math.round(s.getQuantity() *  (int) s.getCost() * 100))
			.reduce(0, (prevState,element) -> prevState + element);
    }

	@PostMapping("/create-payment-intent")
	public String createPaymentIntent(@RequestBody String requestBody) throws StripeException {
		// API-KEY 1
		Stripe.apiKey =  System.getenv("STRIPE_SECRET_KEY");
		
		System.out.println("*****CREATE PAYMENT INTENT");
		System.out.println(requestBody);
		System.out.println("*****CREATE PAYMENT INTENT");
		
		CreatePaymentBody postBody = gson.fromJson(requestBody, CreatePaymentBody.class);
		
		
		 PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder()
                 .setCurrency(postBody.getCurrency()).setAmount((long)calculateOrderAmount(postBody.getItems()))
                 .build();
		 
		// Create a PaymentIntent with the order amount and currency
         PaymentIntent intent = PaymentIntent.create(createParams);
         // Send publishable key and PaymentIntent details to client
         // API-KEY 2
         return gson.toJson(new CreatePaymentResponse(System.getenv("STRIPE_PUBLISHABLE_KEY"), intent.getClientSecret()));
	}
		
	
}
