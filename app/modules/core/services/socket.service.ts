import { Injectable } from '@angular/core';

// libs
import { SocketIO } from 'nativescript-socketio';

// app
import { LoggerService } from '../../backend/services/custom/logger.service';

@Injectable()
export class SocketService {
  private _socket: SocketIO;

  constructor(
    private _logger: LoggerService
  ) { }

  public connect(url: string, options: any): any {
    this._logger.log('SocketService connect:', url);
    this._socket = new SocketIO(url, options);
    this._socket.connect();
    return this._socket;
  }

  public emit(event: string, data: any) {
    this._logger.log('SocketService emit:', event);
    this._socket.emit(event, data);
  }

  public on(event, callback) {
    this._socket.on(event, callback);
  }
}
