import {HttpClient, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/index";
import {map} from "rxjs/internal/operators";

@Injectable()
export class BaseApi {

  private baseUrl = 'http://localhost:3000/';

  constructor(public http: HttpClient) {
  }

  private getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }

  public get(url: string = ''): Observable<any> {
    console.log(this.getUrl(url));
    return this.http.get(this.getUrl(url)).pipe(
      map((response: HttpResponse<any>) => response)
    );
  }

  public post(url: string = '', data: any = {}): Observable<any> {

    return this.http.post(this.getUrl(url), data).pipe(
      map((response: HttpResponse<any>) => response)
    );
  }

  public put(url: string = '', data: any = {}): Observable<any> {

    return this.http.put(this.getUrl(url), data).pipe(
      map((response: HttpResponse<any>) => response)
    );
  }
}
