package com.xoriant.springboot.app.service;

import java.util.List;

import com.xoriant.springboot.app.models.Logs;

public interface LogService {
	public List<String> displayLogs();
	
	public void readLogs();

	public List<Logs> getLogs();

	public List<Logs> getLogsSortedByDate();

	public List<Logs> getDataByTime(int time);
}
