package com.xoriant.springboot.app.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xoriant.springboot.app.exception.DataNotFoundException;
import com.xoriant.springboot.app.models.Log;
import com.xoriant.springboot.app.service.LogFetcher;
import com.xoriant.springboot.app.service.LogService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/logs")
public class LogController {

	@Autowired
	LogService logService;

	private volatile boolean processLogs = false;

	@Autowired
	private LogFetcher logFetcher;

	@GetMapping()
	public List<Log> getLogs() throws DataNotFoundException {

		return logService.getLogs();
	}

	@GetMapping("/getByDate/{date}")
	public List<Log> getLogsByDate(@PathVariable String date) throws DataNotFoundException {
		List<Log> logs = logService.getLogsByDate(date);
		if (logs.isEmpty()) {
			throw new DataNotFoundException("No logs found for the given date: " + date);
		}
		return logs;
	}

	@GetMapping("/getByTime/{time}")
	public List<Log> getDataByTime(@PathVariable int time) throws DataNotFoundException{
		List<Log> logs = logService.getDataByTime(time);
		if (logs.isEmpty()) {
			throw new DataNotFoundException("No logs found for the given time: " + time);
		}
		return logs;
	}

	@GetMapping("/getBySystem/{system}")
	public ResponseEntity<Object> getDataBySystem(@PathVariable String system) throws DataNotFoundException {
		List<Log> logs = logService.getDataBySystem(system);
		if (logs.isEmpty()) {
			throw new DataNotFoundException("No logs found for the given system: " + system);
		}
		return ResponseEntity.ok(logs);
	}

	@GetMapping("/searchLogs/{searchTerm}")
	public ResponseEntity<List<Log>> searchLogs(@PathVariable String searchTerm) throws DataNotFoundException {
		List<Log> logs = logService.searchLogs(searchTerm);
		if (logs.isEmpty()) {
			throw new DataNotFoundException("No logs found for the given search term: " + searchTerm);
		}
		return ResponseEntity.ok(logs);
	}

	@GetMapping("/totalLogs")
	public int totalLogs() {
		return logService.getLengthofLogs();
	}

	@GetMapping("/start")
	public ResponseEntity<String> startLogProcessing() {
		if (processLogs) {
			return ResponseEntity.badRequest().body("Log processing is already in progress");
		}

		processLogs = true;
		new Thread(() -> {
			logFetcher.processLog();
			processLogs = false;
		}).start();

		// logFetcher.processLog();
		// processLogs =false;

		return ResponseEntity.ok("Log processing started");
	}

	@GetMapping("/stop")
	public ResponseEntity<String> stopLogProcessing() {
		if (!processLogs) {
			return ResponseEntity.badRequest().body("Log processing is not in progress");
		}

		logFetcher.stopLog();
		return ResponseEntity.ok("Log procesing stoped.");
	}

}
