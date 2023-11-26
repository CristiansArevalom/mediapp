
Remember that the application.properties file must be created for the API to function properly.

The project is created with Maven, so all you need to do is import it into your IDE and build the project to resolve the dependencies. However, you should configure the PostgreSQL connection in the application.properties file.

It is necessary to specify the profile in your properties file, and avoid using the 'default' profile if you want to run tests and implement authentication in the development environment.

Finally, it is necessary to specify the jwt.secret that Spring Boot security and JWT will use.



```bash
Create a PostgreSQL database with the name school and add the credentials to /resources/application.properties.
The default ones are :

spring.profiles.active=dev
 
spring.jpa.database=postgresql
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.hibernate.ddl-auto=update

spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
#spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect  //<Spring Boot 3.0.x
spring.datasource.url=jdbc:postgresql://localhost/school
spring.datasource.username=postgres
spring.datasource.password=123
jwt.secret=aEIu9S7cvZUnPJWezau3rKUCxj4BLtpCVzhVSyam93prJOxofs7688P0OD5tmTIsLL6u7G9HpXvT

```

**3. Now run the mvn spring-boot:run command to start the project :-**


```bash
mvn spring-boot:run
```


**4.** **🎉 Open Postman and test the restAPI on this url: `https://127.0.0.1:8080`**

**Follow the steps of the Steps presentation in the repository -**
