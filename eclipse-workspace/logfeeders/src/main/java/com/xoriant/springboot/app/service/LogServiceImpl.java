package com.xoriant.springboot.app.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xoriant.springboot.app.models.Logs;
import com.xoriant.springboot.app.repository.LogRepository;

@Service
public class LogServiceImpl implements LogService{
	
	@Autowired
	LogRepository logRepository;
	private Logger logger=LoggerFactory.getLogger(LogServiceImpl.class);
	
	@Override
	public List<String> displayLogs() {
		System.out.println(Timestamp.from(Instant.now()));
//			try {
//				String folder="Documents\\Resume";
//				String filename="db.logs";
////				Resource resource = new ClassPathResource("C:\\Users\\qureshi_z\\Documents\\db.logs");
////				System.out.println(new ClassPathResource("C:\\Users\\qureshi_z\\Documents\\db.logs").getFile().getAbsolutePath());
////				File file = resource.getFile();
//				BufferedReader bufferedReader = new BufferedReader(new FileReader("C:\\Users\\qureshi_z\\"+folder+"\\"+filename));
//				String line = null;
//				List<String> lines = new ArrayList<String>();
//		        while ((line = bufferedReader.readLine()) != null) {
//		        		lines.add(line);
//		        }
//		        	
//		        for(String s:lines) {
//		        	
//		        	if(s.contains("WARNING")) {
//		        		String[] arrOfStr = s.split(":", 2);
//		        		System.out.println(s);
//		        	}
//		        }
//		        
//		        bufferedReader.close();
//			}
//			catch(Exception e) {
//				System.out.println(e);
//			}
//		
		return null;
	}
	
	@Override
	public void readLogs() {
		try {
			String folder="Documents";
			String filename="newlog.log";
			BufferedReader reader=new BufferedReader(new FileReader("C:\\Users\\qureshi_z\\"+folder+"\\"+filename));
			String line;
            while ((line = reader.readLine()) != null) {
                parseLogEntry(line);
            }
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		
	}

	private static void parseLogEntry(String logEntry) {
        String[] logComponents = logEntry.split(" ");

        String date = logComponents[0] + " " + logComponents[1];
        String time = logComponents[2];
        String systemName = logComponents[3];
        String logType = logComponents[4];
        String message = String.join(" ", Arrays.copyOfRange(logComponents, 5, logComponents.length));
        System.out.println("logType"+logType);
        // Check if logType requires special handling
        if (logType.contains(":")) {
            String[] typeComponents = logType.split(":");
            if(typeComponents.length>1) {
//            System.out.println(typeComponents.toString());
            String suffix = typeComponents[1].trim();
	            if (suffix.matches(".*[A-Z].*")) {
	                logType = suffix;
	            }
            }
            else{
                logType = "INFORMATION";
            }
        }

        System.out.println("Date: " + date); 
        System.out.println("Time: " + time);
        System.out.println("System Name: " + systemName);
        System.out.println("Log Type: " + logType);
        System.out.println("Message: " + message);
        System.out.println("-----");
    }

	@Override
	public List<Logs> getLogs() {
		
		return logRepository.findAll();
	}

	@Override
	public List<Logs> getLogsSortedByDate() {
		
		return logRepository.getLogsSortedByDate();
	}

	@Override
	public List<Logs> getDataByTime() {
		System.out.println(Timestamp.from(Instant.now()));
		return logRepository.getDataByTime();
	}
	
	
	
//	public List<Logs> getByType(){
//		
//	}
}
