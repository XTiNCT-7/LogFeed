package com.logfeed.logfeeder.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.logfeed.logfeeder.model.Log;

import com.logfeed.logfeeder.service.LogFetcher;
import com.logfeed.logfeeder.service.LogService;


@RestController
@RequestMapping("/logs")
public class LogController {
    
    @Autowired
    private LogService logService;

    private volatile boolean processLogs = false;

    @Autowired
    private LogFetcher logFetcher;


    @GetMapping
    public List<Log> getAllLogs(){
        
        return logService.getAllLogs();
    }

    @GetMapping("/start")
    public ResponseEntity<String> startLogProcessing(){
        if (processLogs) {
            return ResponseEntity.badRequest().body("Log processing is already in progress");
        }

        processLogs = true;
        new Thread(()->{
            logFetcher.processLog();
            processLogs = false;
        }).start();

        // logFetcher.processLog();
        // processLogs =false;

        return ResponseEntity.ok("Log processing started");
    }
    @GetMapping("/stop")
    public ResponseEntity<String> stopLogProcessing(){
        if (!processLogs) {
            return ResponseEntity.badRequest().body("Log processing is not in progress");
        }

        logFetcher.stopLog();
        return ResponseEntity.ok("Log procesing stoped.");
    }
}
