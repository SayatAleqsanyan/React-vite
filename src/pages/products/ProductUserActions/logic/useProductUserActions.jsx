import {handleProductUserAction} from "./handleProductUserAction.jsx";
import {useDispatch} from "react-redux";

export const useProductUserActions = () => {
  const dispatch = useDispatch();

  return {
    performAction: async (product, userName, actionType, ...args) =>
      await handleProductUserAction(product, userName, actionType, dispatch, ...args)
  };
};