package com.logfeed.logfeeder.service;

import java.io.BufferedReader;
import java.io.IOException;

import java.io.InputStreamReader;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.logfeed.logfeeder.model.Log;
import com.logfeed.logfeeder.model.SystemConfig;
import com.logfeed.logfeeder.repository.LogRepository;

@Component
public class LogFetcher {

    @Autowired
    private LogRepository logRepository;

    

    private volatile boolean running = true;

    

    @Transactional
    @Scheduled(fixedRate = 6000)
    public void processLog() {
        Map<String, SystemConfig> systemConfigs = Map.of(
                "WSL_Local", new SystemConfig("172.25.123.20", 2222, "bash", "ram", "/var/log/syslog"));
        for (Map.Entry<String, SystemConfig> entry : systemConfigs.entrySet()) {
            String systemName = entry.getKey();
            SystemConfig systemConfig = entry.getValue();
            try {
                System.out.println("entered the jsch connection");
                JSch jsch = new JSch();
                Session session = jsch.getSession(systemConfig.getUsername(), systemConfig.getHostname(),
                        systemConfig.getPort());
                session.setPassword(systemConfig.getPassword());
                session.setConfig("StrictHostKeyChecking", "no");
                session.connect();

                Channel channel = session.openChannel("exec");
                ((ChannelExec) channel).setCommand("tail -F " + systemConfig.getLogPath());
                channel.setInputStream(null);

                ((ChannelExec) channel).setErrStream(System.err);
                BufferedReader reader = new BufferedReader(new InputStreamReader(channel.getInputStream()));
                channel.connect();
                String line;
                while (running && (line = reader.readLine()) != null) {
                    saveLog(systemName, line);
                    
                }

                System.out.println("channel disconnected");
                // stopLog();

                if (channel.isConnected()) {
                    
                    channel.disconnect();
                }

                session.disconnect();

            } catch (JSchException | IOException e) {
                
                e.printStackTrace();
            }
        }
    }

    private void saveLog(String systemName, String line) {
        
        String[] logParts = line.split("\\s+", 6);
        if (logParts.length >= 6) {
            String timestamp = logParts[0]+" "+logParts[1]+" "+logParts[2];
            String sysName = logParts[3];
            String level = logParts[4].substring(0, logParts[4].length()-1);
            String message = logParts[5];

            System.out.println(timestamp +sysName+level+message);
            SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd HH:mm:ss");
           
            try {

                Date date = dateFormat.parse(timestamp);
                // System.out.println("saving filevin database");
                Log log = new Log(date, sysName,level, message);
                System.out.println(log);
                logRepository.save(log);
                System.out.println("saved in database");
                
            } catch (ParseException e) {
                
                e.printStackTrace();
            }

        }

    }

    public void stopLog(){
        running = false;
    }
}
