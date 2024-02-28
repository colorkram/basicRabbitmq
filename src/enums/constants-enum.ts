export enum ActiveEnum {
    active = 1,
    not_active = 0
}

export enum UserType {
    supplier = 'supplier',
    agent = 'agent',
    admin = 'admin',
}

export enum StatusType {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    DELETED = 'deleted'
}

export enum Statusresult {
    FAIL = 'fail',
    SUCCESS = 'successfully'
}

export enum ResponseType {
    CREATE = 'Created Succesfully',
    OK = 'Ok',
    BAD = 'Bad Request',
    FORBIDDEN = 'Forbidden',
    UNAUTHORIZED = 'Unauthorized Request',
    SERVER = 'Server Error',
    UNPROCESSABLE = 'Unprocessable Entity'
}

//สถานะ match
export enum MatchType {
    MATCH = 'match',
    NOTMATCH = 'notmatch',
    WAITING = 'waiting'
}

export enum Order {
    ASC = "ASC",
    DESC = "DESC",
}

export enum LogStatusType {
    SEARCH = 'search',
    VIEW = 'view',
    CREATED = 'created',
    EDIT = 'edit',
    DELETE = 'deletes',
}

export enum MessageType {
    CALL = 'call',
    VIDEO = 'video',
    MESSAGE = 'message'
}