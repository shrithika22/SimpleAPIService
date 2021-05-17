# ESA Assignment 4  -  SimpleAPIService

## App Link
[App Link](https://whispering-cove-34670.herokuapp.com/)

## Getting Started
This app built using NodeJs, Express
### To install:

Clone the repository, install node packages and verify routes locally

git clone https://github.com/shrithika22/SimpleAPIService.git

cd SimpleAPIService

npm install

npm install express –save

#### To Run:

npm start

### Verify this in Postman

Used POST HTTP method for the APIs

Returns HTTP 405 if any other API request is used

#### POST API /inbound/sms
In Postman: body params { from: “ “, to: “ “, text: “ “} all three are required

##### For Authentication: Header params: {authenticate: SMS}

If header param not given or wrong header param is given

Returns status 403  {"error":"Authentication failed"}

If text includes STOP or STOP\n or STOP\r or STOP\r\n

‘from’ and ‘to’ pair is Cached with an expiry of 4 hours

#### POST API /outbound/sms

In Postman: body params { from: “ “, to: “ “, text: “ “} all three are required

For Authentication: Header params: {authenticate: SMS}

If header param not given or wrong header param is given

Returns status 403  {"error":"Authentication failed"}

If ‘from’ and ‘to’ are matched with Cache data, returns an error response with HTTP 406

Same ‘from’ can make maximum 50 API requests in 1 hour. If this limit exceeds returns error response message with HTTP 429.

If any parameter is missing, parameter is invalid, or any unexpected error, 

All these errors have appropriate HTTP status codes and appropriate JSON messages.



