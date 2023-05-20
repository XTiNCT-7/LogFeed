package com.logfeed.logfeeder.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logfeed.logfeeder.model.Log;
import com.logfeed.logfeeder.repository.LogRepository;

@Service
public class LogSeviceImpl implements LogService {

    @Autowired
    private LogRepository logRepository;

    @Autowired
    private LogFetcher logFetcher;

    @Override
    public List<Log> getAllLogs() {
        logFetcher.processLog();
        return logRepository.findAll();
    }

    
    
}
