FROM python:3.10.3-slim-buster

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE 1
# Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1 

RUN apt-get update \
  && apt-get -y install netcat gcc postgresql \
  && apt-get clean

COPY ./requirements.txt . 
RUN pip install -r requirements.txt

COPY . . 

CMD python manage.py run -h 0.0.0.0

COPY ./entrypoint.sh .
RUN chmod +x /usr/src/app/entrypoint.sh