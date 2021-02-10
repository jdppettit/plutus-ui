import thunk from 'redux-thunk';
import {
  applyMiddleware, compose, createStore, combineReducers
} from 'redux';

import alertsReducer from './features/alerts/reducer';
import accountsReducer from './features/accounts/reducer';
import incomeReducer from './features/income/reducer';
import transactionsReducer from './features/transactions/reducer';
import expensesReducer from './features/expenses/reducer';
import eventsReducer from './features/events/reducer';

const allReducers = combineReducers({
  alertsReducer,
  accountsReducer,
  incomeReducer,
  transactionsReducer,
  expensesReducer,
  eventsReducer
})

let allStoreEnhancers = compose(
  applyMiddleware(thunk)
);

// split this to avoid an error when devToolsExtension is null
if (window.devToolsExtension) {
  allStoreEnhancers = compose(allStoreEnhancers, window.devToolsExtension());
}

const store = createStore(allReducers, undefined, allStoreEnhancers);

export default store;
