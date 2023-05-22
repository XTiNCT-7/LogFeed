package com.xoriant.springboot.app.models;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data

public class Log {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "timestamp")
	private Date timestamp;

	@Column(name = "sytem_name")
	private String systemName;

	@Column(name = "level")
	private String level;

	@Column(name = "message", length = 1000)
	private String message;

	public Log() {
        
    }

	public Log(Date timestamp, String systemName,String level, String message) {
        this.message = message;
        this.timestamp = timestamp;
        this.systemName = systemName;
        this.level = level;
    }

}
