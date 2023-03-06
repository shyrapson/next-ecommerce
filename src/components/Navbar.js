import Link from 'next/link';
import React, { useContext } from 'react';
import { Store } from '@/utils/Store';

const Navbar = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  console.log(state, 'am here');
  return (
    <nav className="flex items-center h-12 px-4 justify-between shadow-md">
      <Link className="text-lg font-bold" href="/">
        3deez Global
      </Link>
      <div>
        <Link className="p-2" href="/cart">
          Cart{' '}
          {cart.cartItems.length > 0 && (
            <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
              {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
            </span>
          )}
        </Link>

        <Link className="p-2" href="/login">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
