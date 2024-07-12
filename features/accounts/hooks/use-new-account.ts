
import { create } from 'zustand'

type NewAccountState = {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
}
// ()=>{} is a method
// ()=>({}) immideate return of an object

export const useNewAccount = create<NewAccountState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))