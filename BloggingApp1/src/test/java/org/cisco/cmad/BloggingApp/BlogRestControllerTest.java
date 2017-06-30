package org.cisco.cmad.BloggingApp;

import org.cisco.cmad.BloggingApp.Rest.BlogRestController;
import org.cisco.cmad.BloggingApp.api.InvalidUserCredentialsException;
import org.cisco.cmad.BloggingApp.api.UserDetails;
import org.junit.Test;

import junit.framework.TestCase;

public class BlogRestControllerTest extends TestCase {
	
	@Test
	public void testAddUser() {
		
		BlogRestController blog = new BlogRestController();
		UserDetails user = new UserDetails("test@gmail.com", "test", "test", 12345,"","test");
								
		try {
			blog.addUser(null);
		} catch (Exception e) {
			System.out.println("Suresh Test: Caught 1st Exception");
			e.printStackTrace();
			e.getMessage();
			assertTrue(e instanceof InvalidUserCredentialsException);
			
		}
		
		
		
	}

	@Test
	public void testCreateBlogpost() {
		//fail("Not yet implemented");
	}

	@Test
	public void testPostComment() {
		//fail("Not yet implemented");
	}

	@Test
	public void testGetBlogpost() {
		//fail("Not yet implemented");
	}

	@Test
	public void testUserLogin() {
		//fail("Not yet implemented");
	}

	@Test
	public void testUpdateUser() {
		//fail("Not yet implemented");
	}

	@Test
	public void testGetallComments() {
		//fail("Not yet implemented");
	}

	@Test
	public void testDeleteBlogpost() {
		//fail("Not yet implemented");
	}

	@Test
	public void testGetallBlogposts() {
		//fail("Not yet implemented");
	}

	@Test
	public void testUserDetails() {
		//fail("Not yet implemented");
	}

	@Test
	public void testUserLogout() {
		//fail("Not yet implemented");
	}

}
