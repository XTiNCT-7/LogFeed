package com.logfeed.logfeeder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logfeed.logfeeder.model.Log;

@Repository
public interface LogRepository extends JpaRepository<Log,Long>{
    
}
