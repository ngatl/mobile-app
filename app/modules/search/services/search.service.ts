// angular
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// lib
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchService {
  private _sampleInitResults: Array<any>;
  
  constructor(private http: Http) { 
    this._sampleInitResults = [];
    for (let i of Array.from(Array(21).keys())) {
      let suffix = i > 0 ? (' ' + i) : '';
      this._sampleInitResults.push({
        title: `Test${suffix}`
      });
    }
  }

  public get sampleInitResults() {
    return this._sampleInitResults;
  }

  public search(term: string) {
    term = term ? term.toLowerCase() : '';
    // TODO: implement http search
    return Observable.of(this.sampleInitResults.filter(result => result.title.toLowerCase().indexOf(term) > -1));
  }

  public loadDetail(id: any) {
    // TODO: implement load detail
    return Observable.of(this.sampleInitResults.find(result => result.title == id));
  }

}
