import {all} from 'redux-saga/effects';
import {transactionsSaga} from './transactions';

export const rootReducer = {};

export function* rootSaga() {
    yield all([transactionsSaga()]);
}
