Base URL: http://localhost:3000

# Common Response Format
## Error Response
- 4xx
  ```JSON
  {
      "status" : false,
      "message": "Login Failed",
      "error" : "Error description",
      "stack": [ "String" ]
  }
  ```
- 500
  ```JSON
  {
      "status": false,
      "message": "Internal Server Error",
      "error": "error message"
  }
  ```

# Authentication

## Login Endpoint

- Endpoint: `/auth/login`
- Method: POST
- Request body
  ```JSON
  {
      "emailOrUsername": "devesh@gmail.com",
      "password": "@Devesh12345"
  }
  ```
- Response
  - 200 :
    ```JSON
    {
        "status": true,
        "message": "Login Successful",
        "data": {
            "accessToken": "",
            "refreshToken": ""
        }
    }
    ```
  - 4xx :
    ```JSON
    {
        "status" : false,
        "message": "Login Failed",
        "error" : "Error description"
    }
    ```

## Register Endpoint
- Endpoint: `/auth/signup`
- Method: POST
- Request body

  ```JSON
  {
      "name": "Devesh Kumar",
      "username": "devesh",
      "email": "devesh@gmail.com",
      "phone": "+91-9569543114",
      "password": "@Devesh12345"
  }
  ```

- Response
  - 201 :
    ```JSON
    {
        "status": true,
        "message": "Registration Successful",
        "data": null
    }
    ```
  - 4xx :
    ```JSON
    {
        "status" : false,
        "message": "Registration Failed",
        "error" : "Error description"
    }
    ```

# Admin Mangement
## Vendor Management

- Endpoint: `/admin/vendor`
- Method: GET
- Request body
  ```JSON
  null
  ```
- Response
  - 200 :
    ```JSON
    {
        "status": true,
        "message": "Login Successful",
        "data": [
          {
            
          }
        ]
    }
    ```
  - 4xx :
    ```JSON
    {
        "status" : false,
        "message": "Login Failed",
        "error" : "Error description"
    }
    ```

## Login Endpoint

- Method: POST
- Request body
  ```JSON
  {
      "emailOrUsername": "devesh@gmail.com",
      "password": "@Devesh12345"
  }
  ```
- Response
  - 200 :
    ```JSON
    {
        "status": true,
        "message": "Login Successful",
        "data": {
            "accessToken": "",
            "refreshToken": ""
        }
    }
    ```
  - 4xx :
    ```JSON
    {
        "status" : false,
        "message": "Login Failed",
        "error" : "Error description"
    }
    ```

## Login Endpoint

- Method: POST
- Request body
  ```JSON
  {
      "emailOrUsername": "devesh@gmail.com",
      "password": "@Devesh12345"
  }
  ```
- Response
  - 200 :
    ```JSON
    {
        "status": true,
        "message": "Login Successful",
        "data": {
            "accessToken": "",
            "refreshToken": ""
        }
    }
    ```
  - 4xx :
    ```JSON
    {
        "status" : false,
        "message": "Login Failed",
        "error" : "Error description"
    }
    ```

## Login Endpoint

- Method: POST
- Request body
  ```JSON
  {
      "emailOrUsername": "devesh@gmail.com",
      "password": "@Devesh12345"
  }
  ```
- Response
  - 200 :
    ```JSON
    {
        "status": true,
        "message": "Login Successful",
        "data": {
            "accessToken": "",
            "refreshToken": ""
        }
    }
    ```
  - 4xx :
    ```JSON
    {
        "status" : false,
        "message": "Login Failed",
        "error" : "Error description"
    }
    ```

## Login Endpoint

- Method: POST
- Request body
  ```JSON
  {
      "emailOrUsername": "devesh@gmail.com",
      "password": "@Devesh12345"
  }
  ```
- Response
  - 200 :
    ```JSON
    {
        "status": true,
        "message": "Login Successful",
        "data": {
            "accessToken": "",
            "refreshToken": ""
        }
    }
    ```
  - 4xx :
    ```JSON
    {
        "status" : false,
        "message": "Login Failed",
        "error" : "Error description"
    }
    ```

## Login Endpoint

- Method: POST
- Request body
  ```JSON
  {
      "emailOrUsername": "devesh@gmail.com",
      "password": "@Devesh12345"
  }
  ```
- Response
  - 200 :
    ```JSON
    {
        "status": true,
        "message": "Login Successful",
        "data": {
            "accessToken": "",
            "refreshToken": ""
        }
    }
    ```
  - 4xx :
    ```JSON
    {
        "status" : false,
        "message": "Login Failed",
        "error" : "Error description"
    }
    ```
