# tracking-service
a Service for trancking API usage of a dummy IP to location lookup service

# Question 4
  Your company has decided to sell its API for IP to location lookup as a service. However, there is currently no means to track usage by customers and to charge appropriate fees. Build a billing service that your company can use to track usage of it’s APIs and prepare a monthly bill for customers. The location IP to location look up already exists and you are not required to build it, your job is to track API usage for billing.

# Tools
Docker Container
Docker Compose
TypeScript
NodeJs(Express)

# Depedency
Docker

## Installation setup
Have Docker running 

Run the command  `docker-compose up -d --build`
this will install all the dependencies

# Request
API
POST(http://localhost:3200/api/register) user registers for the service

GET(http://localhost:3200/api/location_lookup) require api_key generated upon registering

GET(http://localhost:3200/api/getUsage)  require api_key generated upon registering


