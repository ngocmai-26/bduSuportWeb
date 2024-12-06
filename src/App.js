
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLayoutEffect } from 'react';
import { TOAST_ERROR, TOAST_SUCCESS } from './constants/toast';
import { ToastContainer, toast } from 'react-toastify';
import { setAlert } from './slices/AlertSlice';
import Router from './routes';
import "react-toastify/dist/ReactToastify.css";

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
