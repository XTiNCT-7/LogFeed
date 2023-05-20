package com.logfeed.logfeeder.model;

import java.util.Date;

import jakarta.persistence.*;


// import lombok


@Entity
@Table(name = "log")
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "timestamp")
    private Date timestamp;

    @Column(name="sytem_name")
    private String systemName;

    @Column(name = "level")
    private String level;

    @Column(name = "message",length = 1000)
    private String message;

    public Log() {
        
    }

    public Log(Date timestamp, String systemName,String level, String message) {
        this.message = message;
        this.timestamp = timestamp;
        this.systemName = systemName;
        this.level = level;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getSystemName() {
        return systemName;
    }

    public void setSystemName(String systemName) {
        this.systemName = systemName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getLevel(){
        return level;
    }

    public void setLevel(String level){
        this.level = level;
    }
    
    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return ""+timestamp+systemName+level+message+"";
    }
}
