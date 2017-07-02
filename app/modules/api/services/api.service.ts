import { Injectable } from '@angular/core';

// app
import { LoopBackConfig } from '../../../backend/lb.config';

@Injectable()
export class ApiService {

  constructor() {

    // config loopback
    LoopBackConfig.setDebugMode(true);
  }
}