// components
import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { Outlet, useNavigation } from 'react-router-dom';

// MAIN FUNCTION
export default function Main() {
  // VARIABLES
  // Variable 1 - useNavigation
  const navigation = useNavigation();

  return (
    <>
      {/* Logo */}
      <Logo />

      {/* Nav */}
      <Nav />

      {/* Loading */}
      {navigation.state === 'loading' ? (
        <div className='flex justify-center mt-1'>Chargement...</div>
      ) : (
        // Children
        <Outlet />
      )}

      {/* Footer */}
      <Footer />
    </>
  );
}
