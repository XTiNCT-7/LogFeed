package com.xoriant.springboot.app.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.xoriant.springboot.app.models.Log;
import com.xoriant.springboot.app.models.SystemConfig;
import com.xoriant.springboot.app.repository.LogRepository;

@Component
public class LogFetcher {

    @Autowired
    private LogRepository logRepository;

    

    private volatile boolean running = true;

    

    @Transactional
    // @Scheduled(fixedRate = 6000)
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

    @Transactional
    private void saveLog(String systemName, String line) {
        
        String[] logParts = line.split("\\s+", 6);
        if (logParts.length >= 6) {
            String month = logParts[0];
            String day = logParts[1];
            String time= logParts[2];

            String timestamp = month+" "+day+" "+time;
            String sysName = logParts[3];
            String level = logParts[4].substring(0, logParts[4].length()-1);
            String message = logParts[5];

            Calendar calender = Calendar.getInstance();
            int currentYear = calender.get(Calendar.YEAR);

            
            SimpleDateFormat dateFormat = new SimpleDateFormat("MMM-dd HH:mm:ss",Locale.ENGLISH);
           
            try {

                

                Date date = parseTimeStamp(timestamp);
                System.out.println("dateeee"+date);
               
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

    private Date parseTimeStamp(String timestamp) throws ParseException{
        Calendar curYear = Calendar.getInstance();
        int year = curYear.get(Calendar.YEAR);

        SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd HH:mm:ss");
        Date parseDate = dateFormat.parse(timestamp);
        Calendar parsedCalendar = Calendar.getInstance();
        parsedCalendar.setTime(parseDate);
        parsedCalendar.set(Calendar.YEAR, year);

        return parsedCalendar.getTime();
    }
}
