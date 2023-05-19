package com.logfeed.logfeeder;

import java.io.File;
import java.io.IOException;
import java.util.Vector;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;

@SpringBootApplication
public class LogfeederApplication {

	// public static void main(String[] args) {
	// 	SpringApplication.run(LogfeederApplication.class, args);
	// }

	public static void main(String[] args) {
		SpringApplication.run(LogfeederApplication.class, args);
		String[] hosts = { "ram-vm" };
		String[] usernames = { "ram" };
		String[] passwords = { "ram" };
		String localPath = "E:/React/examle";

		for (int i = 0; i < hosts.length; i++) {
			String host = hosts[i];
			String username = usernames[i];
			String password = passwords[i];

			JSch jsch = new JSch();
			try {
				Session session = jsch.getSession(username, host, 22);
				session.setPassword(password);
				session.setConfig("StrictHostKeyChecking", "no");
				session.connect();
				System.out.println("connection started");

				// Define the directory and subdirectory paths on the Unix system
				String directoryPath = "/home/ram/Documents";
				String subdirectoryPath = "/home/ram/Documents/new";

				// Fetch files from the subdirectory and store them locally
				fetchFiles(session, subdirectoryPath, localPath);

				// Fetch files from the main directory and store them locally
				fetchFiles(session, directoryPath, localPath);

				session.disconnect();
				System.out.println("connection ended");
			} catch (JSchException | SftpException | IOException e) {
				e.printStackTrace();
			}
		}

	}

	private static void fetchFiles(Session session, String remotePath, String localPath)
			throws JSchException, SftpException, IOException {
		ChannelSftp channelSftp = (ChannelSftp) session.openChannel("sftp");
		channelSftp.connect();

		// Set the remote directory
		channelSftp.cd(remotePath);

		// Get the list of files in the remote directory
		Vector<ChannelSftp.LsEntry> fileList = channelSftp.ls(remotePath);

		// Iterate over the files and download them
		for (ChannelSftp.LsEntry entry : fileList) {
			if (!entry.getAttrs().isDir()) {
				String remoteFile = entry.getFilename();
				String localFile = localPath + File.separator + remoteFile;

				// Download the file from the remote directory to the local directory
				channelSftp.get(remotePath + "/" + remoteFile, localFile);

				// Print the downloaded file path
				System.out.println("Downloaded file: " + localFile);
			}
		}

		channelSftp.disconnect();
	}

}
