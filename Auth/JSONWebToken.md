# JSON Web Tokens
- JWT is an open standard that defines a compact and contained way of securely transmitting information between parties as a JSON Object.

## When to use JWT
- Authorization -> To verify the user
- Information Exchange -> secure transmission of information

## JSON Web Token Structure
- JSON Web Token Typically consists of three parts seperated by dots.
1. Header
2. Payload
3. Signature
```
xxxxx.yyyyy.zzzzz
```

### Header
- Header consists of two parts -> Type of Token (JWT) and Signing Algorithm used (eg. HMAC, SHA256, RSA)

eg.
```
{
    "alg": "HS256",
    "typ": "JWT"
}
```
This JSON is encoded to form the first part of JWT

### Payload
- It contains the claims
- Claims are the statements about an entity and additional Data.

eg.
```
{
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true
}
```
This JSON is encoded to form the second part of JWT

### Signature
- This takes the encoded header, encoded payload, a secret, the algorithm specified in header and sign it.

For example, if you want to use the HMAC SHA256 algorithm, the signature will be created in the following way:

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

