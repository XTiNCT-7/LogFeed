package com.xoriant.springboot.app.exception;

public class DataNotFoundException extends Exception{
	public DataNotFoundException() {
		super("Data Not Found");
	}

	public DataNotFoundException(String string) {
		super(string);
	}
}
