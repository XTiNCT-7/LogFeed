package com.logfeed.logfeeder.model;

public class SystemConfig {
    private final String hostname;
    private final int port;
    private final String username;
    private final String password;
    private final String logPath;

    public SystemConfig(String hostname,int port, String username,String password,String logpath){
        this.hostname = hostname;
        this.port = port;
        this.username = username;
        this.password =password;
        this.logPath = logpath;
    }

    public String getHostname() {
        return hostname;
    }

    public int getPort() {
        return port;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getLogPath() {
        return logPath;
    }

        
    
}
