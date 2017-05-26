import { createMemoryHistory } from 'history';

const history = createMemoryHistory({
  initialEntries: [],
  initialIndex: 0,
  getUserConfirmation: null
});

export default history;