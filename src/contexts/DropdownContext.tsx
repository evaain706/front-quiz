import { createContext, useContext } from 'react';
import type { DropDownContextType } from '../types/dropdownTypes';

export const DropdownContext = createContext<DropDownContextType | null>(null);

export function useDropdownContext() {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error(
      'DropDown관련요소들은 <DropDown>컴포넌트 내부에서만 사용가능!!',
    );
  }
  return ctx;
}
