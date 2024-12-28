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
This endpoint allows users to register an account by providing their email, password, name, age, gender, and gender preference. If the email address is already registered, the user will be prompted to log in instead.

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
  "name": "Your Name",
  "age": 25,
  "gender": "Male",
  "genderPreference": "Both"
}
```

### **Example Responses**

#### **Success Response for Registration:**

```json
{
  "message": "Registration successful! Please login",
  "success": true,
  "user": {
    "email": "user@example.com",
    "name": "Your Name",
    "age": 25,
    "gender": "Male",
    "genderPreference": "Both"
  }
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

---

## **Login**

### **Endpoint:** `POST http://localhost:3000/api/auth/login`

**Description:**
This endpoint allows users to log in by providing their email and password. Users must have verified their email address to log in.

### **Request:**

- **URL:** `http://localhost:3000/api/auth/login`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
- **Body:**

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

### **Example Responses**

#### **Success Response for Login:**

```json
{
  "message": "Login successful",
  "success": true,
  "user": {
    "email": "user@example.com",
    "name": "Your Name",
    "age": 25,
    "gender": "Male",
    "genderPreference": "Both"
  }
}
```

#### **Error Response for Invalid Credentials:**

```json
{
  "message": "Invalid credentials",
  "success": false
}
```

#### **Error Response for Unverified Email:**

```json
{
  "message": "Email is not verified",
  "success": false
}
```

---

## **Logout**

### **Endpoint:** `GET http://localhost:3000/api/auth/logout`

**Description:**
This endpoint allows users to log out by clearing the authentication cookie.

### **Request:**

- **URL:** `http://localhost:3000/api/auth/logout`
- **Method:** `GET`

### **Example Responses**

#### **Success Response for Logout:**

```json
{
  "message": "Logout successful",
  "success": true
}
```

---

## **Update Profile**

### **Endpoint:** `PUT http://localhost:3000/api/users/update`

**Description:**
This endpoint allows users to update their profile information, including their profile picture.

### **Request:**

- **URL:** `http://localhost:3000/api/users/update`
- **Method:** `PUT`
- **Headers:**
  - `Content-Type: application/json`
- **Body:**

```json
{
  "name": "New Name",
  "age": 26,
  "gender": "Male",
  "genderPreference": "Both",
  "bio": "New bio content",
  "image": "base64ImageString"
}
```

### **Example Responses**

#### **Success Response for Updating Profile:**

```json
{
  "message": "Profile updated successfully",
  "success": true,
  "user": {
    "name": "New Name",
    "age": 26,
    "gender": "Male",
    "genderPreference": "Both",
    "bio": "New bio content",
    "image": "https://cloudinary.com/secure_url.jpg"
  }
}
```

#### **Error Response for Failed Image Upload:**

```json
{
  "message": "Failed to upload image",
  "success": false
}
```

---

## **Like User**

### **Endpoint:** `POST http://localhost:3000/api/matches/like/:likedUserID`

**Description:**
This endpoint allows users to like another user's profile.

### **Request:**

- **URL:** `http://localhost:3000/api/matches/like/:likedUserID`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`

### **Example Responses**

#### **Success Response for Liking a User:**

```json
{
  "message": "User liked successfully",
  "success": true,
  "user": {
    "email": "currentUser@example.com",
    "name": "Your Name",
    "age": 25
  }
}
```

#### **Error Response for User Not Found:**

```json
{
  "message": "User not found",
  "success": false
}
```

---

## **Dislike User**

### **Endpoint:** `POST http://localhost:3000/api/matches/dislike/:dislikedUserID`

**Description:**
This endpoint allows users to dislike another user's profile.

### **Request:**

- **URL:** `http://localhost:3000/api/matches/dislike/:dislikedUserID`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`

### **Example Responses**

#### **Success Response for Disliking a User:**

```json
{
  "message": "User disliked successfully",
  "success": true,
  "user": {
    "email": "currentUser@example.com",
    "name": "Your Name",
    "age": 25
  }
}
```

---

## **Block User**

### **Endpoint:** `POST http://localhost:3000/api/matches/block/:blockedUserID`

**Description:**
This endpoint allows users to block another user.

### **Request:**

- **URL:** `http://localhost:3000/api/matches/block/:blockedUserID`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`

### **Example Responses**

#### **Success Response for Blocking a User:**

```json
{
  "message": "User blocked successfully",
  "success": true,
  "user": {
    "email": "currentUser@example.com",
    "name": "Your Name",
    "age": 25
  }
}
```

#### **Error Response for User Not Found:**

```json
{
  "message": "User not found",
  "success": false
}
```

---

## **Unblock User**

### **Endpoint:** `POST http://localhost:3000/api/matches/unblock/:unblockedUserID`

**Description:**
This endpoint allows users to unblock a previously blocked user.

### **Request:**

- **URL:** `http://localhost:3000/api/matches/unblock/:unblockedUserID`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`

### **Example Responses**

Here's the remaining documentation for the APIs you provided:

### **Success Response for Unblocking a User:**

```json
{
  "message": "User unblocked successfully",
  "success": true,
  "user": {
    "email": "currentUser@example.com",
    "name": "Your Name",
    "age": 25
  }
}
```

#### **Error Response for User Not Found in Blocked List:**

```json
{
  "message": "User not found in blocked list",
  "success": false
}
```

## **Get Liked Users**

### **Endpoint:** `GET http://localhost:3000/api/matches/liked-users`

**Description:**
This endpoint retrieves the list of users that the current user has liked.

### **Request:**

- **URL:** `http://localhost:3000/api/matches/liked-users`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>`

### **Example Responses**

#### **Success Response for Fetching Liked Users:**

```json
{
  "message": "Liked users fetched successfully",
  "success": true,
  "likes": [
    {
      "name": "User 1",
      "image": "https://cloudinary.com/secure_url.jpg",
      "age": 25
    },
    {
      "name": "User 2",
      "image": "https://cloudinary.com/secure_url2.jpg",
      "age": 30
    }
  ]
}
```

#### **Error Response for Current User Not Found:**

```json
{
  "message": "User not found",
  "success": false
}
```

---

## **Get Disliked Users**

### **Endpoint:** `GET http://localhost:3000/api/matches/disliked-users`

**Description:**
This endpoint retrieves the list of users that the current user has disliked.

### **Request:**

- **URL:** `http://localhost:3000/api/matches/disliked-users`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>`

### **Example Responses**

#### **Success Response for Fetching Disliked Users:**

```json
{
  "message": "Disliked users fetched successfully",
  "success": true,
  "dislikes": [
    {
      "name": "User 1",
      "image": "https://cloudinary.com/secure_url.jpg",
      "age": 25
    },
    {
      "name": "User 2",
      "image": "https://cloudinary.com/secure_url2.jpg",
      "age": 30
    }
  ]
}
```

#### **Error Response for Current User Not Found:**

```json
{
  "message": "User not found",
  "success": false
}
```

---

## **Get Matches**

### **Endpoint:** `GET http://localhost:3000/api/matches`

**Description:**
This endpoint retrieves the list of users that the current user has matched with.

### **Request:**

- **URL:** `http://localhost:3000/api/matches`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>`

### **Example Responses**

#### **Success Response for Fetching Matches:**

```json
{
  "message": "Matches retrieved successfully",
  "success": true,
  "matches": [
    {
      "name": "User 1",
      "image": "https://cloudinary.com/secure_url.jpg",
      "age": 25
    },
    {
      "name": "User 2",
      "image": "https://cloudinary.com/secure_url2.jpg",
      "age": 30
    }
  ]
}
```

#### **Error Response for Server Error:**

```json
{
  "message": "Server error",
  "success": false
}
```

---

## **Get User Profiles**

### **Endpoint:** `GET http://localhost:3000/api/matches/user-profiles`

**Description:**
This endpoint retrieves a list of user profiles excluding the current user, liked, disliked, matched, and blocked users, and based on the user's gender preference.

### **Request:**

- **URL:** `http://localhost:3000/api/matches/user-profiles`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>`

### **Example Responses**

#### **Success Response for Fetching User Profiles:**

```json
{
  "message": "Users retrieved successfully",
  "success": true,
  "users": [
    {
      "name": "User 1",
      "image": "https://cloudinary.com/secure_url.jpg",
      "age": 25,
      "gender": "Male",
      "genderPreference": "Both"
    },
    {
      "name": "User 2",
      "image": "https://cloudinary.com/secure_url2.jpg",
      "age": 30,
      "gender": "Female",
      "genderPreference": "Both"
    }
  ]
}
```

#### **Error Response for Server Error:**

```json
{
  "message": "Server error",
  "success": false
}
```

---

## **Get Blocked Users**

### **Endpoint:** `GET http://localhost:3000/api/matches/block-user-profile`

**Description:**
This endpoint retrieves the list of users that the current user has blocked.

### **Request:**

- **URL:** `http://localhost:3000/api/matches/block-user-profile`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>`

### **Example Responses**

#### **Success Response for Fetching Blocked Users:**

```json
{
  "message": "Blocked users fetched successfully",
  "success": true,
  "blocked": [
    {
      "name": "User 1",
      "image": "https://cloudinary.com/secure_url.jpg",
      "age": 25
    },
    {
      "name": "User 2",
      "image": "https://cloudinary.com/secure_url2.jpg",
      "age": 30
    }
  ]
}
```

#### **Error Response for Current User Not Found:**

```json
{
  "message": "User not found",
  "success": false
}
```
