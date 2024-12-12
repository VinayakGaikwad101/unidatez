# API Documentation: Email Pre-Registration

## Endpoint: `POST http://localhost:3000/api/pre-register/save/email`

### Description

This endpoint allows users to pre-register their email addresses for notifications about the upcoming launch. The email address will be stored in the database if it is not already registered.

### Request

**URL:** `http://localhost:3000/api/pre-register/save/email`

**Method:** `POST`

**Headers:**

- `Content-Type: application/json`

**Body:**

```json
{
  "email": "user@example.com"
}
```
