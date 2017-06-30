$(document).ready(function() {
  // On Click SignIn Button Checks For Valid E-mail And All Field Should Be Filled
  
  $("#login").click(function() {
	$('#userdetails').hide(); 
	$('#usertable').hide();
    var email = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    if ($("#loginuserid").val() == '' || $("#loginpassword").val() == '') {
      alert("Please fill all fields...!!!!!!");
    } else {
		var loginid = $("#loginuserid").val();
		var password = $("#loginpassword").val();
		var user = {
			"userid" : loginid,
			"password" : password
		};
	   
	    
		$.ajax({
			url : '/BloggingApp1/webapi/blogging/user/login',
			cache:'false',
			type : 'post',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify(user),
			success : function(data,textStatus,jqXHR) {
			    alert("You have successfully Logged in...!!!!!!");
			    var token = jqXHR.getResponseHeader("Authorization");
			    var userId = data.userid;
			    if (localStorage) {
			    	localStorage.setItem('userId', userId);
			    	localStorage.setItem('jwttoken',token);
			    } else {
			    	alert("browser doesnot support local storage");
			    }
			    document.getElementById("useridstrong").innerHTML = userId;
			    
		        $("#headerlogin").hide();
		        $("#headerhome").show();
		        $("#headercreatepost").show();
		        $("#headerupdateprofile").show();
		        $("#headerlogout").show();
		        $("#headeruser").show();
		        $("#first").hide();
		        $("#bloglist").show();
		        $("#UserDetails").show();
		        document.getElementById("loginform").reset();
		        $('#bloglisttable tbody').empty();
			    var blogTable = $('#bloglisttable tbody');
			    
			    for (i = 0; i < data.links.length; i++) {
				    /*blogTable.append('<tr><td>' + data.links[i].reference + '</td><td>' + data.links[i].uri +'</td></tr>');*/
			    	blogTable.append('<tr><td align="left"> <a href="' + data.links[i].uri + '" class="blogpostdetails">'+data.links[i].blogtitle+'</a></td></tr>'); //suresh
			    }			      

			},
		    statusCode: {
		        401: function() {
		          alert('Either User ID or Password is incorrect. Please Signup or Login again!!!');
		          document.getElementById("loginform").reset();
		        },
		        400: function() {
		          alert('bad request');
		          document.getElementById("loginform").reset();
		        },
   	            500: function() {
			      alert('bad request');
			      document.getElementById("loginform").reset();
			    }
		    }		    
		});
    }
  });
  
  $("#register").click(function() {
	 $('#userdetails').hide();
	 $('#usertable').hide();
    var email = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    if ($("#name").val() == '' || $("#registeremail").val() == '' || $("#registerpassword").val() == '' || $("#contact").val() == '') {
      alert("Please fill all fields...!!!!!!");
    } else if (!($("#registeremail").val()).match(email)) {
      alert("Please enter valid Email...!!!!!!");
    } else {
      var registeruserid = $("#registeruserid").val();
	  var registerpassword = $("#registerpassword").val();
	  var name = $("#name").val();
	  var contactno = $("#contact").val();
	  var registeremail = $("#registeremail").val();
      var address = $("#address").val();

	  var registeruser = {
	    emailid: registeremail,
	 	fullname: name,
		address: address,
		mobileno: contactno,
		userid: registeruserid,
		password: registerpassword
	  };
	  
	  $('#target').html('sending..');

	  $.ajax({
			url : '/BloggingApp1/webapi/blogging/user/signup',
			cache:'false',
			type : 'post',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
			data : JSON.stringify(registeruser),
			success : function(data) {
		      alert("You have successfully Sign Up, Now you can login...!!!!!!");
		      $("#form")[0].reset();
		      $("#second").slideUp("slow", function() {
		        $("#first").slideDown("slow");
		      });
			},
		    statusCode: {
		        409: function() {
		          alert('User Id already exists. User different User id for registration...!!!');
		          $("#form")[0].reset();
		        },
		        400: function() {
		          alert('bad request');
		          $("#form")[0].reset();
		        },
   	            500: function() {
			      alert('bad request');
			      $("#form")[0].reset();
			    }	        
		    }

	  });

    }
  });
  
  // On Click SignUp It Will Hide Login Form and Display Registration Form
  $("#signup").click(function() {
	 $('#userdetails').hide();
    $("#first").slideUp("slow", function() {
      $("#second").slideDown("slow");
    });
  });
  
  // On Click SignIn It Will Hide Registration Form and Display Login Form
  $("#signin").click(function() {
	  $('#userdetails').hide();  
    $("#second").slideUp("slow", function() {
      $("#first").slideDown("slow");
    });
  });
  
  $('#createpost').click(function(){
	  
	  $('#userdetails').hide();
	  $('#usertable').hide();
	  userid = localStorage.getItem('userId');
		 
	  alert("locally stored userid: "+userid);
	    
	if (userid != null) {
		  $('#bloglist').hide();
		  $('#updateprofile').hide();
		  $('#displayblogpost').hide();
	  	  document.getElementById("createpostform").reset();
		  $('#createblogpost').show();
	} else {
		
		alert("Please login to create Post");
		 $('#bloglist').hide();
		 $('#displayblogpost').hide();
		 $('#blogshowcomments').hide();
		 $('#first').show();
		 /*$("#headerlogin").show();*/
		
	} 
	 
  });

  $('#headerupdateprofileform').click(function(){
	  $('#usertable').hide();
	  $('#bloglist').hide();
	  $('#displayblogpost').hide();
	  $('#createblogpost').hide();
	  $('#userdetails').hide();
	  document.getElementById("updateprofileform").reset();
	  $('#updateprofile').show();	  
  });
  
  $("#headerloginform").click(function(){
	  $('#usertable').hide();
	  $("#bloglist").hide();
	  $("#displayblogpost").hide();
	  $('#userdetails').hide();
	  $("#second").hide();
	  $("#first").show();
  });

  $("#updateprofilesubmit").click(function() {
	  $('#updateprofile').hide();	
	  $('#userdetails').hide();
	  var email = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
	  
	    if ($("#updateprofilename").val() == '' || $("#updateprofilecontact").val() == '' || $("#updateprofileaddress").val() == '' || $("#updateprofileregisteremail").val() == '') {
	      alert("Please fill all fields...!!!!!!");
	    } else if (!($("#updateprofileregisteremail").val()).match(email)) {
	        alert("Please enter valid Email...!!!!!!");
	    } else {
			var profilename = $("#updateprofilename").val();
			var profilecontact = $("#updateprofilecontact").val();
			var profileemail = $("#updateprofileregisteremail").val();
			var profileaddress = $("#updateprofileaddress").val();
			userid = localStorage.getItem('userId');
			alert(userid);
			var updateprofile = {
			  "userid" : userid,
			  "fullname" : profilename,
			  "mobileno" : profilecontact,
			  "emailid" : profileemail,
			  "address" : profileaddress
			};
		   
		    
			$.ajax({
				url : '/BloggingApp1/webapi/blogging/user/'+userid+'/updateprofile',
				cache:'false',
				type : 'put',
				dataType : 'json',
				contentType: "application/json; charset=utf-8",
				beforeSend: function (xhr) {
				    xhr.setRequestHeader ("Authorization", localStorage.getItem('jwttoken'));
				},
				data : JSON.stringify(updateprofile),
				success : function(data) {
				    alert("Successfull updated the profile...!!!!!!");
				    alert(data);
				    alert('fullname: '+data.fullname);
				    $("#userprofilefullname").value = data.fullname;
				    alert('mobile: '+data.mobileno);
				    $("#userprofilecontact").value = data.mobileno;
				    alert('emaild: '+data.emailid);
				    $("#userprofileregisteremail").value = data.emailid;
				    alert('address: '+data.address);
				    $("#userprofileaddress").value = data.address;
				    $('#userdetails').show();
				    $('#updateprofile').hide();
				    
				},
			    statusCode: {
	   	            304: function() {
				      alert('USer Update Failed');
				    },
	   	            500: function() {
				      alert('Internal server code error');
				    }
			    }		    
			});
	    }
	  /*$('#bloglist').show();*/
  });
  
  
  $("#createblogpostsubmit").click(function() {
	  $('#createblogpost').hide();	  
	  $('#userdetails').hide();
	    if ($("#createblogposttitle").val() == '' || $("#createblogpostcontent").val() == '' || $("#createblogpostid").val() == '') {
	      alert("Please fill all fields...!!!!!!");
	    } else {
			var posttitle = $("#createblogposttitle").val();
			var postcontent = $("#createblogpostcontent").val();
			var postid = $("#createblogpostid").val();
			userid = localStorage.getItem('userId');
			alert(userid);
			var createpost = {
			  "blogpostid" : postid,
			  "title" : posttitle,
			  "blogcontent" : postcontent,
			  "author" : userid
			};
		   
		    
			$.ajax({
				url : '/BloggingApp1/webapi/blogging/blogpost/userid/' + userid,
				cache:'false',
				type : 'post',
				dataType : 'json',
				contentType: "application/json; charset=utf-8",
				beforeSend: function (xhr) {
				    xhr.setRequestHeader ("Authorization", localStorage.getItem('jwttoken'));
				},
				data : JSON.stringify(createpost),
				success : function(data) {
				    alert("Successfull created the blogpost...!!!!!!");
				    alert(data);
				    var blogTable = $('#bloglisttable tbody');
				    
				    /*blogTable.append('<tr><td>' + data.title + '</td><td> <a href="' + data.links[0].uri + '" class="blogpostdetails"> Show Details </a></td></tr>');*/
				    blogTable.append('<tr><td align="left"> <a href="' + data.links[0].uri + '" class="blogpostdetails">'+data.title+'</a></td></tr>');
				},
			    statusCode: {
	   	            500: function() {
				      alert('Internal server code error');
				      document.getElementById("loginform").reset();
				    }
			    }		    
			});
	    }
	  $('#bloglist').show();
  });
  
  $("#home").click(function() {
	  $('#bloglisttable tbody').empty();
	  $('#updateprofile').hide();
	  $('#createblogpost').hide();
	  $('#displayblogpost').hide();
	  $('#first').hide();
	  $('#second').hide();
	  $('#bloglist').hide();
	  $('#userdetails').hide();
	  $('#usertable').hide();
	  
	    userid = localStorage.getItem('userId');
	 
	    alert("locally stored userid: "+userid);
	    
	    if (userid != null || userid =='') {
			$.ajax({
				url: '/BloggingApp1/webapi/blogging/user/' + userid + '/home',
				cache:'false',
				type : 'GET',
				dataType : 'json',
				contentType: "application/json; charset=utf-8",	
				beforeSend: function (xhr) {
				    xhr.setRequestHeader ("Authorization", localStorage.getItem('jwttoken'));
				},
				success : function(data) {
	     		    alert("Fetched all user posts successfully!!!");
				    alert(data);
				    var blogTable = $('#bloglisttable tbody');
				    
				    for (i = 0; i < data.links.length; i++) {
				    	/*blogTable.append('<tr><td>' + data.links[i].reference + '</td><td> <a href="' + data.links[i].uri + '" class="blogpostdetails"> Show Details </a></td></tr>');*/
				    	blogTable.append('<tr><td align="left"> <a href="' + data.links[i].uri + '" class="blogpostdetails">'+ data.links[i].blogtitle +'</a></td></tr>');
				    }			      
				},
			    statusCode: {
	   	            500: function() {
				      alert('Internal server code error');
				    }
			    }
			});
		
			$('#bloglist').show();
			
			
	    } else {

	    	alert('Making Ajax Query to get all blog posts');
	    	
	    	$.ajax({
				url : '/BloggingApp1/webapi/blogging/blogpost/all',
				cache:'false',
				type : 'get',
				dataType : 'json',
				contentType: "application/json; charset=utf-8",	  
				success : function(data) {
					alert("Fetched all posts successfully!!!");
				    alert(data);
				    $('#bloglisttable tbody').empty();
				    var blogTable = $('#bloglisttable tbody');
				    
				    for (i = 0; i < data.links.length; i++) {
				    	/*blogTable.append('<tr><td>' + data.links[i].reference + '</td><td> <a href="' + data.links[i].uri + '" class="blogpostdetails"> Show Details </a></td></tr>');*/
				    	blogTable.append('<tr><td align="left"> <a href="' + data.links[i].uri + '" class="blogpostdetails">'+ data.links[i].blogtitle +'</a></td></tr>');
				    	
				    }			      
				},
			    statusCode: {
	   	            500: function() {
				      alert('Internal server code error');
				    }
			    }
			});		
			    		    
		    $('#bloglist').show();
	    	$("#headerlogin").show();
	    	$("#displayblogpost").hide();
	  	  	$("#second").hide();
	  	  	$("#first").hide();
	  	  	$('#blogshowcomments').hide();
	    }
  });

  $("#displayposts").click(function() {
	  $('#bloglisttable tbody').empty();
	  $('#createblogpost').hide();
	  $('#displayblogpost').hide();
	  $('#first').hide();
	  $('#second').hide();
	  $('#bloglist').hide();
	  $('#updateprofile').hide();
	  $('#userdetails').hide();
	  $('#usertable').hide();

	  alert("sending ajax query...!!!");

		$.ajax({
			url : '/BloggingApp1/webapi/blogging/blogpost/all',
			cache:'false',
			type : 'get',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",	  
			success : function(data) {
				alert("Fetched all posts successfully!!!");
			    alert(data);
			    var blogTable = $('#bloglisttable tbody');
			    
			    for (i = 0; i < data.links.length; i++) {
			    	/*blogTable.append('<tr><td>' + data.links[i].reference + '</td><td> <a href="' + data.links[i].uri + '" class="blogpostdetails"> Show Details </a></td></tr>');*/
			    	blogTable.append('<tr><td align="left"> <a href="' + data.links[i].uri + '" class="blogpostdetails">'+ data.links[i].blogtitle +'</a></td></tr>');
			    	
			    }			      
			},
		    statusCode: {
   	            500: function() {
			      alert('Internal server code error');
			    }
		    }
		});		
		    		    
	  $('#bloglist').show();
  });

  $("#createblogcommentsubmit").click(function() {
	  $('#createblogcomment').hide();	  
	    if ($("#createblogcommentcontent").val() == '') {
	      alert("Please fill all fields...!!!!!!");
	    } else {
			var commentcontent = $("#createblogcommentcontent").val();			
			userid = localStorage.getItem('userId');
			alert(userid);
			var createcomment = {
			  "comm_author" : userid,
			  "comment" : commentcontent
			};
		    
			var uri = document.getElementById("blogcreatecomment").href;			
			alert(uri);
		    
			$.ajax({
				url : uri + '/postcomment',
				cache:'false',
				type : 'post',
				dataType : 'json',
				contentType: "application/json; charset=utf-8",
				data : JSON.stringify(createcomment),
				success : function(data) {
				    alert("Successfull created the comment...!!!!!!");
				    alert(data);
				},
			    statusCode: {
	   	            500: function() {
				      alert('Internal server code error');
				      document.getElementById("createcommentform").reset();
				    }
			    }		    
			});
	    }
  });
  
  $("#blogpost").on('click', '.blogpostshowcomment', function(event) {
	    alert("blogpostshowcomment: Caught dynamic href element !!!");
	    $('#createblogcomment').hide();
        var href = $(this).attr('href');
	    alert(href);
	    event.preventDefault();
		
	    
		$.ajax({
			url : href + '/comments',
			cache:'false',
			type : 'GET',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",	  			
			success : function(data) {
     		    alert("Fetched user post comments details successfully!!!");
     		    
     		    $("#blogshowcomments").empty();
     		    
			    alert(data);			    
			    
	            content = '<h1><strong> All comments </strong></h1>';
	            content += '<br/>';
			    //content = '<article>'
			    for (i = 0; i < data.commentsList.length; i++) {			    	
	              content += '<p><strong>Comment Author :</strong>' + data.commentsList[i].comm_author + '</p>';
	              content += '<p><strong>Date of Posting:</strong>' + data.commentsList[i].commentdate + '</p>';
	              content += '<p><strong>Comment Content:</strong></p>';
	              content += '<p>' + data.commentsList[i].comment + '</p>';
	              content += '<br/>';
			    }	
                //content += '</article>'
	            
	            $(content).appendTo("#blogshowcomments");			    
			},
		    statusCode: {
   	            404: function() {
			      alert('Blog post not found');
			    },
   	            500: function() {
  			      alert('Internal server code error');
  			    }

		    }
		});	  

		$('#blogshowcomments').show();	    	    
	    
	});
  
  $("#blogpost").on('click', '.blogpostpostcomment', function(event) {
  	    document.getElementById("createcommentform").reset();
  	    $('#blogshowcomments').hide();
	    $('#createblogcomment').hide();	    

  	    if (localStorage.getItem("userId") === null) {
  		  alert("Please login to post the comment");
  		  $('#displayblogpost').hide();
  		  $('#first').show();
  		} else {
  	      $('#createblogcomment').show();
	      alert("blogpostpostcomment: Caught dynamic href element !!!");
          var href = $(this).attr('href');
	      alert(href);
  		}
	    event.preventDefault();
	});

  
  $("#blogpost").on('click', '.blogpostdelete', function(event) {
	    alert("blogpostdelete: Caught dynamic href element !!!");
	    $('#createblogcomment').hide();
  	    $('#blogshowcomments').hide();
        var href = $(this).attr('href');
	    alert(href);
	    event.preventDefault();
	    $('#displayblogpost').hide();
	    
	    
		$.ajax({
			url : href,
			cache:'false',
			type : 'DELETE',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
			beforeSend: function (xhr) {
			    xhr.setRequestHeader ("Authorization", localStorage.getItem('jwttoken'));
			},
			success : function(data) {
			    alert("Successfully deleted the post...!!!!!!");
			    alert(data);
			},
		    statusCode: {
   	            401: function() {
			      alert('Unauthorised user');
			      document.getElementById("createcommentform").reset();
			    },
   	            404: function() {
  			      alert('Blog post not found');
  			      document.getElementById("createcommentform").reset();
  			    },
   	            500: function() {
  			      alert('Internal server code error');
  			      document.getElementById("createcommentform").reset();
  			    }			    
		    }		    
		});		
		
		//$('#bloglist').show();
  });

  
  $("#bloglisttable").on('click', '.blogpostdetails', function(event) {
	    alert("Caught dynamic row element !!!");
        var href = $(this).attr('href');
	    alert(href);
	    event.preventDefault();
	    
	    userid = localStorage.getItem('userId');
	    
		$('#bloglist').hide();		
	    $("#blogpost").empty();
	    
		$.ajax({
			url : href,
			cache:'false',
			type : 'GET',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",	  			
			success : function(data) {
     		    alert("Fetched user post details successfully!!!");     		         		    
			    alert(data);			    
			    
			    //content = '<article>'
	            //content = '<h1><strong> Title: </strong>' + data.title + '</h1>';
	            content = '<p><strong>Title          :</strong>' + data.title + '</p>';
	            content += '<p><strong>Post ID        :</strong>' + data.blogpostid + '</p>';
	            content += '<p><strong>Date of Posting:</strong>' + data.datecreated + '</p>';
	            content += '<p><strong>Post Author    :</strong>' + data.author + '</p>';
	            content += '<br/>';
	            content += '<p><strong>Blog Content   : </strong></p>';
	            content += '<p>' + data.blogcontent + '</p>';
	            //content += '</article>'
	            content += '<br/>';

	            if (data.author == userid) {
	              content += '<a href="' + data.links[0].uri + '" class="blogpostdelete"><strong>Delete Blog Post</strong></a>';
	              content += '<br/>';
	            }

	            content += '<a href="' + data.links[0].uri + '" class="blogpostshowcomment"><strong> Show Comments </strong> </a>';
	            content += '<br/>';

	            //if (data.author == userid) {
	              content += '<a href="' + data.links[0].uri + '" id="blogcreatecomment" class="blogpostpostcomment"><strong> Post Comment </strong> </a>';
	              content += '<br/>';
	            //}
	            
	            $(content).appendTo("#blogpost");			    
			},
		    statusCode: {
   	            404: function() {
			      alert('Blog post not found');
			    },
   	            500: function() {
  			      alert('Internal server code error');
  			    }
		    }
		});	  

		$('#displayblogpost').show();
	});
  

  $('#logout').click(function(){
	  alert("Succesfully logged out !!!");
	  $('#bloglist').hide();
	  /*$('#createblogpost').hide();*/
	  $('#displayblogpost').hide();
      $("#headercreatepost").hide();
      $("#headerhome").hide();
      $("#headerlogin").show();
      $("#headerlogout").hide();
      $('#updateprofile').hide();
      $("#headerupdateprofile").hide();
      $("#headeruser").hide();
      $('#userdetails').hide();
      $("#UserDetails").hide();
      $('#usertable').hide();
      
		userid = localStorage.getItem('userId');
		alert(userid);
		var logout = {
		  "userid" : userid,
		};
	   
		
		$.ajax({
			url : '/BloggingApp1/webapi/blogging/user/'+userid +'/logout',
			cache:'false',
			type : 'post',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
			beforeSend: function (xhr) {
			    xhr.setRequestHeader ("Authorization", localStorage.getItem('jwttoken'));
			},
			data : JSON.stringify(logout),
			success : function(data) {
			    alert("Successfully logged out..!!!!!!");
			    localStorage.setItem('jwttoken',null);
			    alert(data);
			},
		    statusCode: {
   	            500: function() {
			      alert('Internal server code error');			      
			    }
		    }		    
		});
		
	  localStorage.clear();      
	  document.getElementById("loginform").reset();

	  $('#first').show();
  });
  
  //Script for pagination
  
  $('ul.pagination').on('click', 'a', function() { // listen for click on pagination link
	    if($(this).hasClass('active')) return false;
	  
	    var active_elm = $('ul.pagination a.active');
	  
	    if(this.id == 'next'){
	      var _next = active_elm.parent().next().children('a');
	      if($(_next).attr('id') == 'next') {
	        
	        // appending next button if reach end
	        var num = parseInt($('a.active').text())+1;
	        active_elm.removeClass('active');
	        $('<li><a class="active" href="#">'+num+'</a></li>').insertBefore($('#next').parent());
	        return; 
	      }
	      _next.addClass('active');   
	      
	      
	      
	      
	    }
	    else if(this.id == 'prev') {
	      var _prev = active_elm.parent().prev().children('a');
	      if($(_prev).attr('id') == 'prev') return false;
	      _prev.addClass('active');   
	    } else {
	      $(this).addClass('active');
	    }
	    active_elm.removeClass('active');
	    
	});
  
  $("#searchbutton").click(function() {
	  
	    var email = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
	    if ($("#searchtext").val() == '') {
	      alert("Please provide some input!!!!!!");
	    } else {
			var searchtext = $("#searchtext").val();
					  
			  alert("sending ajax query..for the blog search text: "+searchtext);

			  $.ajax({
					url : '/BloggingApp1/webapi/blogging/blog/search/'+searchtext,
					cache:'false',
					type : 'get',
					dataType : 'json',
					contentType: "application/json; charset=utf-8",	  
					success : function(data) {
						alert("Fetched matching Blog posts successfully!!!");
						
						$('#bloglist').show();
						$("#headerhome").show();
						$('#bloglisttable tbody').empty();
						$('#createblogpost').hide();
						$('#displayblogpost').hide();
						$('#first').hide();
						$('#second').hide();
						$('#updateprofile').hide();
						$("#headerlogin").hide();
						$('#usertable').hide();
						
					    var blogTable = $('#bloglisttable tbody');
										    
					    for (i = 0; i < data.links.length; i++) {
					    	/*blogTable.append('<tr><td>' + data.links[i].reference + '</td><td> <a href="' + data.links[i].uri + '" class="blogpostdetails"> Show Details </a></td></tr>');*/
					    	blogTable.append('<tr><td align="left"> <a href="' + data.links[i].uri + '" class="blogpostdetails">'+ data.links[i].blogtitle +'</a></td></tr>');
					    	
					    }			      
					},
				    statusCode: {
		   	            500: function() {
					      alert('Internal server code error');
					    },
					
						404: function(xhr, status, error) {
								
								//var jsonResponseText = JSON.stringify($.parseJSON(xhr.responseText));
								var jsonResponseText = $.parseJSON(xhr.responseText);
								alert(jsonResponseText.errorcode+": "+jsonResponseText.errormsg);
						}
				    }
			});
	    }
	  });
  
  $("#userdetailsbutton").click(function() {
	  $('#bloglisttable tbody').empty();
	  $('#updateprofile').hide();
	  $('#createblogpost').hide();
	  $('#displayblogpost').hide();
	  $('#first').hide();
	  $('#second').hide();
	  $('#bloglist').hide();
	  $('#userdetails').hide();
	  
	  $('#userprofiletable tbody').empty();
	    userid = localStorage.getItem('userId');
	   
	    alert("locally stored userid: "+userid);
	    
	    if (userid != null || userid =='') {
			$.ajax({
				url: '/BloggingApp1/webapi/blogging/user/' + userid + '/home',
				cache:'false',
				type : 'GET',
				dataType : 'json',
				contentType: "application/json; charset=utf-8",	
				beforeSend: function (xhr) {
				    xhr.setRequestHeader ("Authorization", localStorage.getItem('jwttoken'));
				},
				success : function(data) {
	     		    alert("Fetched all user posts successfully!!!");
				    alert(data);
				    var blogTable = $('#userprofiletable tbody');
				    
				    blogTable.append('<tr><td align="center">User Fullname </td>'+ '<td>'+ data.fullname +'</td></tr>');
				    blogTable.append('<tr><td align="center">Mobile No: </td>'+ '<td>'+ data.mobileno +'</td></tr>');
				    blogTable.append('<tr><td align="center">Email ID: </td>'+ '<td>'+ data.emailid +'</td></tr>');
				    blogTable.append('<tr><td align="center">Address: </td>'+ '<td>'+ data.address +'</td></tr>');
				    			      
				},
			    statusCode: {
	   	            500: function() {
				      alert('Internal server code error');
				    }
			    }
			});
		
			$('#usertable').show();
	    }	    
  });	
  
});