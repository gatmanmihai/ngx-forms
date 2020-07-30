export interface FormFactoryInterface {
  create<T>(type, data?: any, options?: {}): T;
}
