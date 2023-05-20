package com.xoriant.springboot.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.xoriant.springboot.app.models.Logs;

@Repository
public interface LogRepository extends JpaRepository<Logs, Long>{

	@Query(value="select * from logs order by time_stamp DESC",nativeQuery=true)
	List<Logs> getLogsSortedByDate();
	
	@Query(value="select * from logs where time_stamp > now() - interval :time hour;",nativeQuery=true)
	List<Logs> getDataByTime(int time);
	
	List<Logs> getBySystemName(String system);

	@Query(value="SELECT * FROM logs WHERE log_message LIKE %:searchTerm% or log_type LIKE %:searchTerm% or system_name LIKE %:searchTerm%",nativeQuery=true)
	List<Logs> searchLogs(String searchTerm);

}
