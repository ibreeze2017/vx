import { ISimpleXHROptions, ISimpleXHRResponse } from './interface';

export declare function SimpleXHR<T = any>(options: ISimpleXHROptions<T>): XMLHttpRequest;

export declare function request<T = any>(options: ISimpleXHROptions): Promise<ISimpleXHRResponse<T>>;

export declare function remove<T>(options: ISimpleXHROptions): Promise<ISimpleXHRResponse<T>>;

export declare function put<T>(options: ISimpleXHROptions): Promise<ISimpleXHRResponse<T>>;

export default class Http {
  static get<T = any>(options: ISimpleXHROptions): Promise<ISimpleXHRResponse<T>>;

  static post<T = any>(options: ISimpleXHROptions): Promise<ISimpleXHRResponse<T>>;

  static head<T = any>(options: ISimpleXHROptions): Promise<ISimpleXHRResponse<T>>;

  static delete<T = any>(options: ISimpleXHROptions): Promise<ISimpleXHRResponse<T>>;

  static put<T = any>(options: ISimpleXHROptions): Promise<ISimpleXHRResponse<T>>;
}
