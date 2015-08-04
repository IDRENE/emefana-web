/**
 * 
 */
package com.idrene.emefana.web.model;

import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author iddymagohe
 * @since 1.0
 */

@Getter
@Setter
public class SiteUserRequest {
	
	@JsonProperty
	private String gCaptchaResponse;

}
