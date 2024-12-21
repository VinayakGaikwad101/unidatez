### **API Documentation**

## **Email Pre-Registration**

### **Endpoint:** `POST http://localhost:3000/api/pre-register/save/email`

**Description:**
This endpoint allows users to pre-register their email addresses for notifications about the upcoming launch. The email address will be stored in the database if it is not already registered.

### **Request:**

- **URL:** `http://localhost:3000/api/pre-register/save/email`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "email": "user@example.com"
  }
  ```

### **Example Responses**

#### **Success Response:**
```json
{
  "message": "Pre-registration successful",
  "success": true
}
```

#### **Error Response:**
```json
{
  "message": "Email already registered",
  "success": false
}
```

---

## **User Registration**

### **Endpoint:** `POST http://localhost:3000/api/auth/register`

**Description:**
This endpoint allows users to register an account by providing their email, password, and name. If the email address is already registered, the user will be prompted to log in instead.

### **Request:**

- **URL:** `http://localhost:3000/api/auth/register`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword",
    "name": "Your Name"
  }
  ```

### **Example Responses**

#### **Success Response for Registration:**
```json
{
  "message": "Registration successful",
  "success": true
}
```

#### **Error Response for Registration (Email Exists):**
```json
{
  "message": "Email already exists, please login",
  "success": false
}
```

---

## **Verify Email**

### **Endpoint:** `POST http://localhost:3000/api/auth/verify-email`

**Description:**
This endpoint allows users to verify their email address using a verification code sent to their email upon registration. The verification code must be valid and not expired.

### **Request:**

- **URL:** `http://localhost:3000/api/auth/verify-email`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "code": "123456"
  }
  ```

### **Example Responses**

#### **Success Response for Email Verification:**
```json
{
  "message": "Email verification successful",
  "success": true
}
```

#### **Error Response for Invalid Verification Code:**
```json
{
  "message": "Invalid or expired verification code",
  "success": false
}
```
