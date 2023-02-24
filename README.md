# URL Shortener for Pinpoint Predictive

In order to run the URL Shortener application, please follow the steps listed below

Build and spin up the new containers:
> $ docker-compose up -d --build

Create the database:
> $ docker-compose exec api python manage.py recreate_db

To run server tests:
> $ docker-compose exec api python -m pytest -s "src/tests"

Access the client/UI(May take a minute or two to come up):
> http://localhost:3005

Access the server(Flask API)
> http://localhost:5004

The Link hyperlink in the URL column will use the code generated to redirect to the listed URL.


In case of errors:

Ensure that the database is set up using this command
> $ docker-compose exec api python manage.py recreate_db

Ensure that you have not exceeded the rate limt (500 requests per minute)