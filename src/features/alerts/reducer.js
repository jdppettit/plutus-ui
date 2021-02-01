import {
  PUSH_ALERT_REQUEST,
  POP_ALERT_REQUEST
} from './actions';

export default function alertsReducer(
  state = {
    alerts: []
  },
  action
) {
  switch (action.type) {
    case PUSH_ALERT_REQUEST: {
      const { alerts } = state;
      alerts.push(action.payload);
      return {
        ...state,
        alerts
      };
    }
    case POP_ALERT_REQUEST: {
      const { alerts } = state;
      alerts.pop();
      return {
        ...state,
        alerts
      };
    }
    default:
      return state;
  }
}
