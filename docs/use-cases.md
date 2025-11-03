# Use Cases

## Overview

- This section contains the application's **workflows** (positive, negative and edge scenarios) for the Sign in, Login and Transactions features.

### Sign In feature

Tigger (Frontend):
 
- The user clicks the "Sign In" button on the registration form after filling all required fields.
 
Tigger (Backend):
 
- A POST request is sent to the user registration endpoint with valid and/or invalid data.
 
### Positive Scenarios
 
#### UC-001: Successful user registration (Frontend)

**Description:**

Allows a new user to sign up filling all the form fields through the SignUp form.
 
**Preconditions:**

- None
 
**Steps:**

1. Enter a name, lastname, email and password.
2. Click the Signup button
 
**Expected result:**

- The user signs in successfully.
 
#### UC-002: Successful user registration via API (Backend)

**Description:**

Allows a new user to sign in successfully though the backend API.

**Preconditions:**

- The email used for registration does not already exist in the system.

**Steps:**

1. The client sends a POST request to /api/register including firstName, lastName, email and password.
2. The backend validates the input data and creates a new user record.
3. The backend generates an authentication token and returns it along with created user object.

**Expected result:**

- The API returns a successful response with user data and valid authentication token.
 
### Negative Scenarios
 
#### UC-003: Email already exists (Frontend)
 
**Description:**

Ensures the system prevents sign in when duplicate emails are provided.
 
**Preconditions:**

- A user with the given email adress already exists in the system.
 
**Steps:**

1. Enter a name, lastname and password.
2. Enter an email adress that already exists in the system.
3. Click the Signup button
 
**Expected result:**

- An error message displays indicating the email already exists.
- The user remains on the sign in screen.


#### UC-004: Email already exists in the API (Backend)
 
**Description:**

Ensures the system prevents sign in from the API when duplicate emails are provided.
 
**Preconditions:**

- A user with the given email adress already exists in the system.
 
**Steps:**

1. The client sends a POST request to **/api/auth/signup** with firstName, lastName, email and password.
2. The backend validates the data and detects that the email is already in use.
3. The backend returns an error response indicating the conflict.
 
**Expected result:**

- The API returns an error message and prevents duplicate user creation.


--------