import {StateType, initialState, Action} from './state'
import {all, takeLatest, put, call} from 'redux-saga/effects';

declare var fetch: Function;

// Layout actions -> update layout
const UPDATE_TRANSACTIONS = 'transactions/layout/update';

export interface TransactionsAction extends Action {
    txs: string[];
}

export const updateTransactionsAction = (txs: string[]): TransactionsAction => ({
    type: UPDATE_TRANSACTIONS,
    txs,
});

const UPDATE_LOADING = 'transactions/layout/loading';
export interface TransactionsLoadingAction extends Action {
    loading: boolean;
}

export const updateTransactionsLoadingAction = (loading: boolean): TransactionsLoadingAction => ({
    type: UPDATE_LOADING,
    loading,
});

// Data actions -> update state
const REFRESH_TRANSACTIONS = 'transactions/data/refresh';

interface RefreshTransactionsAction {
    type: string;
}

export const refreshTransactionsAction = (): RefreshTransactionsAction => ({
    type: REFRESH_TRANSACTIONS
});

type StateSlice = StateType['transactions'];
export const transactionsSelector = (state: StateType): StateSlice => {
    console.log("transactionsSelector", state)
    return state.transactions;
};

type LoadingStateSlice = StateType['transactionsLoading'];
export const transactionsLoadingSelector = (state: StateType): LoadingStateSlice => {
    console.log("transactionsLoadingSelector", state)
    return state.transactionsLoading;
};

export const transactionsReducer = (
    state: StateSlice = initialState.transactions,
    action: TransactionsAction,
): StateSlice => {
    switch (action.type) {
        case UPDATE_TRANSACTIONS:
            return action.txs;
        default:
            return state;
    }
};

export const transactionsLoadingReducer = (
    state: LoadingStateSlice = initialState.transactionsLoading,
    action: TransactionsLoadingAction,
): LoadingStateSlice => {
    switch (action.type) {
        case UPDATE_LOADING:
            return action.loading;
        default:
            return state;
    }
};

export interface ApiTransaction {
    safe: string;
    to: string;
    transactionHash: string;
    executionDate: string;
}

export interface ApiResponse {
    results: ApiTransaction[];
}

const loadTransactions = async () => {
    const resp = await fetch("https://safe-transaction-service.staging.gnosisdev.com/api/v1/safes/0xAB080c90D99095FfAc2AdAc5405e93C4517A0b6D/transactions/")
    // Throw error depending on status (e.g. 404 -> NoResultsException)
    if (!resp.ok) throw new Error('Request failed');
    const data: ApiResponse = await resp.json();
    return data;
}

function* refreshTransactionsSaga() {
    yield put(updateTransactionsLoadingAction(true))
    try {
        const resp = yield loadTransactions();
        const txs = resp.results.map((tx: ApiTransaction) => tx.transactionHash);
        yield put(updateTransactionsAction(txs))
    } catch(e) {
        console.log(e)
    }
    yield put(updateTransactionsLoadingAction(false))
}

export function* transactionsSaga() {
    yield takeLatest(REFRESH_TRANSACTIONS, refreshTransactionsSaga);
}
