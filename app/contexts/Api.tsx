import {
  AcademicClassApi,
  AuthenticationApi,
  ClassRoomApi,
  CourseApi,
  DepartmentApi,
  GroupApi,
  JwkSetApi,
  ReservationsApi,
  SemesterApi,
  SignupApi,
  StatisticsApi, TeachersApi,
  TimeTablesApi,
  TokensApi,
  UsersApi
} from "@openapi/apis";
import {BASE_PATH, Configuration} from "@openapi/runtime";
import {toast} from "react-toastify";
import {ExceptionDto} from "@/app/openapi";


export class Api {

  private readonly _usersApi: UsersApi;
  private readonly _authenticationApi: AuthenticationApi;
  private readonly _tokensApi: TokensApi;
  private readonly _jwkSetApi: JwkSetApi;
  private readonly _classRoomApi: ClassRoomApi;
  private readonly _courseApi: CourseApi;
  private readonly _groupApi: GroupApi;
  private readonly _semesterApi: SemesterApi;
  private readonly _timeTablesApi: TimeTablesApi;
  private readonly _departmentApi: DepartmentApi;
  private readonly _academicClassApi: AcademicClassApi;
  private readonly _signupApi: SignupApi
  private readonly _reservationApi: ReservationsApi
  private readonly _statisticsApi: StatisticsApi
  private readonly _teachersApi: TeachersApi;

  private _conf = new Configuration({
    credentials: 'include',
    middleware: [{
      post: async context => {
        if (context.response.status === 400 || context.response.status === 404 || context.response.status === 500) {
          const response: ExceptionDto = await context.response.json();
          toast.error(response.message)
        }
        if (context.response.status === 500) {
          const response: ExceptionDto = await context.response.json();
          toast.error(response.message + " Error id : " + response.errorId)
        }
        if (context.response?.status === 401 &&
          context.url !== BASE_PATH + "/api/v1/tokens" &&
          context.url !== BASE_PATH + "/login") {
          await this.tokensApi.refreshToken();
          return context.init && await fetch(context.url, context.init);
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
    this._courseApi = new CourseApi(this.configuration);
    this._departmentApi = new DepartmentApi(this.configuration);
    this._groupApi = new GroupApi(this.configuration);
    this._semesterApi = new SemesterApi(this.configuration);
    this._timeTablesApi = new TimeTablesApi(this.configuration);
    this._signupApi = new SignupApi(this.configuration);
    this._academicClassApi = new AcademicClassApi(this.configuration)
    this._reservationApi = new ReservationsApi(this.configuration);
    this._statisticsApi = new StatisticsApi(this.configuration);
    this._teachersApi = new TeachersApi(this.configuration);
  }

  get statisticsApi(): StatisticsApi {
    return this._statisticsApi;
  }

  get reservationApi(): ReservationsApi {
    return this._reservationApi;
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


  get courseApi(): CourseApi {
    return this._courseApi;
  }

  get groupApi(): GroupApi {
    return this._groupApi;
  }

  get semesterApi(): SemesterApi {
    return this._semesterApi;
  }

  get timeTablesApi(): TimeTablesApi {
    return this._timeTablesApi;
  }

  get signupApi(): SignupApi {
    return this._signupApi;
  }

  get departmentApi(): DepartmentApi {
    return this._departmentApi;
  }

  get academicClassApi(): AcademicClassApi {
    return this._academicClassApi;
  }
  get teachersApi(): TeachersApi {
    return this._teachersApi;
  }
}
