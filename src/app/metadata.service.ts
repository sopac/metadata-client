import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Count} from "./count";
import {Country} from "./country";
import {Year} from "./year";
import {Metadata} from "./metadata";
import {Search} from "./search";
import {SearchResult} from "./search";

@Injectable()
export class MetadataService {

  private restUrl = 'https://services.gsd.spc.int/metadata-backend';
  //private restUrl = 'http://localhost:8080';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getCount(): Promise<Count> {
    return this.http.get(this.restUrl + '/count')
      .toPromise()
      .then(response => response.json() as Count)
      .catch(this.handleError);
  }

  getCountries(): Promise<Country[]> {
    return this.http.get(this.restUrl + '/country')
      .toPromise()
      .then(response => response.json() as Country[])
      .catch(this.handleError);
  }

  getYears(): Promise<Year[]> {
    return this.http.get(this.restUrl + '/year')
      .toPromise()
      .then(response => response.json() as Year[])
      .catch(this.handleError);
  }

  getMetadata(): Promise<Metadata[]> {
    return this.http.get(this.restUrl + '/metadata')///?max=5')
      .toPromise()
      .then(response => response.json() as Metadata[])
      .catch(this.handleError);
  }

  getMetadataByCountry(code: string): Promise<Metadata[]> {
    return this.http.get(this.restUrl + '/listByCountry?code=' + code)
      .toPromise()
      .then(response => response.json() as Metadata[])
      .catch(this.handleError);
  }

  getMetadataByYear(year: string): Promise<Metadata[]> {
    return this.http.get(this.restUrl + '/listByYear?year=' + year)
      .toPromise()
      .then(response => response.json() as Metadata[])
      .catch(this.handleError);
  }

  doSearch(query: string): Promise<Search> {
    return this.http.get(this.restUrl + '/search?q=' + query)
      .toPromise()
      .then(response => response.json() as Search)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
