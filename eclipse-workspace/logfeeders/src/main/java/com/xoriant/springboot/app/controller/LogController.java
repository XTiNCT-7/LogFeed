package com.xoriant.springboot.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xoriant.springboot.app.exception.DataNotFoundException;
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
	public List<Logs> getLogs() throws DataNotFoundException{
		
		return logService.getLogs();
	}
	@GetMapping("/sortByDate")
	public List<Logs> getLogsSortByDate(){
		return logService.getLogsSortedByDate();
	}
	
	@GetMapping("/getByTime/{time}")
	public List<Logs> getDataByTime(@PathVariable int time){
		return logService.getDataByTime(time);
	}
	
	@GetMapping("/getBySystem/{system}") 
	public ResponseEntity<List<Logs>> getDataBySystem(@PathVariable String system) throws DataNotFoundException{
		List<Logs> logs=logService.getDataBySystem(system);
		if (logs.isEmpty()) {
	        throw new DataNotFoundException("No logs found for the given system: " + system);
	    }
		return ResponseEntity.ok(logs);
	}
	
	@GetMapping("/searchLogs/{searchTerm}")
	public ResponseEntity<List<Logs>> searchLogs(@PathVariable String searchTerm) throws DataNotFoundException{
		List<Logs> logs=logService.searchLogs(searchTerm);
		if (logs.isEmpty()) {
	        throw new DataNotFoundException("No logs found for the given search term: " + searchTerm);
	    }
		return ResponseEntity.ok(logs);
	}
	
	@GetMapping("/totalLogs")
	public int totalLogs() {
		return logService.getLengthofLogs();
	}
	
	
//	@GetMapping("read")
//	public List<Logs> readLogs() {
//		logService.readLogs();
//	}

}
