export const PUSH_ALERT_REQUEST = 'pushAlertRequest';
export const POP_ALERT_REQUEST = 'popAlertRequest';

function pushAlertRequest(alert) {
  return {
    type: PUSH_ALERT_REQUEST,
    payload: alert
  };
}

function popAlertRequest() {
  return {
    type: POP_ALERT_REQUEST
  };
}

export function pushAlert(alert) {
  return (dispatch) => {
    dispatch(pushAlertRequest(alert));
  };
}

export function popAlert() {
  return (dispatch) => {
    dispatch(popAlertRequest());
  }
}
