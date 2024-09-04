import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { BuyButton } from '@/src/components/Buttons'
import ProductDescription from '@/src/components/ProductDescription'
import prisma from '@/src/lib/db'
import Image from 'next/image'
import React from 'react'
import { type JSONContent } from '@tiptap/react'

async function getData(id: string) {
  try {
    const data = await prisma.product.findUnique({
      where:{
        id:id
      },
      select: {
        category: true,
        description: true,
        smallSummary: true,
        name: true,
        images: true,
        price: true,
        createAt: true,
        id: true,
        User: {
          select: {
            profileImage: true,
            firstName: true,
          },
        },
      },
    })

    return data
  } catch (error) {
    return null
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {

  const data = await getData(params.id);
  return (
    <section className="mx-auto px-4 mt-10 max-w-7xl 
                        lg:px-8 lg:grid lg:grid-rows-1 
                        lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 
                        xl:gap-x-16 mb-10">
      {/* 
      //MARK: Image
      */}
      <Carousel className="lg:row-end-1 lg:col-span-4">
        <CarouselContent>
        {data?.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                <Image
                  src={item as string}
                  alt="yoo"
                  fill
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* 
        INFO: 把两个按钮放在框的里边
        */}
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      {/* 
      //MARK: INFO
      */}
      <div className="max-w-2xl mx-auto mt-5 
                      lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">  
          {data?.name}
        </h1>

        <p className="mt-2 text-muted-foreground">{data?.smallSummary}</p>
        {/* <form action={BuyProduct}> */}
        <form>
          <input type="hidden" name="id" value={data?.id} />
          <BuyButton price={data?.price as number} />
        </form>

        <div className="border-t border-gray-200 mt-10 pt-10">
          <div className="grid grid-cols-2 w-full gap-y-3">
            {/* 
            //MARK: Released
            */}
            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Released:
            </h3>
            <h3 className="text-sm font-medium col-span-1">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
              }).format(data?.createAt)}
            </h3>

            {/* 
            //MARK: Category
            */}
            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Category:
            </h3>
            <h3 className="text-sm font-medium col-span-1">{data?.category}</h3>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10"></div>
      </div>

      {/* 
      //MARK: Description
      */}
      <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
        <ProductDescription content={data?.description as JSONContent} />
      </div>

    </section>
  )
}