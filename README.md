# Read to Win Publications - Book Management App 
This Backend Service is intended to keep track of book records and their authors while assessing social popularity of books in the database.

> This App is Built with NodeJS powered Express Server to serve as a backend API.

## Pre-requisites
1. MongoDB Installation
- Install MongoDB by following the tutorial mentioned [here](https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database).
2. Node JS Runtime - Simply download & install it from [here](https://nodejs.org/en/download).
3. Node Package Manager
* Run the following command on your terminal
 ```sh
  npm install npm@latest -g
  ```  
4. Postman (Optional) - This will be used to demonstrate functionality. Download from [here](https://www.postman.com/downloads/)

## Initial Setup
1. Run Mongod server on `localhost`
- As instructed in above Mongo Installation tutorial, run the `mongod` server from localhost after installing MongoDB

2. Clone the repository to your local machine.
```sh
   git clone https://github.com/YOUR_USERNAME_HERE/read-to-win-pub.git
```
3. Open Command Line Terminal inside the Root of the Project
  >  ex: `PS E:\read-to-win-pub>`
5. First Execute, execute `npm install` to install the dependencies
6. Then, execute `npm run dev` to run the server on local port `5000`.

## Setting Up Dummy Data
1. After setting up above, you can move onto importing the data collections provided in `/dummy_data` dir
```
├── dummy_data
    │   ├── authors.json
    │   ├── books.json
```

- Use following namings to setup the new database when importing
```
* DB_NAME - `bookStore`
* collections - `authors` & `books`
```
- Follow, the given tutorial [here](https://www.geeksforgeeks.org/import-data-to-mongodb/). 

## Resources
This Server consists of two main sub-routes
1. `/author`
2. `/books`
- BaseURL - 'localhost:5000'
* You can follow these links via `baseurl/links`format.
> ex: `POST http://localhost:5000/books`

### Author
This will be used to carryout Author related transactions in DB.
> `POST /authors/`- This will be used to create new authors in DB
- this request requires 4 mandatory body parameters
  ```
  firstName - String, simple+capital-letters-only
  lastName - String, simple+capital-letters-only
  email - String , email-format-check[xxxx@yyy.zz]
  contactNo - Number[0-9], Length[10]
  ```

### Books
This will be used to carryout Book related transactions in DB.
> `POST /books/` - This will be used to create new books in DB
- this request requires 4 mandatory body parameters
  ```
  isbn - String, alphanumerics-only
  category - String
  title - String , alphanumerics-only
  authorId - Author ObjectID - created when adding a new author
  ```
  
> `GET /books/:isbn - this will be used to find a book in DB with its ISBN.

> `PUT /books/:id/like - this will be used to handle user likes to a specific book.

## Logging

Server Logs are availble in `logs/` Dir
* There are 2 types of logging in this server
1. Event Logging - This is done for every request in the app and saved in `logs/server.log` 
2. Author Popularity Logging 
- This is done per a 5 mins-step Schedule, where a report is generated on each Author's like Count every 5 mins.
- Saved in `logs/authorPopularity/likesCount.log`
