# Homebase Server
Server to manage all modules over MQTT & REST

Includes:
    
    joi
    
    knex
    
    morgan
    
    winston
    
    xss
    
    mySQL with pagination


## Set up

1. Clone this repository to your local machine `git clone `
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm i`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env` and to test `mv example.env .env.test .env.production`

Dont need these just yet:
6. Create your dev and test databases 
7. Update the .env file with your database info
8. Create migrations and run the seed file -- to run test migrations set NODE_ENV - `NODE_ENV=test npm run migrate`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm t`

## Deploying

When ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
