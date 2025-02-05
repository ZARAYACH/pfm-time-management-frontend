import {AuthenticationApi, ClassRoomApi, JwkSetApi, TokensApi, UsersApi} from "@openapi/apis";
import {BASE_PATH, Configuration} from "@openapi/runtime";
import {toast} from "react-toastify";


export class Api {

  private readonly _usersApi: UsersApi;
  private readonly _authenticationApi: AuthenticationApi;
  private readonly _tokensApi: TokensApi;
  private readonly _jwkSetApi: JwkSetApi;
  private readonly _classRoomApi: ClassRoomApi;

  private _conf = new Configuration({
    credentials: 'include',
    middleware: [{
      post: async context => {
        if (context.response.status === 400) {
          const response = await context.response.json();
          toast.error(response.message)
        }
        if (context.response?.status === 401) {
          if (context.url !== BASE_PATH + "/api/v1/tokens") {
            await this.tokensApi.refreshToken();
            return context.init && await fetch(context.url, context.init);
          }
        }
      }
    }],
  });

  constructor() {
    this._usersApi = new UsersApi(this.configuration);
    this._tokensApi = new TokensApi(this.configuration);
    this._authenticationApi = new AuthenticationApi(this.configuration);
    this._jwkSetApi = new JwkSetApi(this.configuration);
    this._classRoomApi = new ClassRoomApi(this.configuration);
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

  get classRoomApi(): ClassRoomApi {
    return this._classRoomApi;
  }

  get configuration(): Configuration {
    return this._conf;
  }
}
