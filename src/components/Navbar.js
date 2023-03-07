import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '@/utils/Store';
import { signOut, useSession } from 'next-auth/react';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

const Navbar = () => {
  const { status, data: session } = useSession();

  console.log(session, 'sssssttttt');
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItensCount, setCartItensCount] = useState(0);

  useEffect(() => {
    setCartItensCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  return (
    <nav className="flex items-center h-12 px-4 justify-between shadow-md">
      <Link className="text-sky-800 text-lg font-bold" href="/">
        3deez Global
      </Link>
      <div>
        <Link className="p-2" href="/cart">
          Cart{' '}
          {cartItensCount > 0 && (
            <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
              {cartItensCount}
            </span>
          )}
        </Link>

        {status === 'loading' ? (
          'loading'
        ) : session?.user ? (
          <Menu as="div" className="relative inline-block">
            <Menu.Button className="text-sky-800 ">
              {session.user.name}
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg">
              <Menu.Item>
                <DropdownLink className="dropdown-link" href="/profile">
                  Profile
                </DropdownLink>
              </Menu.Item>
              <Menu.Item>
                <DropdownLink className="dropdown-link" href="/order-history">
                  Order History
                </DropdownLink>
              </Menu.Item>
              <Menu.Item>
                <Link
                  className="dropdown-link"
                  href="#"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <Link href="/login" className="p-2">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
