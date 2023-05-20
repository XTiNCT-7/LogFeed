package com.xoriant.springboot.app.models;

import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Logs {
	@Id
	Long logId;
	Timestamp timeStamp;
	String logType;
	String logMessage;
	String systemName;
	
}
