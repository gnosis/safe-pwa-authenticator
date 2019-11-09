export interface StateType {
    readonly transactions: string[];
    readonly transactionsLoading: boolean;
}

export const initialState: StateType = {
    transactions: [],
    transactionsLoading: false
};

export interface Action {
    readonly type: string
}
