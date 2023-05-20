package com.xoriant.springboot.app.service;

import java.util.List;

import com.xoriant.springboot.app.exception.DataNotFoundException;
import com.xoriant.springboot.app.models.Logs;

public interface LogService {
	public List<String> displayLogs();
	
	public void readLogs();

	public List<Logs> getLogs() throws DataNotFoundException;

	public List<Logs> getLogsSortedByDate();

	public List<Logs> getDataByTime(int time);

	public List<Logs> getDataBySystem(String system) throws DataNotFoundException;

	public List<Logs> searchLogs(String searchTerm) throws DataNotFoundException;

	public int getLengthofLogs();
}
