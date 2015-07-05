package com.idrene.emefana.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontController {
	
	@RequestMapping(value="/")
	public String publicIndex(){
		return "forward:app/index.html";
		
	}
	
	@RequestMapping(value="/providers")
	public String providerIndex(){
		return "forward:app/providers/index.html";
		
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
