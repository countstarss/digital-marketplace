import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { JsonValue } from '@prisma/client/runtime/library'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Images } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface data  {
  id:string,
  name:string,
  price:Number,
  smallSummary:string,
  description:JsonValue,
  images:string[],
}

const ProductCard = (data : data ) => {
  return (
    <div className='rounded-lg'>
      
      {/* 
      // MARK: Carousel
      */}
      <Carousel className="w-full">
        <CarouselContent>
          {data.images.map((_, index) => (
            <CarouselItem key={index}>
              <div className='relative lg:h-[180px] md:h-[230px] h-[260px]  rounded-lg'>
                    <Image src={data.images[index]} alt={data.name} fill className='object-cover w-full h-full rounded-lg'/>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='ml-16 opacity-80'/>
        <CarouselNext className='mr-16 opacity-80'/>

        
      </Carousel>
      {/* 
      // MARK: INFO
      */}
      <div className='flex justify-between items-center mt-2 mx-1'>
        <h1 className='text-xl font-semibold'><a href={`product/${data.id}`}>{data.name}</a></h1>
        <h3 className='font-bold text-lg inline-flex items-center px-2 py-1 bg-primary/10 rounded-md ring-1 ring-inset ring-primary/20'>${`${data.price}`}</h3>
      </div>
      <p className='text-gray-600 line-clamp-1 text-sm'>{data.smallSummary}</p>

      <Button asChild className='w-full mt-3 bg-primary/90'>
          <Link href={`product/${data.id}`}>Learn More</Link>
      </Button>
    </div>
      
  )
}

export default ProductCard