/**
 * 
 */
package com.idrene.emefana.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

/**
 * @author iddymagohe
 * @since 1.0
 */
@Getter
@Setter
public class SiteVerify {

	private boolean success;
	
	@JsonProperty(value ="error-codes")
	private String[] errorCodes;
}
