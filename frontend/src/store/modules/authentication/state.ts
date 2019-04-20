export interface AuthenticationReducerState {
    token?: string;
    id?: number;
    name?: string;
    isLoading?: boolean;
    error?: string;
}