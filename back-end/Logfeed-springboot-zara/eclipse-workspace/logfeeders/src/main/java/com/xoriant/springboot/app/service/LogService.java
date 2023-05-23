package com.xoriant.springboot.app.service;

import java.util.List;

import com.xoriant.springboot.app.exception.DataNotFoundException;
import com.xoriant.springboot.app.models.Log;

public interface LogService {
	public List<String> displayLogs();
	
	public void readLogs();

	public List<Log> getLogs() throws DataNotFoundException;

	public List<Log> getLogsByDate(String date) throws DataNotFoundException;

	public List<Log> getDataByTime(int time) throws DataNotFoundException;

	public List<Log> getDataBySystem(String system) throws DataNotFoundException;

	public List<Log> searchLogs(String searchTerm) throws DataNotFoundException;

	public int getLengthofLogs();
}
