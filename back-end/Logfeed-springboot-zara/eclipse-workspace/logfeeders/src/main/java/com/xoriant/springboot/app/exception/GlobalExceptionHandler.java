package com.xoriant.springboot.app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.xoriant.springboot.app.utility.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler({DataNotFoundException.class})
	public ResponseEntity<ApiResponse> handlerDataNotFound(DataNotFoundException ex){
		String message=ex.getMessage();
		ApiResponse response=ApiResponse.builder().message(message).status(HttpStatus.NOT_FOUND).success(false).build();
		return new ResponseEntity<ApiResponse>(response,HttpStatus.NOT_FOUND);
	}
}
