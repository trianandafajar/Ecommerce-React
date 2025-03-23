import * as React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { LayoutOne } from 'upkit';
import { useDispatch } from 'react-redux';
import BounceLoader from 'react-spinners/BounceLoader';

import { userLogout } from '../../features/Auth/actions';
import { logout } from '../../api/auth';

export default function Logout() {
  const navigate = useNavigate(); // Ganti useHistory() dengan useNavigate()
  const dispatch = useDispatch();

  React.useEffect(() => {
    logout()
      .then(() => dispatch(userLogout()))
      .then(() => navigate('/')); // Ganti history.push dengan navigate()

  }, [navigate, dispatch]);

  return (
    <LayoutOne size="small">
      <div className="text-center flex flex-col justify-center items-center">
        <BounceLoader color="red"/>
        <br/>
        Logging out ...
      </div>
    </LayoutOne>
  );
}
