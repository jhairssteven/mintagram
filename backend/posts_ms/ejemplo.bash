./mvnw package
heroku container:login
heroku container:push web --app min-pos-ms
heroku container:release web --app min-pos-ms