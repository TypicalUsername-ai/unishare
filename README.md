# Unishare

Content Management System for Notes and Learning Resources

- Mateusz Domalewski <mdomalewski@student.agh.edu.pl>
- Ernest Strychalski <strychalski@student.agh.edu.pl>
- Taras Zhyhulin <zhyhulin@student.agh.edu.pl>
- Piotr Rogowski <progowski@student.agh.edu.pl>

## Description

The app is a content management system for notes, flashcards, and other learning resources. Users receive a currency by sharing their notes and receiving positive ratings on their materials from other users. The currency can be used to access other users' resources. The frontend communicates with the backend via a REST API provided by the backend. The frontend app authenticates users and then uses the API to get information and/or files from the server and display them to the users.

## Contents

- Provided as Markdown, LaTeX, or plaintext files.
- Need to establish content size limit.

## Users

- Login
- Will register with an email and a password.
- Resource management
  - Uploads
  - Deletions
  - Obtained resource access
- Content searching
- Managing resource accesses
- Currency & transaction dashboard
- Rating other users

## Database

- Keeping track of users and their balances
- Keeping track of access
- Storing content

## Technology Stack

### Frontend

- Typescript / js [https://www.typescriptlang.org/]
- React [https://reactjs.org/]
- Redux [https://react-redux.js.org/]

### Backend

- Rust [https://www.rust-lang.org/]
- actix-web [https://actix.rs/]
- diesel [https://diesel.rs/]

### Database

- PostgreSQL [https://www.postgresql.org/]

## Installation

1. Have Docker Installed
1. Clone the project repository
1. Run the docker image
```
~/ docker compose up
```

1. The docker container will set everything up and when the first actix message info appears the server can be connected to on localhost port 80

## Development

- Database data is persitent in the `/database/data` folder
- The `backend`, `frontend` folders and the `startup.sh` file are mounted into the main container
- To refresh the made changes to the `actix-web` server the docker image has to be restarted (may be subject to change)
- to refresh the changes in the react app the command `npm run build` can be executed inside the `frontend` folder of the container
