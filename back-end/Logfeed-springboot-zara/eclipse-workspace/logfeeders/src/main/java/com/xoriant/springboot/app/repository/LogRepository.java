package com.xoriant.springboot.app.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import com.xoriant.springboot.app.models.Log;

@Repository
public interface LogRepository extends JpaRepository<Log, Long>{

	@Query(value="select * from log order by timestamp DESC",nativeQuery=true)
	List<Log> getLogsByDate(String date);
	
	@Query(value="select * from log where timestamp > now() - interval :time hour;",nativeQuery=true)
	List<Log> getDataByTime(int time);
	
	List<Log> getBySystemName(String system);

	@Query(value="SELECT * FROM log WHERE message LIKE %:searchTerm% or level LIKE %:searchTerm% or sytem_name LIKE %:searchTerm%",nativeQuery=true)
	List<Log> searchLogs(String searchTerm);

	@Query(value="select timestamp from log",nativeQuery=true)
	List<Timestamp> getTimeStampLogs();

	List<Log> getBytimestamp(Timestamp ts);

}
