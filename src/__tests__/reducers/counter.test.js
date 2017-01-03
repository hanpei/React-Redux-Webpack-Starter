import { INCREMENT_COUNTER, DECREMENT_COUNTER, RESET_COUNTER } from 'constants/ActionTypes';
import reducers from 'reducers/counterReducers';

test('reducers', () => {
  let state;
  state = reducers(0, { type: 'INCREMENT_COUNTER', num: 1 });
  expect(state).toEqual(1);
});
