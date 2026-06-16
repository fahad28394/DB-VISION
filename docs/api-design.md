# API Design Documentation

## Overview

DBVision follows REST API architecture.

The frontend (React application) communicates with the backend (Node.js + Express) using HTTP requests. The backend processes the request, interacts with MongoDB, and sends a JSON response back to the client.

Architecture Flow:

React Frontend
|
| HTTP Request
|
Node.js Express API
|
| Mongoose Queries
|
MongoDB Database

---

# Base API URL

All APIs will start with:

/api

Examples:

/api/auth/login

/api/servers

/api/alerts

---

# Authentication APIs

These APIs handle user registration, login, and profile information.

## Register User

Endpoint:

POST /api/auth/register

Purpose:

Creates a new user account.

Request Body:

{
"username": "Fahad",
"email": "[fahad@example.com](mailto:fahad@example.com)",
"password": "password123",
"role": "DBA"
}

Success Response:

{
"message": "User created successfully",
"userId": "684a123456"
}

---

## Login User

Endpoint:

POST /api/auth/login

Purpose:

Verifies user credentials and generates JWT token.

Request Body:

{
"email": "[fahad@example.com](mailto:fahad@example.com)",
"password": "password123"
}

Success Response:

{
"token": "JWT_TOKEN",
"user": {
"username": "Fahad",
"role": "DBA"
}
}

---

## Get Profile

Endpoint:

GET /api/auth/profile

Purpose:

Returns logged-in user information.

Required Header:

Authorization: Bearer JWT_TOKEN

Response:

{
"username": "Fahad",
"email": "[fahad@example.com](mailto:fahad@example.com)",
"role": "DBA"
}

---

# Server Management APIs

## Get All Servers

Endpoint:

GET /api/servers

Purpose:

Returns all monitored database servers.

Example Response:

[
{
"serverName": "SQLSERVER-PROD-01",
"databaseType": "SQL Server",
"status": "ONLINE"
}
]

---

## Add New Server

Endpoint:

POST /api/servers

Purpose:

Adds a new database server for monitoring.

Request Body:

{
"serverName": "POSTGRES-PROD",
"databaseType": "PostgreSQL",
"host": "192.168.1.50",
"port": 5432,
"environment": "PRODUCTION"
}

---

## Update Server

Endpoint:

PUT /api/servers/:id

Purpose:

Updates server information.

---

## Delete Server

Endpoint:

DELETE /api/servers/:id

Purpose:

Removes a server from monitoring.

---

# Metrics APIs

## Get Server Metrics

Endpoint:

GET /api/servers/:id/metrics

Purpose:

Returns performance data for a specific server.

Example Response:

{
"cpuUsage": 45,
"memoryUsage": 60,
"diskUsage": 70,
"connections": 120
}

---

# Dashboard APIs

## Dashboard Overview

Endpoint:

GET /api/dashboard/overview

Purpose:

Returns summary information for dashboard cards.

Example Response:

{
"totalServers": 10,
"healthyServers": 8,
"criticalAlerts": 2
}

---

# Alert APIs

## Get Alerts

Endpoint:

GET /api/alerts

Purpose:

Returns all system alerts.

---

## Resolve Alert

Endpoint:

PATCH /api/alerts/:id/resolve

Purpose:

Changes alert status from ACTIVE to RESOLVED.

---

# User Management APIs

## Get Users

Endpoint:

GET /api/users

Purpose:

Returns all registered users.

Access:

ADMIN only.

---

## Delete User

Endpoint:

DELETE /api/users/:id

Purpose:

Removes a user from the system.

Access:

ADMIN only.

---

# API Security Rules

Public APIs:

- POST /api/auth/register
- POST /api/auth/login

Protected APIs:

All remaining APIs require JWT authentication.

Role-Based Access Control:

ADMIN:

- Manage users
- Manage servers
- Configure system settings

DBA:

- View dashboard
- Monitor servers
- View alerts

VIEWER:

- Read-only dashboard access

---

# Future API Enhancements

Future versions may include:

- Real-time metrics using WebSocket APIs
- Backup monitoring APIs
- Query performance analysis APIs
- Email notification APIs
- Report generation APIs

---

# API Response Standard

Success Response:

{
"success": true,
"data": {}
}

Error Response:

{
"success": false,
"message": "Something went wrong"
}

Maintaining a common response structure makes the frontend easier to develop and maintain.
