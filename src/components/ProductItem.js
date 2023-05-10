import { Store } from '@/utils/Store';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

const ProductItem = ({ product }) => {
  const { state, dispatch } = useContext(Store);
  const addToCart = async () => {
    const itemExist = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = itemExist ? itemExist.quantity + 1 : 1;
    //sending to db
    const { data } = await axios.get(`/api/products/${product._id}`);
    console.log('data', data);
    if (data.countInStock < quantity) {
      toast.error('Sorry. product out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    toast.success('Product added successfully');
    router.push('/cart');
  };
  const router = useRouter();
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`} className="text-lg">
          {product.name}
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCart()}
        >
          {' '}
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
