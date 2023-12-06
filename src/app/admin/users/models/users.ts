export interface IUsersData {
    pageNumber: number,
    pageSize: number,
    data: IUsers[],
    totalNumberOfRecords: number,
    totalNumberOfPages: number
}

export interface IUsers {

    id: number,
    userName: string,
    email: string,
    country: string,
    phoneNumber: number,
    imagePath: string,
    group: IGroup
    creationDate: number,
    modificationDate: number
}

export interface IGroup {
    id: number,
    name: string,
    creationDate: number,
    modificationDate: number,
}

