package org.cisco.cmad.BloggingApp.api;

public interface BlogUser {
	
	public void createUser(UserDetails userdetails) throws Exception;
	public UserDetails updateUser(UserDetails user);
	public UserDetails userLogin(UserDetails user);
	public UserDetails getUserDetails(String userid);
	
}
