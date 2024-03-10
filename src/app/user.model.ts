export interface IUser {
    next(arg0: never): number;
    date: any;
    dob: any;
    phone: any;
    name: any;
    id?: number | undefined;
    fullName?: string;
    email?: string;
    dateOfBirth?:Date;
    phoneNumber?:string;
  }


  ///  user search request
export interface IUserSearchRequest {
    search?: string;
    page?: number;
    limit?: number;
    pageSize?: number; // Kích thước trang
  }

  export interface IUserCreateRequest {
    fullName?: string;
    email?: string;
    dateOfBirth?:Date;
    phoneNumber?:string;
  }

  export interface IPageEvent {
    page?: number;
    limit?: number;
  }

  export interface iUserUpdateRequest {
    fullName?: string;
    email?: string;
    dateOfBirth?:Date;
    phoneNumber?:string;
  }
