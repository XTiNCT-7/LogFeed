package com.xoriant.springboot.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xoriant.springboot.app.models.Logs;
import com.xoriant.springboot.app.service.LogService;

@RestController
@RequestMapping("/logs")
public class LogController {
	
	@Autowired
	LogService logService;
	 
	
	
//	@GetMapping
//	public List<String> getLogs(){
//		return logService.displayLogs();
//	}
	
	@GetMapping()
	public List<Logs> getLogs(){
		return logService.getLogs();
	}
	@GetMapping("/sortByDate")
	public List<Logs> getLogsSortByDate(){
		return logService.getLogsSortedByDate();
	}
	
	@GetMapping("/getByTime/{time}")
	public List<Logs> getDataByTime(@PathVariable int time){
		return logService.getDataByTime();
	}
	
//	@GetMapping("read")
//	public List<Logs> readLogs() {
//		logService.readLogs();
//	}

}
