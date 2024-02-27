# Clean Architecture Example Project
An example project on how to use clean architecture concepts in a backend application, using the "Ports and Adapters / Hexagonal Architecture" model.

## Technologies used
 - Express;
 - TypeScript;
 - jsonwebtoken;
 - bcrypt;
 - uuid;
 - PostgreSQL;

 ## How Install
 1. Download or clone the project;
 2. Create a new .env file based on the .env.example and fill the variables;
 3. Run **npm install** to install the dependencies;
 run **npm run dev** to start the server;
 
 ## Observation
 Currently the application is using user storage in memory, if you want to change it to database storage with PostgreSQL, just change the "index.ts" file on line 26 to "new RepositorioUsuarioPg"