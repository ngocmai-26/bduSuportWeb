import { useDispatch, useSelector } from 'react-redux';
import { useLayoutEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';

import Router from './routes';
import { TOAST_ERROR, TOAST_SUCCESS } from './constants/toast';
import { setAlert } from './slices/AlertSlice';

function App() {
  const { msg } = useSelector((state) => state.alertReducer);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (Object.keys(msg).length > 0) {
      switch (msg.type) {
        case TOAST_SUCCESS:
          toast.success(msg.content);
          break;
        case TOAST_ERROR:
          toast.error(msg.content);
          break;
        default:
          // No action needed for unexpected types
          break;
      }
      dispatch(setAlert({}));
    }
  }, [msg, dispatch]);
 
  return (
    <div>
      <Router />
      <ToastContainer />
    </div>
  );
}

export default App;
