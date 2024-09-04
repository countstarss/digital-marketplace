import React from 'react'
import prisma from '../lib/db'
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ProductCard from './ProductCard';

type Props = {}

async function getData() {
  const data = await prisma.product.findMany({
    select :{
      id:true,
      name:true,
      price:true,
      smallSummary:true,
      description:true,
      images:true,
    }
  });

  return data
}


const NewestProducts = async (props: Props) => {

  const data = await getData();

  return (
    <section className='mt-12'>
      {/* 
      // MARK: TITLE
      */}
      <div className='md:flex md:items-center md:justify-between'>
        <h2 className='text-2xl font-extrabold tracking-tighter'>
          Newest Products
        </h2>
        <div className='flex flex-row items-center'>
          <Link href="/" className='text-md hidden font-bold text-primary hover:text-primary/75 md:block'>
            All Products 
          </Link>
          <ArrowRight className='hidden md:block'/>
        </div>
      </div>

      {/* 
      // MARK: LIST
      */}
      <div className='grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 mt-4 gap-10'>
        {data.map((product) => (
              <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              smallSummary={product.smallSummary}
              description={product.description}
              images={product.images}
              />
        ))}
      </div>
    </section>
  )
}

export default NewestProducts