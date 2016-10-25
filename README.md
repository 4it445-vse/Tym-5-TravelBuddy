# TravelBuddy

## Setup Local Development

1. clone repository
2. run `npm install` in both directories `/frontend` and `/backend`
3. starting local development:

  3.1 frontend:
    - run `npm start` in frontend directory, it will create nodejs server on adress `localhost:3000` and livereload feature.
    
  3.2 backend:
    - create `.env` file based on `.env.example`. It is configuration for MySQL database connection. For example if you have MySQL server on localhost with root (default account) and no password it will look like this:
    
            DB_HOST=localhost
            DB_PORT=3306
            DB_DATABASE=TravelBuddy
            DB_USERNAME=root
            DB_PASS=
        
   - run `npm run watch-babel` in backend directory. It will create nodejs server on adress `localhost:3001` and automatically restart          server. Livereload doesn't work though.
   - you can access loopback on url `localhost:3001/explorer`
   
4. Happy hacking
