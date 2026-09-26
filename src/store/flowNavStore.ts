import { create } from 'zustand'

interface FlowNavState {
  backHandler: (() => void) | null
  setBackHandler: (handler: (() => void) | null) => void
}

export const useFlowNavStore = create<FlowNavState>((set) => ({
  backHandler: null,
  setBackHandler: (handler) => set({ backHandler: handler }),
}))
