// angular
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// lib
import { Observable } from 'rxjs/Observable';
import { ConferenceEventApi } from "../../backend/services";

@Injectable()
export class EventService {

  
  constructor(private events: ConferenceEventApi) { }

  public count() {
    return this.events.count().map(value => value.count);
  }

  public fetch() {
    console.log('fetch events!');
    return this.events.find();
  }

  public loadDetail(id) {
    return this.events.findById(id);
  }

}
