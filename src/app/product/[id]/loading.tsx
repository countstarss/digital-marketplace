import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

const loading = (props: Props) => {
  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-8 mt-10'>
      <div className='w-full grid grid-cols-2 md:grid-cols-7 gap-x-10'>
        <div className='md:col-span-4 col-span-1'>
          <Skeleton className='w-full lg:h-[500px]'/>
        </div>
        <div className='md:col-span-3 col-span-1 ml-[100px]'>
          <Skeleton className='w-full lg:h-[400px]'/>
        </div>
      </div>
    </section>
  )
}

export default loading