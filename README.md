## Jeff's test task

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

### Example GET route

http://localhost:3000/api/client/
