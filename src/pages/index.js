import Layout from '@/components/Layout';
import ProductItem from '@/components/ProductItem';
import db from '@/utils/db';
import data from '@/utils/dummyData';
import Head from 'next/head';
import Image from 'next/image';
import Product from '../../models/Product';

export default function Home({ products }) {
  console.log(products, 'wahaa');
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <ProductItem product={product} key={product.slug}></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
