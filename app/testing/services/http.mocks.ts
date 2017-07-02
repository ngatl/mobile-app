import { RequestOptions, ResponseOptions, ResponseOptionsArgs, Response, Http, ConnectionBackend, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { tLog } from '../utils';

export const setupBackendMocks = function (backend: MockBackend) {
    backend.connections.subscribe((connection: MockConnection) => {
        let url = connection.request.url;
        tLog('--- api request ---');
        tLog(url);
        let api = url.split('/').slice(-1)[0]; // end of api url
        tLog('endpoint:', api);
        let body = connection.request.getBody();
        if (body) {
            body = JSON.parse(body);
        }
        tLog('body:', body);
        let resp: ResponseOptionsArgs;
        resp = {
            status: 200,
            body: [
                {
                    // anything
                }
            ]
        }
        if (resp && resp.body) {
            resp.body = JSON.stringify(resp.body);
        }
        tLog('mock response:', resp.body);
        connection.mockRespond(new Response(new ResponseOptions(resp)));
    });
}

export const MOCK_BACKEND_PROVIDERS: any[] = [
    MockBackend,
    BaseRequestOptions,
    {
        provide: Http,
        useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
        deps: [MockBackend, BaseRequestOptions]
    },
]
