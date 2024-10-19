export type userListType = {
    totalRecords: number;
    totalPages: number;
    data: {
        id: number;
        brandId: number;
        brandName: string;
        name: string;
        surname: string;
        email: string;
        languages: string;
        roles: Role[];
        lastLoginDate: string;
        isActive: boolean;
        createdDate: string;
        createdUserId?: number;
        createdUserName?: string;
        updatedDate: any;
    }[];
};
export interface Role {
    id: number;
    name: string;
    isActive: boolean;
}
export type initStateUsers = {
    loading: boolean;
    error: any;
    busLocations: userListType;
    isUserLogin: boolean;
    currentUserDetail: userDetailsType | null;
};

export type createUser = {
    brandId: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    languageIdArray: string;
    phoneNumber?: string | null;
    role: number;
};

export interface interfaceUser extends FormData {
    brandId: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    languageIdArray: string;
    phoneNumber?: string | null;
    role: number;
}
export type userDetailsType = {
    username: string;
    fullName: string;
    brandName: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    profilePhotoUrl: string;
    languageIdArray: string;
    languages: string;
    isActive: true;
    roles: [
        {
            id: number;
            name: string;
            isActive: boolean;
        },
    ];
};
export type userDetailsByIdTypeResponse = {
    data: userDetailsType;
    success: boolean;
    message: string;
    statusCode: number;
};
