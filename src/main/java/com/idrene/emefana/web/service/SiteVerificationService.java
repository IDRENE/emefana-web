/**
 * 
 */
package com.idrene.emefana.web.service;

import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.idrene.emefana.web.model.SiteUserRequest;
import com.idrene.emefana.web.model.SiteVerify;

/**
 * @author iddymagohe
 * @since 1.0
 */
public interface SiteVerificationService {

	public SiteVerify verify(SiteUserRequest request);

}

@Service
 class SiteVerificationServiceImpl implements SiteVerificationService{

	@Override
	public SiteVerify verify(SiteUserRequest request) {
		RestTemplate restTemplate = new RestTemplate();
		MultiValueMap<String, String> variablesMap = new LinkedMultiValueMap<>();

		variablesMap.add("secret", "6LcisAoTAAAAANstEu7DD_Ziq909qDNYksEcGDyJ");
		variablesMap.add("response", request.getGCaptchaResponse());
		
		SiteVerify response = restTemplate.postForObject("https://www.google.com/recaptcha/api/siteverify", variablesMap, SiteVerify.class);
		return response;
	}
	 
 }
