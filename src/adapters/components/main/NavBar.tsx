import { useContext } from 'react';
import { useAuth } from '../../../context/AuthContext';


const NavBar: React.FC = () => {
  const { logout} = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default NavBar
