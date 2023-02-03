# Television Network Back End

Welcome to my backend app for managing packages, shows, and networks. In this app, you can perform CRUD (create, read, update, delete) operations on each of these entities.

## Using the app
<br/>

### Prerequisites
1. Node.js and npm installed on your machine
2. A PostgreSQL server set up and running on your machine
<br/>

### Instructions
1. Set up the app
2. Clone the repository
3. Run npm install in the root directory to install the required dependencies
4. Create a .env file in the root directory and set the following environment variables:
- DB_USER: the username to connect to the PostgreSQL server
- DB_PASSWORD: the password for the user specified in DB_USER
- DB_HOST: the hostname for the PostgreSQL server
- DB_PORT: the port number for the PostgreSQL server
- DB_DATABASE: the name of the database to connect to
5. Run the SQL scripts in the seederFunctions directory to set up the required tables and sample data
6. Run npm start to start the app
<br/><br/>

## Database Structure
<br/>

### Description
Our database includes three main entities: packages, shows, and networks. A package can have many networks, and a network can have many shows. This relationship is represented in the database by the package_network and show_network tables, which contain foreign keys to the package and network tables respectively.
<br/>

### Database diagram
Here is a diagram of the database structure:
<br/>
![ERD](/assets/erd.png)

<br/>
<br/>

### API documentation
<br/>
The app exposes the following endpoints:
<br/><br/>

#### Network
GET /networks: retrieves all networks
Response: 
```
[
    {
        "network_id": 1,
        "network_name": "NBC"
    },
    {
        "network_id": 2,
        "network_name": "STARZ"
    }
]
```

GET /networks/:id: retrieves a single network with the specified ID
Response:
```
[
    {
        "network_id": 1,
        "network_name": "NBC"
    }
]
```

POST /networks: creates a new network
Response:
```
[
    {
        "network_id": 34,
        "network_name": "PBS"
    }
]
```

PUT /networks/:id: updates an existing network with the specified ID
Response:
```
[
    {
        "network_id": 10,
        "network_name": "AMC"
    }
]
```

DELETE /networks/:id: deletes an existing network with the specified ID
Response:
```
Ok
```


#### Package
GET /packages: retrieves all packages, including their associated networks
Response:
```
[
    {
        "package_id": 2,
        "package_name": "Premium",
        "package_price": 100,
        "networks": [
            {
                "network_id": 1,
                "network_name": "ABC"
            },
            {
                "network_id": 2,
                "network_name": "NBC"
            }
        ]
    },
    {
        "package_id": 1,
        "package_name": "Basic",
        "package_price": 50,
        "networks": [
            {
                "network_id": 1,
                "network_name": "ABC"
            }
        ]
    }
]
```

GET /packages/:id: retrieves a single package with the specified ID, including its associated networks
Response:
```
{
    "package_id": 18,
    "package_name": "Platinum Package",
    "package_price": "50.00",
    "networks": [
        {
            "network_id": 1,
            "network_name": "NBC"
        },
        {
            "network_id": 3,
            "network_name": "ABC"
        },
        {
            "network_id": 5,
            "network_name": "HBO"
        }
    ]
}
```

POST /packages: creates a new package and adds the specified networks to it
Response:
```
{
    "package_id": 41,
    "package_name": "New Package",
    "package_price": "50.00"
}
```

PUT /packages/:id: updates an existing package with the specified ID and updates the associated networks
Response:
```
{
    "package_id": 41,
    "package_name": "New Package",
    "package_price": "50.00"
}
```

DELETE /packages/:id: deletes an existing package with the specified ID and removes it from the package_network table

#### Show
GET /shows: retrieves all shows, optionally filtered by network ID or package ID
Response:
```
Ok
```

GET /shows/:id: retrieves a single show with the specified ID
Response:
```
[
    {
        "show_id": 28,
        "title": "American Idol",
        "imdb_rating": "4.1"
    }
]
```

POST /shows: creates a new show and adds it to the specified network
Response:
```
[
    {
        "show_id": 26,
        "title": "A Little Late With Lilly Singh",
        "imdb_rating": "1.5"
    },
    {
        "show_id": 27,
        "title": "American Gods",
        "imdb_rating": "7.7"
    }
]
```

PUT /shows/:id: updates an existing show with the specified ID and updates the associated network
Response:
```
{
    "show_id": 30,
    "title": "Foo Bar",
    "imdb_rating": "10.0"
}
```

DELETE /shows/:id: deletes an existing show with the specified ID and removes it from the show_network table
Response:
```
Ok
```
