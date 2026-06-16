# Authentication and Authorization Flow

## Overview

DBVision uses JWT (JSON Web Token) based authentication to secure APIs.

Authentication answers:

"Who are you?"

Example:

- Is this user Fahad?
- Is the entered password correct?

Authorization answers:

"What are you allowed to do?"

Example:

- Can this user delete a server?
- Can this user manage other users?

---

# Authentication Components

The authentication system contains the following components:

1. User Collection (MongoDB)
2. Password Hashing (bcrypt)
3. JWT Token Generation
4. Authentication Middleware
5. Role-Based Access Control (RBAC)

---

# User Registration Flow

When a new user creates an account:

Step 1:
User enters:

- Username
- Email
- Password
- Role

Example:

{
"username": "Fahad",
"email": "[fahad@example.com](mailto:fahad@example.com)",
"password": "mypassword",
"role": "DBA"
}

Step 2:
React sends a request:

POST /api/auth/register

Step 3:
Backend validates the input:

- Required fields check
- Email format validation
- Check if email already exists

Step 4:
Password is encrypted using bcrypt.

Example:

Original Password:
mypassword

Stored in MongoDB:

$2b$10$XyzAbc123HashedPassword

Why do we hash passwords?

Because storing plain text passwords is a major security risk.

Even if the database is compromised, attackers cannot directly see the user's password.

Step 5:
User document is saved in MongoDB.

Example:

{
"\_id": "12345",
"username": "Fahad",
"email": "[fahad@example.com](mailto:fahad@example.com)",
"password": "$2b$10$hashedValue",
"role": "DBA"
}

Registration is completed successfully.

---

# User Login Flow

Step 1:
User enters email and password.

React sends:

POST /api/auth/login

Example:

{
"email": "[fahad@example.com](mailto:fahad@example.com)",
"password": "mypassword"
}

Step 2:
Backend searches MongoDB:

Find user by email.

Example:

User.findOne({ email })

Step 3:
Compare passwords using bcrypt.

bcrypt.compare(
enteredPassword,
hashedPassword
)

If passwords match:

Access is granted.

---

# JWT Token Generation

After successful login, the server generates a JWT token.

JWT contains user information such as:

{
"userId": "12345",
"role": "DBA"
}

The token is signed using a secret key:

JWT_SECRET=mySuperSecretKey

Example response:

{
"token": "eyJhbGciOiJIUzI1..."
}

The frontend stores this token for future API requests.

---

# Accessing Protected APIs

For every protected API request, the frontend sends:

Authorization:
Bearer JWT_TOKEN

Example:

GET /api/servers

Headers:

Authorization: Bearer eyJhbGciOiJIUzI1...

---

# Authentication Middleware Flow

Request
|
|
Check Authorization Header
|
|
Token Exists?
|
YES
|
Verify JWT Signature
|
|
Extract User Information
|
|
Attach User to Request
|
|
Continue to Controller

If token is missing or invalid:

Return:

401 Unauthorized

---

# Authorization (Role-Based Access Control)

After the user is authenticated, the system checks the user's role.

ADMIN Permissions:

- Manage users
- Add/Edit/Delete servers
- Configure system settings

DBA Permissions:

- View dashboard
- Monitor database servers
- View metrics
- Resolve alerts

VIEWER Permissions:

- View dashboard
- View metrics
- Read-only access

Example:

DELETE /api/users/:id

Allowed Role:

ADMIN

If a DBA tries to access this API:

Response:

403 Forbidden

---

# Authentication vs Authorization

Authentication:

"Who are you?"

Example:
Login with email and password.

Authorization:

"What can you do?"

Example:
Checking whether the user has permission to delete a server.

---

# Security Best Practices

DBVision follows these security practices:

- Never store plain text passwords.
- Always hash passwords using bcrypt.
- Store JWT secret in environment variables.
- Validate all user input.
- Protect sensitive routes using middleware.
- Implement role-based access control.
- Use HTTPS in production.

---

# Complete Authentication Flow Diagram

React Login Page
|
|
POST /api/auth/login
|
|
Express Controller
|
|
Find User in MongoDB
|
|
Compare Password using bcrypt
|
|
Generate JWT Token
|
|
Send Token to React
|
|
Store Token
|
|
User requests protected API
|
|
Authorization: Bearer Token
|
|
Authentication Middleware
|
|
Check User Role
|
|
Allow or Deny Request

---

# Future Improvements

Future versions of DBVision can include:

- Refresh Tokens
- Multi-Factor Authentication (MFA)
- OAuth Login (Google/GitHub)
- Account Locking after multiple failed attempts
- Session Monitoring
- Login History Tracking

This authentication architecture provides a secure foundation for a production-level MERN application.
