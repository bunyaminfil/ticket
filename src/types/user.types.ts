export type InitStateUsers = {
    loading: boolean;
    error: any;
    sessions: { status: string };
};

export type ISessionPayload = {
    data: ITicketFilter | string | null;
    "device-session": {
        "session-id": string | null;
        "device-id": string | null;
    };
    date: string;
    language: string;
};
export type ITicketFilter = {
    "origin-id": number;
    "destination-id": number;
    "departure-date": string | null;
};
