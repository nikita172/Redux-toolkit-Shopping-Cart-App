import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch("https://redux-http-85f70-default-rtdb.firebaseio.com/cartItems.json")
      const data = await res.json();
      return data;
    }
    try {
      const cartData = await fetchHandler();
      dispatch(cartActions.replaceData(cartData))
    } catch (err) {
      dispatch(uiActions.showNotification({
        message: "sending request Failed!",
        type: "error",
        open: true
      }))
    }
  }
}

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      message: "sending request!",
      type: "warning",
      open: true
    }));
    const sendRequest = async () => {
      const res = await fetch("https://redux-http-85f70-default-rtdb.firebaseio.com/cartItems.json", {
        method: "PUT",
        body: JSON.stringify(cart)
      })
      const data = await res.json();
      dispatch(uiActions.showNotification({
        message: "send request to database successfully!",
        type: "success",
        open: true
      }))
    };
    try {
      await sendRequest();
    } catch (err) {
      dispatch(uiActions.showNotification({
        message: "sending request Failed!",
        type: "error",
        open: true
      }))
    }
  }
}