import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Response } from '@angular/http';




/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
    
  apiUrl = 'https://berimbasket.ir/';
  apiFolder = 'bball';
  //https://jsonplaceholder.typicode.com/users
  //https://api.linkedin.com/v1/people/~?oauth2_access_token=SOMEVALIDTOKEN&format=json
  //'../../assets/players.json'
  //https://randomuser.me/api/?results=10
  //https://randomuser.me/api/?results=10&nat=us&seed=d07ade5f51ffc11
  //https://berimbasket.ir/bball/getPlayersV2.php?user=12&format=json&num=10&from=0
  getPlayer(page): Observable<any[]> {
      let URL1 =this.apiUrl+this.apiFolder+'/getPlayersV2.php?user=12&format=json&num=10&from='+page;

      return  this.http.get(URL1)
                .catch(this.handleError);

  }
  getPlayground(page,lat,long): Observable<any[]> {
      let URL2 =this.apiUrl+this.apiFolder+'/getPlayGroundsV2.php?lat='+lat+'&long='+long+'&num=10&radius=36000000&format=json&from='+page;

      return  this.http.get(URL2)
                .catch(this.handleError);

  }   
  getMatch(page): Observable<any[]> {
      let URL3 =this.apiUrl+this.apiFolder+'/getScoresV2.php?user=12&format=json&from='+page;

      return  this.http.get(URL3)
                .catch(this.handleError);

  }   
  
  
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
    
    
    
}
