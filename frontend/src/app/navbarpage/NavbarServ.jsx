import { cookies } from 'next/headers'
import Navbar from './Navbar';

 const ServerComponent = async () => {
    const isLoggedIn = cookies().get('jwt') !==  undefined;
    return (
      <>
        <Navbar isLoggedIn={isLoggedIn} />
      </>
    )
  }


  export default ServerComponent 