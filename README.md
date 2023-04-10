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
1. Build the frontend files to serve them
```
~/ cd frontend
~/frontent/ npm run build
```
1. Build the project files
```
~/ cd backend
~/backend/ cargo build --release
```
1. Connect to the docker container
```
~/ docker attach container_name
```
1. Run the diesel migration
```
(docker) ~/ diesel migration redo
```
1. Start the actix server
```
(docker) ~/ ./target/release/executable_name
```

