export interface AuthenticationReducerState {
    token?: string;
    role?: string;
    isRoleLoading: boolean;
    id?: number;
    name?: string;
    isLoading?: boolean;
    errorMessage?: string;
}