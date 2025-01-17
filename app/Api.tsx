import {AuthenticationApi, JwkSetApi, TokensApi, UsersApi} from "@openapi/apis";
import {Configuration} from "@openapi/runtime";


export class Api {

    private readonly _usersApi: UsersApi;
    private readonly _authenticationApi: AuthenticationApi;
    private readonly _tokensApi: TokensApi;
    private readonly _jwkSetApi: JwkSetApi;

    private _conf = new Configuration({
        credentials: 'include'
    });

    constructor() {
        this._usersApi = new UsersApi(this.configuration);
        this._tokensApi = new TokensApi(this.configuration);
        this._authenticationApi = new AuthenticationApi(this.configuration);
        this._jwkSetApi = new JwkSetApi(this.configuration);
    }


    get usersApi(): UsersApi {
        return this._usersApi;
    }

    get authenticationApi(): AuthenticationApi {
        return this._authenticationApi;
    }

    get tokensApi(): TokensApi {
        return this._tokensApi;
    }

    get jwkSetApi(): JwkSetApi {
        return this._jwkSetApi;
    }

    get configuration(): Configuration {
        return this._conf;
    }
}
