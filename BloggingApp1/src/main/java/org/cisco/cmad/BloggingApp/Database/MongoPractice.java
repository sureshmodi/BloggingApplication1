package org.cisco.cmad.BloggingApp.Database;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.cisco.cmad.BloggingApp.api.BlogPostEntity;
import org.cisco.cmad.BloggingApp.api.UserDetails;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.bson.*;

import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.operation.CreateCollectionOperation;
import com.stormpath.sdk.ds.DataStore;


public class MongoPractice {

	public static void main(String[] args) {
		MongoClient mongoclient = new MongoClient("localhost", 27017);
		/*MongoDatabase db = mongoclient.getDatabase("db_cmad");
		MongoCollection<Document> books = db.getCollection("Books");
		//db.createCollection("BlogPost");
//		Document book3 = new Document("Title","Springs")
//						 .append("ISBN",123457);
//		
//		books.insertOne(book3);
		//System.out.println(books.find().first().toJson());
		
		List<Document> bookslist = books.find().into(new ArrayList<>());
		
		for(Document book: bookslist) {
			System.out.println(book.toJson());
		}
		
		MongoCursor<Document> cursor = books.find().iterator();
		
		System.out.println("#######Using Iterator method###### \n");
			
		while(cursor.hasNext()) {
			
			Document curr = cursor.next();
			
			System.out.println(curr.toJson());
		}
		
		cursor.close();
		
		System.out.println("#######Using Bson Filter method######");
		Bson filter = Filters.and(Filters.eq("Title","Springs"));
		List<Document> coll = books.find(filter).into(new ArrayList<>());
		
		for(Document curr:coll) {
			
			System.out.println(curr.toJson());
			
		}*/
		
		BlogPostEntity blogpost = new BlogPostEntity("blog1","JAVA","TOPIC About JAVA");
	    Datastore ds = new Morphia().createDatastore(mongoclient,"blogging");
	    ds.save(blogpost);
	    
	    UserDetails user = new UserDetails("sureshmodhi@gmail.com", "Suresh Modi","Gottigere",
	    									9008505599L, "sureshmodi", "passwrod");
	    
	    ds.save(user);
	   
		mongoclient.close();
	}

	
}
