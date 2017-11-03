## Jeff's test task

### Preconditions
- you need Postgres to actually start it running, PSequel to view it and LTS version of node

### Installation
- run `npm install`
- run as sudo : `psql -f client.sql`

### Usage

- run `npm start`
- open `http://127.0.0.1:3000`

### Example POST
json body as:

{	
	"phone": "+427732436111",
	"email": "ddds{@a.com",
	"randomfield":"randomdata",
	"sandomfield":"randggfdgomdata"
}

(you can add more fields, phone and email are mandatory fields, rest are optional)


### Example GET route

http://localhost:3000/api/client/
