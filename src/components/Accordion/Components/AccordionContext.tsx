import { createContext } from 'react';

type ActiveKeyType = string | string[] | null | undefined;

export interface AccordionContextProps {
  activeKey?: ActiveKeyType;
  defaultActiveKey?: ActiveKeyType;
  onSelect?: (key: ActiveKeyType) => void;
}

const AccordionContext = createContext<AccordionContextProps>({});

export default AccordionContext;
