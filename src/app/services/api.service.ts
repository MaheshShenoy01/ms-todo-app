import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from './config.service';


@Injectable()
export class ApiService {

    public nativeEl: any;
    constructor (private http: Http, public _configService: ConfigService) {
    }

    request(method, url, data, param = {}) {

        const endPoint = this._configService.getApiEndPoint();
        const apiURL = endPoint + url;

        const headers = new Headers({'Content-type': 'application/json' });
        headers.append('Access-Control-Allow-Origin','*');
        const options = new RequestOptions({ headers: headers });
        const body = JSON.stringify(data);

        let request;
        if (method === 'post') {
            request = this.http.post(apiURL, body, options)
                .map((res) => {
                     return this.extractData(res);
                })
                .catch((error: any) => this.handleError(error));
        } else if (method === 'get') {
            try {
                request = this.http.get(apiURL, options)
                    .map((res) => this.extractData(res))
                    .catch((error: any) => this.handleError(error));

            } catch (e) {
                console.log('exception caught in get method...', e);
            }
        } else if (method === 'delete') {
            request = this.http.delete(apiURL, options)
                .map((res) => this.extractData(res))
                .catch((error: any) => this.handleError(error));
        } else if (method === 'put') {
            request = this.http.put(apiURL, body, options)
                .map((res) => this.extractData(res))
                .catch((error: any) => this.handleError(error));
        }

        return request;
    }
    private extractData(res) {
        if (res.status < 200 || res.status >= 300) {
          throw new Error('Bad response status: ' + res.status);
        }
        const response = res._body.replace(/\)]}'/g, '');
        const  data = JSON.parse(response);
        return data || {};

    }

    private handleError (error: any) {
        const errMsg = error.message || 'Server error';
        return Observable.throw(errMsg);
    }
}
