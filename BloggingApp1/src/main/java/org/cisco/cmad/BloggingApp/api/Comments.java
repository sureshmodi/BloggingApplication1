package org.cisco.cmad.BloggingApp.api;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;

@org.mongodb.morphia.annotations.Entity(noClassnameStored = true)
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@Table(name="COMMENTS")
public class Comments {
	
	@org.mongodb.morphia.annotations.Id
	@XmlTransient
	private long commentid;
	
	@org.mongodb.morphia.annotations.Transient
	@XmlTransient
	public static long seq=0;
	
	private String comment;
		
	@Column(name="author")
	@Property("author")
	private String comm_author;
	
	@XmlTransient
	private String blogid;
	
	@XmlTransient
	@Reference(idOnly=true)
	private BlogPostEntity blogpost;
	
	public static long getSeq() {
		return seq;
	}

	public static void setSeq(long seq) {
		Comments.seq = seq;
	}

	public BlogPostEntity getBlogpost() {
		return blogpost;
	}

	public void setBlogpost(BlogPostEntity blogpost) {
		this.blogpost = blogpost;
	}

	private Date commentdate=new Date();
		
	public Comments() {
		
		// this.commentdate=new Date();
		
	}
//
//	public Comments(long commentid, String comment) {
//		this.commentid = commentid;
//		this.comment = comment;
//		this.commentdate = new Date();
//	}
	
	public long getCommentid() {
		return commentid;
	}
	public void setCommentid(long commentid) {
		this.commentid = commentid;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}

	public Date getCommentdate() {
		return commentdate;
	}
	public void setCommentdate(Date commentdate) {
		this.commentdate = commentdate;
	}
	
	public String getComm_author() {
		return comm_author;
	}

	public void setComm_author(String comm_author) {
		this.comm_author = comm_author;
	}

	public String getBlogid() {
		return blogid;
	}

	public void setBlogid(String blogid) {
		this.blogid = blogid;
	}
	
	

}