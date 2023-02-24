# URL Shortener for Pinpoint Predictive

In order to run the URL Shortener application, please follow the steps listed below

Build and spin up the new containers:
> $ docker-compose up -d --build

Create the database:
> $ docker-compose exec api python manage.py recreate_db

Access the client/UI(May take a minute or two to come up):
> http://localhost:3005

