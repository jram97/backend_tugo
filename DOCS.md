<a name="top"></a>
# tugo v0.0.0



 - [Auth](#Auth)
   - [Authenticate](#Authenticate)
   - [Authenticate with Facebook](#Authenticate-with-Facebook)
   - [Authenticate with Google](#Authenticate-with-Google)
   - [Authenticate with Phone](#Authenticate-with-Phone)
 - [Card](#Card)
   - [Create Card](#Create-Card)
   - [Delete Card](#Delete-Card)
   - [Retrieve Card](#Retrieve-Card)
   - [Retrieve Cards](#Retrieve-Cards)
   - [Update Card](#Update-Card)
 - [Experiences](#Experiences)
   - [Create experiences](#Create-experiences)
   - [Delete experiences](#Delete-experiences)
   - [Retrieve experiences](#Retrieve-experiences)
   - [Show experiences by category](#Show-experiences-by-category)
   - [Update experiences](#Update-experiences)
 - [Favorites](#Favorites)
   - [Create favorites](#Create-favorites)
   - [Delete favorites](#Delete-favorites)
   - [Retrieve favorites](#Retrieve-favorites)
 - [Images](#Images)
   - [Create images](#Create-images)
   - [Delete images](#Delete-images)
   - [Retrieve images](#Retrieve-images)
 - [Messages](#Messages)
   - [Create messages](#Create-messages)
   - [Delete messages](#Delete-messages)
   - [Retrieve messages](#Retrieve-messages)
   - [Update payments](#Update-payments)
 - [Payments](#Payments)
   - [Create payments](#Create-payments)
   - [Delete payments](#Delete-payments)
   - [Retrieve payments](#Retrieve-payments)
   - [Update payments](#Update-payments)
 - [Review](#Review)
   - [Create review](#Create-review)
   - [Delete review](#Delete-review)
   - [Retrieve review](#Retrieve-review)
   - [Retrieve reviews](#Retrieve-reviews)
   - [Update review](#Update-review)
 - [Schedule](#Schedule)
   - [Create schedule](#Create-schedule)
   - [Delete schedule](#Delete-schedule)
   - [Retrieve schedule](#Retrieve-schedule)
   - [Retrieve schedules](#Retrieve-schedules)
   - [Schedule by day](#Schedule-by-day)
   - [Update schedule](#Update-schedule)
 - [User](#User)
   - [Add Firebase Token for User](#Add-Firebase-Token-for-User)
   - [Available phone](#Available-phone)
   - [Create user](#Create-user)
   - [Delete user](#Delete-user)
   - [Receive Code Verification](#Receive-Code-Verification)
   - [Retrieve current user](#Retrieve-current-user)
   - [Retrieve user](#Retrieve-user)
   - [Retrieve user&#39;s cards](#Retrieve-user&#39;s-cards)
   - [Retrieve users](#Retrieve-users)
   - [Send Code Verification](#Send-Code-Verification)
   - [Update password](#Update-password)
   - [Update user](#Update-user)

___


# <a name='Auth'></a> Auth

## <a name='Authenticate'></a> Authenticate
[Back to top](#top)

```
POST /auth
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Basic authorization with email and password.</p> |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |

## <a name='Authenticate-with-Facebook'></a> Authenticate with Facebook
[Back to top](#top)

```
POST /auth/facebook
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>Facebook user accessToken.</p> |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 401 |  | <p>Invalid credentials.</p> |

## <a name='Authenticate-with-Google'></a> Authenticate with Google
[Back to top](#top)

```
POST /auth/google
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>Google user accessToken.</p> |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 401 |  | <p>Invalid credentials.</p> |

## <a name='Authenticate-with-Phone'></a> Authenticate with Phone
[Back to top](#top)

```
POST /auth/phone
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Basic authorization with phone and password.</p> |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>User <code>access_token</code> to be passed to other requests.</p> |
| user | `Object` | <p>Current user's data.</p> |

# <a name='Card'></a> Card

## <a name='Create-Card'></a> Create Card
[Back to top](#top)

```
POST /cards
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| type | `String` | <p>Card's type.</p> |
| card | `String` | <p>Card's card.</p> |
| date | `String` | <p>Card's date.</p> |
| cvv | `String` | <p>Card's cvv.</p> |
| name | `String` | <p>Card's name.</p> |
| ip | `String` | <p>Card's ip.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| card | `Object` | <p>Card's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Card not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Delete-Card'></a> Delete Card
[Back to top](#top)

```
DELETE /cards/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |

### Success response

#### Success response - `Success 204`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 204 |  | <p>No Content.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 404 |  | <p>Card not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Retrieve-Card'></a> Retrieve Card
[Back to top](#top)

```
GET /cards/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| card | `Object` | <p>Card's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Card not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Retrieve-Cards'></a> Retrieve Cards
[Back to top](#top)

```
GET /cards
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| q | `String` | **optional** <p>Query to search.</p> |
| page | `Number` | **optional** <p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional** <p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional** <p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional** <p>Fields to be returned.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| count | `Number` | <p>Total amount of Card.</p> |
| rows | `Object[]` | <p>List of Card.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Update-Card'></a> Update Card
[Back to top](#top)

```
PUT /cards/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| type | `String` | <p>Card's type.</p> |
| card | `String` | <p>Card's card.</p> |
| date | `String` | <p>Card's date.</p> |
| cvv | `String` | <p>Card's cvv.</p> |
| name | `String` | <p>Card's name.</p> |
| ip | `String` | <p>Card's ip.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| card | `Object` | <p>Card's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Card not found.</p> |
| 401 |  | <p>user access only.</p> |

# <a name='Experiences'></a> Experiences

## <a name='Create-experiences'></a> Create experiences
[Back to top](#top)

```
POST /experiences
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| name | `String` | <p>Experiences's name.</p> |
| description | `String` | <p>Experiences's description.</p> |
| direction | `String` | <p>Experiences's direction.</p> |
| price | `String` | <p>Experiences's price.</p> |
| lat | `String` | <p>Experiences's latitud.</p> |
| long | `String` | <p>Experiences's longitud.</p> |
| quotas | `String` | <p>Experiences's quotas.</p> |
| start | `String` | <p>Experiences's start.</p> |
| end | `String` | <p>Experiences's end.</p> |
| duration | `String` | <p>Experiences's duration.</p> |
| extra | `Array` | <p>Experiences's extra.</p> |
| enabled | `Boolean` | **optional** <p>Experiences's enabled.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| experiences | `Object` | <p>Experiences's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Experiences not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Delete-experiences'></a> Delete experiences
[Back to top](#top)

```
DELETE /experiences/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |

### Success response

#### Success response - `Success 204`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 204 |  | <p>No Content.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 404 |  | <p>Experiences not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Retrieve-experiences'></a> Retrieve experiences
[Back to top](#top)

```
GET /experiences
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `String` | **optional** <p>user created experience.</p> |
| direction | `String` | **optional** <p>direction experience.</p> |
| rating | `Number` | **optional** <p>read message.</p> |
| q | `String` | **optional** <p>Query to search.</p> |
| page | `Number` | **optional** <p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional** <p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional** <p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional** <p>Fields to be returned.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| count | `Number` | <p>Total amount of experiences.</p> |
| rows | `Object[]` | <p>List of experiences.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |

## <a name='Show-experiences-by-category'></a> Show experiences by category
[Back to top](#top)

```
GET /experiences/:idCategory
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| count | `Number` | <p>Total amount of experiences.</p> |
| rows | `Object[]` | <p>List of experiences.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 404 |  | <p>Experiences not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Update-experiences'></a> Update experiences
[Back to top](#top)

```
PUT /experiences/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| name | `String` | <p>Experiences's name.</p> |
| description | `String` | <p>Experiences's description.</p> |
| direction | `String` | <p>Experiences's direction.</p> |
| price | `String` | <p>Experiences's price.</p> |
| lat | `String` | <p>Experiences's latitud.</p> |
| long | `String` | <p>Experiences's longitud.</p> |
| quotas | `String` | <p>Experiences's quotas.</p> |
| start | `String` | <p>Experiences's start.</p> |
| end | `String` | <p>Experiences's end.</p> |
| duration | `String` | <p>Experiences's duration.</p> |
| extra | `Array` | <p>Experiences's extra.</p> |
| enabled | `Boolean` | **optional** <p>Experiences's enabled.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| experiences | `Object` | <p>Experiences's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Experiences not found.</p> |
| 401 |  | <p>user access only.</p> |

# <a name='Favorites'></a> Favorites

## <a name='Create-favorites'></a> Create favorites
[Back to top](#top)

```
POST /favorites
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| experiences | `ObjectId` | <p>Favorites's experiencesId.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| favorites | `Object` | <p>Favorites's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Favorites not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Delete-favorites'></a> Delete favorites
[Back to top](#top)

```
DELETE /favorites/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |

### Success response

#### Success response - `Success 204`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 204 |  | <p>No Content.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 404 |  | <p>Favorites not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Retrieve-favorites'></a> Retrieve favorites
[Back to top](#top)

```
GET /favorites
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| user | `String` | **optional** <p>user created favorite.</p> |
| q | `String` | **optional** <p>Query to search.</p> |
| page | `Number` | **optional** <p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional** <p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional** <p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional** <p>Fields to be returned.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| count | `Number` | <p>Total amount of favorites.</p> |
| rows | `Object[]` | <p>List of favorites.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>user access only.</p> |

# <a name='Images'></a> Images

## <a name='Create-images'></a> Create images
[Back to top](#top)

```
POST /images
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `[File]` | <p>Send files.</p> |
| experiencesId | `ObjectId` | <p>Experience's Object Id.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| images | `Object` | <p>Images's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Images not found.</p> |

## <a name='Delete-images'></a> Delete images
[Back to top](#top)

```
DELETE /images/:id/:experiencesId
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |

### Success response

#### Success response - `Success 204`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 204 |  | <p>No Content.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 404 |  | <p>Images not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Retrieve-images'></a> Retrieve images
[Back to top](#top)

```
GET /images
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| q | `String` | **optional** <p>Query to search.</p> |
| page | `Number` | **optional** <p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional** <p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional** <p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional** <p>Fields to be returned.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| count | `Number` | <p>Total amount of images.</p> |
| rows | `Object[]` | <p>List of images.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |

# <a name='Messages'></a> Messages

## <a name='Create-messages'></a> Create messages
[Back to top](#top)

```
POST /messages
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| user_by | `ObjectId` | <p>Messages's user_by.</p> |
| text | `String` | <p>Messages's text.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| messages | `Object` | <p>Messages's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Messages not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Delete-messages'></a> Delete messages
[Back to top](#top)

```
DELETE /messages/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |

### Success response

#### Success response - `Success 204`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 204 |  | <p>No Content.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 404 |  | <p>Messages not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Retrieve-messages'></a> Retrieve messages
[Back to top](#top)

```
GET /messages
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| by | `ObjectId` | **optional** <p>user_by'Id to Search.</p> |
| from | `ObjectId` | **optional** <p>user_from'Id to Search.</p> |
| read | `Boolean` | **optional** <p>read message to Search.</p> |
| q | `String` | **optional** <p>Query to search.</p> |
| page | `Number` | **optional** <p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional** <p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional** <p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional** <p>Fields to be returned.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| count | `Number` | <p>Total amount of messages.</p> |
| rows | `Object[]` | <p>List of messages.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Update-payments'></a> Update payments
[Back to top](#top)

```
PUT /messages/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| read | `Boolean` | <p>Message's read.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| messages | `Object` | <p>Message's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Message not found.</p> |
| 401 |  | <p>user access only.</p> |

# <a name='Payments'></a> Payments

## <a name='Create-payments'></a> Create payments
[Back to top](#top)

```
POST /payments
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| experiences | `ObjectId` | <p>Payments's experiences.</p> |
| date | `String` | <p>Payments's date.</p> |
| adult | `String` | <p>Payments's adult.</p> |
| children | `String` | **optional** <p>Payments's children.</p> |
| card | `ObjectId` | <p>Payments's card.</p> |
| mount | `String` | <p>Payments's mount.</p> |
| enabled | `Boolean` | **optional** <p>Payments's enabled.</p> |
| pay | `Boolean` | **optional** <p>Payments's pay.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| payments | `Object` | <p>Payments's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Payments not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Delete-payments'></a> Delete payments
[Back to top](#top)

```
DELETE /payments/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |

### Success response

#### Success response - `Success 204`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 204 |  | <p>No Content.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 404 |  | <p>Payments not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Retrieve-payments'></a> Retrieve payments
[Back to top](#top)

```
GET /payments
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| q | `String` | **optional** <p>Query to search.</p> |
| page | `Number` | **optional** <p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional** <p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional** <p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional** <p>Fields to be returned.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| count | `Number` | <p>Total amount of payments.</p> |
| rows | `Object[]` | <p>List of payments.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Update-payments'></a> Update payments
[Back to top](#top)

```
PUT /payments/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| experiences | `ObjectId` | <p>Payments's experiences.</p> |
| date | `String` | <p>Payments's date.</p> |
| adult | `String` | <p>Payments's adult.</p> |
| children | `String` | **optional** <p>Payments's children.</p> |
| card | `ObjectId` | <p>Payments's card.</p> |
| mount | `String` | <p>Payments's mount.</p> |
| enabled | `Boolean` | **optional** <p>Payments's enabled.</p> |
| pay | `Boolean` | **optional** <p>Payments's pay.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| payments | `Object` | <p>Payments's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Payments not found.</p> |
| 401 |  | <p>user access only.</p> |

# <a name='Review'></a> Review

## <a name='Create-review'></a> Create review
[Back to top](#top)

```
POST /reviews
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| experiences | `ObjectId` | <p>Review's experiencesId.</p> |
| title | `String` | <p>Review's title.</p> |
| description | `String` | <p>Review's description.</p> |
| star | `String` | <p>Review's star.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| review | `Object` | <p>Review's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Review not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Delete-review'></a> Delete review
[Back to top](#top)

```
DELETE /reviews/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |

### Success response

#### Success response - `Success 204`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 204 |  | <p>No Content.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 404 |  | <p>Review not found.</p> |
| 401 |  | <p>user access only.</p> |

## <a name='Retrieve-review'></a> Retrieve review
[Back to top](#top)

```
GET /reviews/:id
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| review | `Object` | <p>Review's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Review not found.</p> |

## <a name='Retrieve-reviews'></a> Retrieve reviews
[Back to top](#top)

```
GET /reviews
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| q | `String` | **optional** <p>Query to search.</p> |
| page | `Number` | **optional** <p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional** <p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional** <p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional** <p>Fields to be returned.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| count | `Number` | <p>Total amount of reviews.</p> |
| rows | `Object[]` | <p>List of reviews.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |

## <a name='Update-review'></a> Update review
[Back to top](#top)

```
PUT /reviews/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>user access token.</p> |
| experiences | `ObjectId` | <p>Review's experiencesId.</p> |
| title | `String` | <p>Review's title.</p> |
| description | `String` | <p>Review's description.</p> |
| star | `String` | <p>Review's star.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| review | `Object` | <p>Review's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Review not found.</p> |
| 401 |  | <p>user access only.</p> |

# <a name='Schedule'></a> Schedule

## <a name='Create-schedule'></a> Create schedule
[Back to top](#top)

```
POST /schedules
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>owner access token.</p> |
| day | `String` | <p>Schedule's day.</p> |
| start | `String` | <p>Schedule's start.</p> |
| experience | `ObjectId` | <p>Schedule's experience.</p> |
| date | `date` | <p>Schedule's date.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| schedule | `Object` | <p>Schedule's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Schedule not found.</p> |
| 401 |  | <p>owner access only.</p> |

## <a name='Delete-schedule'></a> Delete schedule
[Back to top](#top)

```
DELETE /schedules/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>owner access token.</p> |

### Success response

#### Success response - `Success 204`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 204 |  | <p>No Content.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 404 |  | <p>Schedule not found.</p> |
| 401 |  | <p>owner access only.</p> |

## <a name='Retrieve-schedule'></a> Retrieve schedule
[Back to top](#top)

```
GET /schedules/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>admin access token.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| schedule | `Object` | <p>Schedule's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Schedule not found.</p> |
| 401 |  | <p>admin access only.</p> |

## <a name='Retrieve-schedules'></a> Retrieve schedules
[Back to top](#top)

```
GET /schedules
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| experience | `String` | **optional** <p>Experience'Id to Search.</p> |
| q | `String` | **optional** <p>Query to search.</p> |
| page | `Number` | **optional** <p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional** <p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional** <p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional** <p>Fields to be returned.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| count | `Number` | <p>Total amount of schedules.</p> |
| rows | `Object[]` | <p>List of schedules.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |

## <a name='Schedule-by-day'></a> Schedule by day
[Back to top](#top)

```
GET /by-day
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| experience | `String` | <p>Experience'Id</p> |
| day | `String` | **optional** <p>Retrive the schedule for a specific day e.g &quot;Lunes&quot;,&quot;Martes&quot;</p> |
| date | `Date` | **optional** <p>Retrive the schedule for a specific date using the format e.g 06/07/2021</p> |
| q | `String` | **optional** <p>Query to search.</p> |
| page | `Number` | **optional** <p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional** <p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional** <p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional** <p>Fields to be returned.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| count | `Number` | <p>Total amount of schedules.</p> |
| rows | `Object[]` | <p>, result.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |

## <a name='Update-schedule'></a> Update schedule
[Back to top](#top)

```
PUT /schedules/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>owner access token.</p> |
| day | `String` | <p>Schedule's day.</p> |
| start | `String` | <p>Schedule's start.</p> |
| experience | `ObjectId` | <p>Schedule's experience.</p> |
| date | `Date` | <p>Schedule's date.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| schedule | `Object` | <p>Schedule's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 404 |  | <p>Schedule not found.</p> |
| 401 |  | <p>owner access only.</p> |

# <a name='User'></a> User

## <a name='Add-Firebase-Token-for-User'></a> Add Firebase Token for User
[Back to top](#top)

```
PUT /users/token/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>User access_token.</p> |
| firebaseTokens | `[String]` | <p>User's firebaseTokens.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | <p>User's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Current user or admin access only.</p> |
| 404 |  | <p>User not found.</p> |

## <a name='Available-phone'></a> Available phone
[Back to top](#top)

```
GET /users/phone-available?phone=
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | <p>Available phone.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |

## <a name='Create-user'></a> Create user
[Back to top](#top)

```
POST /users
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| email | `String` | **optional** <p>User's email.</p> |
| password | `String` | <p>User's password.</p>_Size range: 6.._<br> |
| name | `String` | **optional** <p>User's name.</p> |
| phone | `String` | <p>User's phone.</p> |
| picture | `String` | **optional** <p>User's picture.</p> |
| role | `String` | **optional** <p>User's role.</p>_Default value: user_<br>_Allowed values: user,admin,owner_ |

### Success response

#### Success response - `Sucess 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | <p>User's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 409 |  | <p>Email already registered.</p> |

## <a name='Delete-user'></a> Delete user
[Back to top](#top)

```
DELETE /users/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>User access_token.</p> |

### Success response

#### Success response - `Success 204`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 204 |  | <p>No Content.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 401 |  | <p>Admin access only.</p> |
| 404 |  | <p>User not found.</p> |

## <a name='Receive-Code-Verification'></a> Receive Code Verification
[Back to top](#top)

```
POST /users/receive-code
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| phone | `String` | <p>The user's phone where the code verification was sent.</p> |
| code | `String` | <p>The code that was sent.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| data | `Object[]` | <p>Receive from Twilio.</p> |

### Error response

#### Error response - `Sucess 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 401 |  | <p>Credentials error from Twilio.</p> |

## <a name='Retrieve-current-user'></a> Retrieve current user
[Back to top](#top)

```
GET /users/me
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>User access_token.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | <p>User's data.</p> |

## <a name='Retrieve-user'></a> Retrieve user
[Back to top](#top)

```
GET /users/:id
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | <p>User's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 404 |  | <p>User not found.</p> |

## <a name='Retrieve-user&#39;s-cards'></a> Retrieve user&#39;s cards
[Back to top](#top)

```
GET /users/my-cards
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>User access_token.</p> |
| q | `String` | **optional** <p>Query to search.</p> |
| page | `Number` | **optional** <p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional** <p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional** <p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional** <p>Fields to be returned.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| count | `Int` | <p>total cards</p> |
| rows | `Object[]` | <p>of user's cards.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Admin access only.</p> |

## <a name='Retrieve-users'></a> Retrieve users
[Back to top](#top)

```
GET /users
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>User access_token.</p> |
| q | `String` | **optional** <p>Query to search.</p> |
| page | `Number` | **optional** <p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br> |
| limit | `Number` | **optional** <p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br> |
| sort | `String[]` | **optional** <p>Order of returned items.</p>_Default value: -createdAt_<br> |
| fields | `String[]` | **optional** <p>Fields to be returned.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| users | `Object[]` | <p>List of users.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Admin access only.</p> |

## <a name='Send-Code-Verification'></a> Send Code Verification
[Back to top](#top)

```
POST /users/send-code
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| phone | `String` | <p>The user's phone where the code verification will be sent.</p> |

### Success response

#### Success response - `Sucess 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| data | `Object[]` | <p>Receive from Twilio.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Credentials error from Twilio.</p> |

## <a name='Update-password'></a> Update password
[Back to top](#top)

```
PUT /users/:id/password
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | `String` | <p>Basic authorization with email and password.</p> |

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| password | `String` | <p>User's new password.</p>_Size range: 6.._<br> |

### Success response

#### Success response - `Success 201`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | <p>User's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Current user access only.</p> |
| 404 |  | <p>User not found.</p> |

## <a name='Update-user'></a> Update user
[Back to top](#top)

```
PUT /users/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| access_token | `String` | <p>User access_token.</p> |
| name | `String` | <p>User's name.</p> |
| phone | `String` | <p>User's phone.</p> |
| description | `String` | <p>User's description.</p> |
| birthday | `String` | <p>User's birthday.</p> |
| gender | `String` | <p>User's gender.</p> |
| direction | `String` | <p>User's direction.</p> |
| alias | `String` | <p>User's alias.</p> |
| picture | `String` | **optional** <p>User's picture.</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user | `Object` | <p>User's data.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| 400 | `Object` | <p>Some parameters may contain invalid values.</p> |
| 401 |  | <p>Current user or admin access only.</p> |
| 404 |  | <p>User not found.</p> |
