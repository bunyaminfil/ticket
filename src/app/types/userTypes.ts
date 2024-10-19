export type initStateUsers = {
    loading: boolean;
    error: any;
    sessions: any;
};

export type ISessionPayload = {
    data: null | string;
    "device-session": {
        "session-id": string | null;
        "device-id": string | null;
    };
    date: string;
    language: string;
};
