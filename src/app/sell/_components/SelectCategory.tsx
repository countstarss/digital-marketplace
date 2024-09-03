'use client'

import { Card, CardHeader } from '@/components/ui/card'
import { categoryItems } from '@/src/lib/categroyItems'
import { cn } from '@/src/lib/utils'
import React, { useState } from 'react'

type Props = {}

const SelectCategory = (props: Props) => {
  const [selectedCategory,setSelectedCategory] = useState<string | null>(null);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
      {categoryItems.map((item) => (
        <div className='cursor-pointer' key={item.id}>
          <Card className={
            selectedCategory === item.name 
            ? "border-primary border-2 bg-violet-100"
            : "border-slate-300 border-2"
            }
            onClick={() => setSelectedCategory(item.name)}
          >
            <CardHeader className='flex flex-row items-center gap-2 justify-center'>
              {item.image}
              <h3 className='font-normal text-xl'>{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))
      }
    </div>
  )
}

export default SelectCategory