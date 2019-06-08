const request = require("request");
var rp = require('request-promise');
const ErrorMessageFactory = require("../errors/ErrorFactory");

class ServiceTemplate{
    static async post(url, headers, data){
        let options = {
            "method": "POST",
            "uri": url,
            "body": data,
            "headers": headers
        }
        return await this.sendRequest(options)
    }

    static async get(url, headers){
        let options = {
            "method": "GET",
            "uri": url,
            "headers": headers
        }
        return await this.sendRequest(options);
    }

    static async put(url, headers, data){
        let options = {
            "method": "PUT",
            "uri": url,
            "body": data,
            "headers": headers
        }
        return await this.sendRequest(options);
    }

    static async head(url, headers){
        let options = {
            "method": "HEAD",
            "uri": url,
            "headers": headers
        }
        return await this.sendRequest(options);
    }

    static async sendRequest(options){
        return await rp(options);
    }
}

module.exports = ServiceTemplate