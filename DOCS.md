# tugo v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	- [Authenticate with Facebook](#authenticate-with-facebook)
	- [Authenticate with Google](#authenticate-with-google)
	- [Authenticate with Phone](#authenticate-with-phone)
	
- [Card](#card)
	- [Create Card](#create-card)
	- [Delete Card](#delete-card)
	- [Retrieve Card](#retrieve-card)
	- [Retrieve Cards](#retrieve-cards)
	- [Update Card](#update-card)
	
- [Experiences](#experiences)
	- [Create experiences](#create-experiences)
	- [Delete experiences](#delete-experiences)
	- [Retrieve experiences](#retrieve-experiences)
	- [Update experiences](#update-experiences)
	
- [Favorites](#favorites)
	- [Create favorites](#create-favorites)
	- [Delete favorites](#delete-favorites)
	- [Retrieve favorites](#retrieve-favorites)
	
- [Images](#images)
	- [Create images](#create-images)
	- [Delete images](#delete-images)
	- [Retrieve images](#retrieve-images)
	
- [Messages](#messages)
	- [Create messages](#create-messages)
	- [Delete messages](#delete-messages)
	- [Retrieve messages](#retrieve-messages)
	- [Update payments](#update-payments)
	
- [Payments](#payments)
	- [Create payments](#create-payments)
	- [Delete payments](#delete-payments)
	- [Retrieve payments](#retrieve-payments)
	- [Update payments](#update-payments)
	
- [Review](#review)
	- [Create review](#create-review)
	- [Delete review](#delete-review)
	- [Retrieve review](#retrieve-review)
	- [Retrieve reviews](#retrieve-reviews)
	- [Update review](#update-review)
	
- [User](#user)
	- [Add Firebase Token for User](#add-firebase-token-for-user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Receive Code Verification](#receive-code-verification)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Send Code Verification](#send-code-verification)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

## Authenticate with Facebook



	POST /auth/facebook


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Facebook user accessToken.</p>							|

## Authenticate with Google



	POST /auth/google


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Google user accessToken.</p>							|

## Authenticate with Phone



	POST /auth/phone

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with phone and password.</p>							|

# Card

## Create Card



	POST /cards


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| type			| String			|  <p>Card's type.</p>							|
| card			| String			|  <p>Card's card.</p>							|
| date			| String			|  <p>Card's date.</p>							|
| cvv			| String			|  <p>Card's cvv.</p>							|
| name			| String			|  <p>Card's name.</p>							|
| ip			| String			|  <p>Card's ip.</p>							|

## Delete Card



	DELETE /cards/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve Card



	GET /cards/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve Cards



	GET /cards


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update Card



	PUT /cards/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| type			| String			|  <p>Card's type.</p>							|
| card			| String			|  <p>Card's card.</p>							|
| date			| String			|  <p>Card's date.</p>							|
| cvv			| String			|  <p>Card's cvv.</p>							|
| name			| String			|  <p>Card's name.</p>							|
| ip			| String			|  <p>Card's ip.</p>							|

# Experiences

## Create experiences



	POST /experiences


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| String			|  <p>Experiences's name.</p>							|
| description			| String			|  <p>Experiences's description.</p>							|
| direction			| String			|  <p>Experiences's direction.</p>							|
| price			| String			|  <p>Experiences's price.</p>							|
| lat			| String			|  <p>Experiences's latitud.</p>							|
| long			| String			|  <p>Experiences's longitud.</p>							|
| quotas			| String			|  <p>Experiences's quotas.</p>							|
| start			| String			|  <p>Experiences's start.</p>							|
| end			| String			|  <p>Experiences's end.</p>							|
| duration			| String			|  <p>Experiences's duration.</p>							|
| extra			| Array			|  <p>Experiences's extra.</p>							|
| enabled			| Boolean			| **optional** <p>Experiences's enabled.</p>							|

## Delete experiences



	DELETE /experiences/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve experiences



	GET /experiences


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update experiences



	PUT /experiences/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| String			|  <p>Experiences's name.</p>							|
| description			| String			|  <p>Experiences's description.</p>							|
| direction			| String			|  <p>Experiences's direction.</p>							|
| price			| String			|  <p>Experiences's price.</p>							|
| lat			| String			|  <p>Experiences's latitud.</p>							|
| long			| String			|  <p>Experiences's longitud.</p>							|
| quotas			| String			|  <p>Experiences's quotas.</p>							|
| start			| String			|  <p>Experiences's start.</p>							|
| end			| String			|  <p>Experiences's end.</p>							|
| duration			| String			|  <p>Experiences's duration.</p>							|
| extra			| Array			|  <p>Experiences's extra.</p>							|
| enabled			| Boolean			| **optional** <p>Experiences's enabled.</p>							|

# Favorites

## Create favorites



	POST /favorites


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| experiences			| ObjectId			|  <p>Favorites's experiencesId.</p>							|

## Delete favorites



	DELETE /favorites/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve favorites



	GET /favorites


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# Images

## Create images



	POST /images


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| [File]			|  <p>Send files.</p>							|
| experiencesId			| ObjectId			|  <p>Experience's Object Id.</p>							|

## Delete images



	DELETE /images/:id/:experiencesId


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve images



	GET /images


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# Messages

## Create messages



	POST /messages


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| user_by			| 			|  <p>Messages's user_by.</p>							|
| text			| 			|  <p>Messages's text.</p>							|

## Delete messages



	DELETE /messages/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve messages



	GET /messages


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| by			| ObjectId			| **optional** <p>user_by'Id.</p>							|
| from			| ObjectId			| **optional** <p>user_from'Id.</p>							|
| read			| Boolean			| **optional** <p>read message.</p>							|

## Update payments



	PUT /messages/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| read			| Boolean			|  <p>Message's read.</p>							|

# Payments

## Create payments



	POST /payments


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| experiences			| ObjectId			|  <p>Payments's experiences.</p>							|
| date			| String			|  <p>Payments's date.</p>							|
| adult			| String			|  <p>Payments's adult.</p>							|
| children			| String			|  <p>Payments's children.</p>							|
| card			| ObjectId			|  <p>Payments's card.</p>							|
| mount			| String			|  <p>Payments's mount.</p>							|
| enabled			| Boolean			| **optional** <p>Payments's enabled.</p>							|
| pay			| Boolean			| **optional** <p>Payments's pay.</p>							|

## Delete payments



	DELETE /payments/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve payments



	GET /payments


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update payments



	PUT /payments/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| experiences			| ObjectId			|  <p>Payments's experiences.</p>							|
| date			| String			|  <p>Payments's date.</p>							|
| adult			| String			|  <p>Payments's adult.</p>							|
| children			| String			|  <p>Payments's children.</p>							|
| card			| ObjectId			|  <p>Payments's card.</p>							|
| mount			| String			|  <p>Payments's mount.</p>							|
| enabled			| Boolean			| **optional** <p>Payments's enabled.</p>							|
| pay			| Boolean			| **optional** <p>Payments's pay.</p>							|

# Review

## Create review



	POST /reviews


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| experiences			| ObjectId			|  <p>Review's experiencesId.</p>							|
| title			| String			|  <p>Review's title.</p>							|
| description			| String			|  <p>Review's description.</p>							|
| star			| String			|  <p>Review's star.</p>							|

## Delete review



	DELETE /reviews/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve review



	GET /reviews/:id


## Retrieve reviews



	GET /reviews


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update review



	PUT /reviews/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| experiences			| ObjectId			|  <p>Review's experiencesId.</p>							|
| title			| String			|  <p>Review's title.</p>							|
| description			| String			|  <p>Review's description.</p>							|
| star			| String			|  <p>Review's star.</p>							|

# User

## Add Firebase Token for User



	PUT /users/token/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| firebaseTokens			| [String]			|  <p>User's firebaseTokens.</p>							|

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			|  <p>User's name.</p>							|
| phone			| String			|  <p>User's phone.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Receive Code Verification



	POST /users/receive-code


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| phone			| String			|  <p>The user's phone where the code verification was sent.</p>							|
| code			| String			|  <p>The code that was sent.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Send Code Verification



	POST /users/send-code


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| phone			| String			|  <p>The user's phone where the code verification will be sent.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			|  <p>User's name.</p>							|
| phone			| String			|  <p>User's phone.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


