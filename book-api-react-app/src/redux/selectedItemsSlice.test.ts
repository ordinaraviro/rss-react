import selectedItemsReducer, {
  addItem,
  removeItem,
  clearItems,
  SelectedItemsState,
} from './selectedItemsSlice';
import { mockBook } from '../tests/mockData';

describe('selectedItems slice', () => {
  const initialState: SelectedItemsState = {
    items: [],
  };

  it('should handle initial state', () => {
    expect(selectedItemsReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
    });
  });

  it('should handle addItem', () => {
    const actual = selectedItemsReducer(initialState, addItem(mockBook));
    expect(actual.items.length).toEqual(1);
    expect(actual.items[0]).toEqual(mockBook);
  });

  it('should handle removeItem', () => {
    const stateWithItem: SelectedItemsState = {
      items: [mockBook],
    };
    const actual = selectedItemsReducer(
      stateWithItem,
      removeItem(mockBook.key)
    );
    expect(actual.items.length).toEqual(0);
  });

  it('should handle clearItems', () => {
    const stateWithItems: SelectedItemsState = {
      items: [mockBook, mockBook],
    };
    const actual = selectedItemsReducer(stateWithItems, clearItems());
    expect(actual.items.length).toEqual(0);
  });
});
