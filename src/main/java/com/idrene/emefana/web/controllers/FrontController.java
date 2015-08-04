package com.idrene.emefana.web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.idrene.emefana.web.model.SiteUserRequest;
import com.idrene.emefana.web.model.SiteVerify;
import com.idrene.emefana.web.service.SiteVerificationService;

@Controller
public class FrontController {
	
	@Autowired
	private SiteVerificationService service;
	
	@RequestMapping(value="/")
	public String publicIndex(){
		return "forward:app/index.html";
		
	}
	
	@RequestMapping(value="/providers")
	public String providerIndex(){
		return "forward:app/providers/index.html";
		
	}
	
	@RequestMapping(value={"/api/siteverify","/providers/api/siteverify"}, method=RequestMethod.POST, consumes={MediaType.APPLICATION_JSON_VALUE}, produces={MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<SiteVerify> verifyUser(@RequestBody SiteUserRequest request){
		SiteVerify  response = service.verify(request);
		return ResponseEntity.ok(response);
		
	}
	
	/* TODO
	 *  ----  fine print
     *   ---- filters by price 
     *   ---- filters by capacity
     *   ---- Reviews  
     *   --- Booking
     *     
	 */

}
