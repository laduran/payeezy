# Express, Node, Typescript

## Usage Instructions

### To run the app,

 - Install dependencies with `npm install`
 - Install typings with `tsd install` (If this does not work use tsd reinstall)
 - Compile app with `gulp compile`
 - Run app with `npm test` or `node server/main.js`
 - Run `gulp compile` for compile Typescript to JavaScript
 For Test
  - Use Postmand to Test with GET, default port `localhost:7777/api/getToken`
  OR
  - Use Postman to Test with POST (Purchase or Authorize), default port `localhost:7777/api/purchase`,
  ``` JSON 
    `with like this data` : {  
   "method":"credit_card",
   "amount":"1299",
   "currency_code":"USD",
   "credit_card":{  
      "card_number":"4444333322221111",
      "cvv":"123",
      "type":"visa",
      "exp_date":"0520",
      "cardholder_name":"Manish Karn"
   },
   "billing_address":{  
      "street":"225 Liberty Street",
      "city":"NYC",
      "state_province":"NY",
      "zip_postal_code":"10281",
      "country":"US"
   }
}
```

- OR
- Use Postman to Test with POST (Refund or Void), default port `localhost:7777/api/refund`,

``` JSON 
   `with like this data` : 
   {
    "id": "ET110489",
    "transaction" : {
      "method":"credit_card",
      "amount":"1299",
      "currency_code":"USD",
      "credit_card":{  
          "card_number":"4444333322221111",
          "cvv":"123",
          "type":"visa",
          "exp_date":"0520",
          "cardholder_name":"Manish Karn"
        },
      "billing_address":{  
          "street":"225 Liberty Street",
          "city":"NYC",
          "state_province":"NY",
          "zip_postal_code":"10281",
          "country":"US"
      }
    }
}
```