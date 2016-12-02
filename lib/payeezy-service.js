'use strict';
var Q = require('q');
var apikey = 'y6pWAJNyJyjGv66IsVuWnklkKUPFbb0a';
var apisecret = '86fbae7030253af3cd15faef2a1f4b67353e41fb6799f576b5093ae52901e6f7';
var merchant_token = 'fdoa-a480ce8951daa73262734cf102641994c1e55e7cdf4c02b6';
var payeezy = require('payeezy')(apikey, apisecret, merchant_token);
var PayeezeService = (function () {
    function PayeezeService() {
        payeezy.host = "api-cert.payeezy.com";
        payeezy.version = "v1";
    }
    PayeezeService.prototype.performTestAuthorizeTransaction = function (req) {
        var _this = this;
        var defer = Q.defer();
        payeezy.transaction.authorize({
            method: 'credit_card',
            amount: '1299',
            currency_code: 'USD',
            credit_card: {
                card_number: '4788250000028291',
                cvv: '123',
                type: 'visa',
                exp_date: '1230',
                cardholder_name: 'Tom Eck'
            },
            billing_address: {
                street: '225 Liberty Street',
                city: 'NYC',
                state_province: 'NY',
                zip_postal_code: '10281',
                country: 'US'
            }
        }, function (e, r) {
            _this.handleResponse(e, r, defer);
        });
        return defer.promise;
    };
    PayeezeService.prototype.performAuthorizeTransaction = function (requestModel) {
        var _this = this;
        var defer = Q.defer();
        payeezy.transaction.authorize(requestModel, function (err, response) {
            _this.handleResponse(err, response, defer);
        });
        return defer.promise;
    };
    PayeezeService.prototype.performRefundTransaction = function (requestModel) {
        var _this = this;
        var defer = Q.defer();
        payeezy.transaction.refund(requestModel.id, requestModel.transaction, function (err, response) {
            _this.handleResponse(err, response, defer);
        });
        return defer.promise;
    };
    PayeezeService.prototype.performVoidTransaction = function (requestModel) {
        var _this = this;
        var defer = Q.defer();
        payeezy.transaction.void(requestModel.id, requestModel.transaction, function (err, response) {
            _this.handleResponse(err, response, defer);
        });
        return defer.promise;
    };
    PayeezeService.prototype.performPurchaseTransaction = function (requestModel) {
        var _this = this;
        var defer = Q.defer();
        payeezy.transaction.purchase((requestModel), function (err, response) {
            _this.handleResponse(err, response, defer);
        });
        return defer.promise;
    };
    PayeezeService.prototype.handleResponse = function (err, resp, defered) {
        var tokenData = {};
        if (err) {
            tokenData.error = err;
            tokenData.message = "Failed";
            defered.reject(tokenData);
        }
        else {
            tokenData.transaction_id = resp.transaction_id;
            tokenData.token = resp.token;
            tokenData.message = "Successfully created";
            defered.resolve(tokenData);
        }
    };
    PayeezeService.prototype.generateToken = function () {
        var defer = Q.defer();
        payeezy.tokens.getToken({
            type: "FDToken",
            credit_card: {
                type: "VISA",
                cardholder_name: "Tom Eck",
                card_number: "4788250000028291",
                exp_date: "1030",
                cvv: "123"
            },
            auth: "false",
            ta_token: "NOIW"
        }, function (error, response) {
            if (error) {
                console.log('Get Token for Card Failed\n' + error);
                defer.reject(error);
            }
            if (response) {
                console.log(JSON.stringify(response.token));
                console.log('FD-Token is generated Successfully, Token Value: ' + JSON.stringify(response.token, null, 4));
                defer.resolve(response.token);
            }
        });
        return defer.promise;
    };
    return PayeezeService;
}());
exports.PayeezeService = PayeezeService;
var payeezyService = new PayeezeService();
exports.payeezyService = payeezyService;
