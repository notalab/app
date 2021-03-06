import { AppConfig } from '../environments/environment';

export abstract class API {
    public static PROTOCOL = 'http://';
    public static VERSION = 'v1';
    public static URL = `${API.PROTOCOL}${AppConfig.apiUrl}/api/`;

    public static format(path: string): string {
        return API.URL + path;
    }
}

export abstract class AppVariables {
    public static authTokenIdentifier = 'authToken';
    public static defaultContentTypeHeader = 'application/json';

    public static minimumUsernameLength = 3;
}

export enum Metadata {
    Version = '0.0.1-pre',
    Name = 'Nota'
}
