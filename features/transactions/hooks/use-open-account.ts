
import { create } from 'zustand'

type OpenAccountState = {
  id?: string,
  isOpen: boolean,
  onOpen: (id: string) => void,
  onClose: () => void
}
// ()=>{} is a method
// ()=>({}) immideate return of an object

export const useOpenAccount = create<OpenAccountState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined })
}))