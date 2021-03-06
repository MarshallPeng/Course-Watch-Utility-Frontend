import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';


/**
 * Service to communicate with backend
 */
@Injectable()
export class APIService {
    baseURL = 'https://course-watch-utility-1d35d.uc.r.appspot.com/api/';
    // baseURL = 'http://127.0.0.1:5000/api/';
    // baseURL = 'http://localhost:8080/api/';

    constructor(private http: HttpClient) {

    }

    make_new_request(data: string) {

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseURL + 'new_request', data, {'headers': headers});
    }

    get_current_requests(user) {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseURL + 'current_requests', user, {'headers': headers});
    }
}
