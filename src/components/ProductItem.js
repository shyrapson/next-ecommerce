import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const ProductItem = ({ product }) => {
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
          onClick={() => router.push(`/product/${product.slug}`)}
        >
          {' '}
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
