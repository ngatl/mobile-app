// angular
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// lib
import { Observable } from 'rxjs/Observable';
import { ConferenceSponsorApi } from "../../backend/services";

@Injectable()
export class SponsorService {

  
  constructor(
    private sponsors: ConferenceSponsorApi
  ) { 
  }

  public count() {
    return this.sponsors.count().map(value => value.count);
  }

  public fetch() {
    console.log('fetch!');
    return this.sponsors.find();
  }

  public loadDetail(id) {
    return this.sponsors.findById(id);
  }

}
