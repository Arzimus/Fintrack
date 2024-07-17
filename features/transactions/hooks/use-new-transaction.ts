
import { create } from 'zustand'

type NewTransactionState = {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
}
// ()=>{} is a method
// ()=>({}) immideate return of an object

export const useNewTransaction = create<NewTransactionState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))