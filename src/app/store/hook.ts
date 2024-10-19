import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "."; // Adjust paths according to your store setup

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch; // Custom useDispatch hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // Custom useSelector hook
