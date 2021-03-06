import { takeEvery, call, put } from 'redux-saga/effects';
import * as CONSTANTS from './constants';
import auth from '../../api/auth';
import { history } from '../../utils/history';
import { successRegister, failureRegister, pendingRegister } from './actions';
import { showAlertMsg } from '../AlertContainerMessage/actions';

export default function* registerSaga() {
  yield takeEvery(CONSTANTS.REGISTER_SUBMIT, register);
}

export function* register({ userData }) {
  try {
    yield put(pendingRegister());

    const response = yield call(auth.register, userData);

    localStorage.setItem('token', response.headers['access-token']);

    yield put(successRegister(response.data.user));
    yield put(showAlertMsg(response.data.message, 'success'));

    history.push('/check-your-email');
  } catch (error) {
    yield put(failureRegister(error.response.data.message));
    yield put(showAlertMsg(error.response.data.message, 'danger'));
  }
}
