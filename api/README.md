# Django Restframework 

Steps to setup a django rest framework [Green_Credit](https://github.com/gritsa/greencredit/tree/main/api) Project .

## Introduction


Django REST framework is a powerful and flexible toolkit for building Web APIs. ... The Web browsable API is a huge usability win for your developers. Authentication policies including packages for OAuth1a and OAuth2. Serialization that supports both ORM and non-ORM data sources.

This Documentation  will walk you through installing Python and setting up a programming environment with Django Restframework on an Ubantu.

## Installing

#### Step 1 — Update the system and install the python :- 
Check the system update and install the python. 

```bash
$ sudo apt update
$ sudo apt -y upgrade
$ sudo apt install python3.8
```
#### Step 2 — Check Version of Python :-
Check which version of Python 3 is installed by typing. 

```bash
$ python3 -V
```

#### Step 3 — Install pip :-
To manage software packages for Python, install pip, a tool that will help you manage libraries or modules to use in your projects.

```bash
$ sudo apt install -y python3-pip
```
#### Step 4 — Create Folder :-
We will create a folder to hold the installations .


```bash
$ mkdir green_credit
```
#### Step 5 — Clone Repository :-
Clone the repository with SSH key.


```bash
$ git clone git@github.com:gritsa/greencredit.git
```
#### Step 6 — Enter in folder :-


```bash
$ cd api
```


#### Step 7 — Install venv :-
Virtual environments enable you to have an isolated space on your server for Python projects. We’ll use venv, part of the standard Python 3 library, which we can install by typing:

```bash
$ sudo apt install -y python3-venv
```

#### Step 8 — Create a Virtual Environment :-
You can create a new environment with the pyvenv command. Here, we’ll call our new environment my_env, but you should call yours something meaningful to your project.

```bash
$ python3 -m venv my_env
```
#### Step 9 — Activate Virtual Environment :-
Activate the environment using the command below, where my_env is the name of your programming environment.

```bash
$ source my_env/bin/activate
```

#### Step 10 — Install Dependencies :-

```bash
$ pip install -r requirements
```

#### Step 11 — Create new database via pgAdmin and map this with  database of settings.py  :-

```bash
$ DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'YOUR_DB_NAME',             <-------- (CHANGES)
        'USER': 'YOUR_DB_USER',           <-------- (CHANGES)
        'PASSWORD': "YOUR_DB_PASSWORD",     <-------- (CHANGES)
        "HOST": "127.0.0.1",
        'PORT': '5432',
        # 'DISABLE_SERVER_SIDE_CURSORS': True,
    }
}

```

#### Step 12 — Migrate Database :-
```bash
$ python manage.py migrate
```
#### Step 13 — Creating Superuser :-

```bash
$ python manage.py createsuperuser
```

#### Step 14 — Runserver :-

```bash
$ python manage.py runserver
```

## License
[MIT](https://choosealicense.com/licenses/mit/)