
import { Navigate} from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';


export default function PrivateRoute({children}: any) {
  // taking user from redux state
  const {user} = useAppSelector(state => state.account);
  //const loggedIn = false;


  return user ? children : <Navigate to="/login" />
}
