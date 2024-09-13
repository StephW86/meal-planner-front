import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx'

const Root = () => {
  return (
    <>
      <NavBar path='/'/>
      <div id='detail'>
        <Outlet />
      </div>
    </>
  )
};

export default Root;