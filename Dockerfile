FROM tomcat:latest
ADD BloggingApp1/target/BloggingApp1*.war /usr/local/tomcat/webapps/BloggingApp1.war
ADD setenv.sh /usr/local/tomcat/bin/setenv.sh
