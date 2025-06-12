# Development

Everything setup and installed? (No? Jump to "Frontend & Backend Installs")
- Open 3 seperate Terminal tabs or windows & `cd` to into folders: 
  - frontend: `npm run dev`
  - backend: `node index.js` (or `npm run dev` for hot reload)
  - backend: `npx prisma studio` (DB table views, or open pgAdmin)

To generate a migration (or update if changes are made):
- `npx prisma migrate dev --name init`

### Seeding (😱 NOTE! It's gonna wipe all your data!)
- `node prisma/tests_seed.js`
- `node prisma/boards_seed.js`

### Testing API Urls
`/boards`:
- `http://localhost:3001/boards/1` - Where 1 is the id of a created board.
- `http://localhost:3001/boards` - Gets all boards.

`/cards`:
- `http://localhost:3001/cards/1` - Gets all cards, where 1 is id of a created board.

`/tests`:
- `http://localhost:3001/tests`
- `http://localhost:3001/tests/test`


# Installs

### Frontend & Backend Installs:
- `cd frontend` > `npm install` > `npm run dev`
- `cd backend` > `npm install` > `node index.js`

# Database setup / install
Download and install these applications
- postgresSQL
- pgAdmin

### Setup Prisma
- `cd backend` 
- `npm install prisma -g` (Install prisma globally, if not already.)
- `npx prisma init` 
- `npx prisma generate` (Run update commands if needed.)

In .env
- See: `POSTGRES_URL="postgresql://johndoe:yourpassword@postgres:5432/mydb?schema=public"`
  - Change `johndoe` to `postgres`
  - Then, Change to your variables: `> POSTGRES_URL="postgresql://postgres:<password>@postgres:5432/<db_name>?schema=public"`
    - Here's a complete example of how mine looks: `DATABASE_URL="postgresql://postgres:okokok@localhost:5432/kudos?schema=public"`

To generate a migration (or update if changes are made):
- `npx prisma migrate dev --name init`
- Now you can open pgAdmin and navigage to db.
- Also, run: `npx prisma studio` to see db info in browser. 

### Setting up Prisma & Express
First run:
- `npx prisma generate` (See Gotchas 👇, if you're having issues here)
- then you can run `node index.js`

### Gotchas

Sometimes when running `node index.js` you're told to run `prisma generate` and after running, you don't get any errors, but when you try `node index.js` you're still told to run `prisma generate`. My issue was with how prismaClient was being initiated in my `routs/tests.js` file. 
- `const { PrismaClient } = require('@prisma/client')`

It needed to be changed to...
- `const { PrismaClient } = require('../generated/prisma');`

It's confusing because I didn't see any messages indicating this change.


# Deploying To Render
Note: make sure all your changes are up to date on your hosting repository.

### Front End
Start here: https://dashboard.render.com/
- Click [+ Add new]
  - Dropdown: Select: [Static Site]
- Log into github
- Find your repo and select
- Add your Name (maybe auto filled)

Add Root Directory (unless your application is on the root level of your repo)
- I had mine in a `frontend` folder on my repo
- So, I needed to add `frontend` here

Add Publish Directory
- I just added `dist` to the prefixed `frontend/` field. So, just ad `dist` if you don't have a root directory.

Add Enviroment Variables
- I'm using Giphy Capture API, and i have it in the `.env` file at the root level of the `frontend` folder.
- So Copy the Key name only `VITE_GIPHY_API_KEY` and past in input.
- then copy the key only: and paste ino key input. 

Click > [Deploy Static Site]!

Ready to Re-Deploy?
- Just Select the "Manual Deploy" Button, then "Deploy latest commmit"

### Postgres DB
Start here: https://dashboard.render.com/
- Click [+ Add new]
  - Dropdown: Select: [postgres]
- Name: myapp-db (*you can do whatever)
- Project: *Leave empty*
- Database: *Leave empty*
- User: *Leave empty*
- Region: I selected Oregon US West
- PostgreSQL Version: 14
  - In Terminal run: `PostgreSQL Version` to get your version.
- Datadog API Key: *Leave empty*
- Datadog Region: *Leave empty*
- Plan Options: Free Basic. 

Click > [Create Database]

Get DATABASE_URL
- With the Info tab open, find the Connect dropdown 
- Copy the "Internal" URL

Update your DATABASE_URL
- In your code, find the `.env` file.
- Note out your local value for DATABASE_URL (You'll wanna save that)
- Now, add your new url: `DATABASE_URL="<your new URL here>"`

NOTE: This will not work when you try and run it locally!

### Node JS Server
Start here: https://dashboard.render.com/
- Click [+ Add new]
  - Dropdown: Select: [postgres]
- Connect your GitHub repo and pick your Node project
- Name: myapp-api (*you can do whatever)
- Language: Node
- Branch: main 
- Region: *should hopefully be already set to what you chose for DB*
- Root Directory: backend (Leave black if package.json is at root level of your repo)
- Build Command: npm install
- Start Command: npm start (or node index.js)
- Instance Type: Free
- Environment Variables: Add your `DATABASE_URL` as the key and then the value as the URL you got from PostGres DB setup.

Click > [Deploy Web Service]

Error on build ?
- When building the Web Service I got a long crypic error. 


<!-- ~~~ -->
- Tried removing quotations on `DATABASE_URL=<your new URL here>` instead of `DATABASE_URL="<your new URL here>"`
 -  NOPE! BUT probably should?!?!!?

- ✨ Tried adding `npx prisma generate && npm install` to build command...


<!-- ~~~ -->
Adding URL to local frontend i get a cors error: `ttps://myapp-api-shvb.onrender.com/' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`

- in server: `npm install cors`

Add to index.js

``` javascript
const allowedOrigins = ['http://localhost:5173', 'https://kudos-mfz5.onrender.com/'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
```

Then, this crazy hack.... Add the following code, then deployed the server, hit the endpoint `https://myapp-api-shvb.onrender.com/migrate` in the browser tab. Took ages, finally finished, then... it worked!

After that, I noted that code out and redeployed both front and back end and it worked!

```javascript
app.get('/migrate', async (req, res) => {
  try {
    const { exec } = require('child_process');
    exec('npx prisma migrate deploy', (error, stdout, stderr) => {
      if (error) {
        console.error(`Migration error: ${error.message}`);
        return res.status(500).send('Migration failed.');
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      res.send('Migration complete.');
    });
  } catch (err) {
    console.error('Migration route error:', err);
    res.status(500).send('Error running migration.');
  }
});
```




























