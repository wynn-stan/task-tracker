import { createContext } from 'react';

export interface ItemContextProps {
  eventKey: string;
}

const ItemContext = createContext<ItemContextProps>({
  eventKey: '',
});

export default ItemContext;
