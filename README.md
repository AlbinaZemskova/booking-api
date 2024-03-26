## Description

This repository contains the code for an authentication system integrated with a room booking application. The system supports two types of users: admin and regular users.

### Users and Their Permissions
**Admin**: Admin users have the privilege to fetch, update, and delete information about all rooms in the system. Additionally, they can cancel reservations made by regular users.

**Regular User**: Regular users can fetch information about the rooms they have booked and cancel their reservations.

### Redis Integration for Email Sending and Refresh Tokens
We utilize Redis in this system for two main purposes:

**Email Sending**: Redis is used to manage email sending functionality, allowing for efficient queuing and processing of email tasks.

**Refresh Tokens**: Refresh tokens are stored in Redis to enable seamless user authentication and authorization. When a user authenticates or requests a new access token, their refresh token is retrieved from Redis. If the refresh token has expired, a new one is generated and stored in Redis for subsequent use.

## ER Diagram

![Screenshot 2024-03-26 at 01.42.44.png](..%2FScreenshot%202024-03-26%20at%2001.42.44.png)

## Installation
Install docker 

```bash
$ docker-compose up --build
```

## Test

```bash
# unit tests
$ npm run test
```

