import {all} from 'redux-saga/effects';
import {transactionsReducer, transactionsSaga, transactionsLoadingReducer} from './transactions';

export const rootReducer = {
    transactions: transactionsReducer,
    transactionsLoading: transactionsLoadingReducer
};

export function* rootSaga() {
    yield all([transactionsSaga()]);
}
