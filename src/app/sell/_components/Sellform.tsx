import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import SelectCategory from './SelectCategory'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Tiptap from '@/src/components/Tiptap'

type Props = {}

const SellForm = (props: Props) => {
  return (
    <form>
      <CardHeader>
        <CardTitle>Sell your product with ease</CardTitle>
        <CardDescription>
          Please description your product here in detail so that it can be sold
        </CardDescription>
      </CardHeader>

      <CardContent className='flex flex-col gap-y-6'>
        <div className='flex flex-col gap-y-2'>
          <Label className='text-lg'>Name</Label>
          <Input type="text" placeholder='Name of your product' className='outline-none'/>
        </div>

        <div className='flex flex-col gap-y-2'>
          <Label className='text-lg'>Category</Label>
          <SelectCategory />
        </div>

        <div className='flex flex-col gap-y-2'>
          <Label className='text-lg'>Price</Label>
          <Input type="text" placeholder='Enter your product price' className='outline-none' />
        </div>

        <div className='flex flex-col gap-y-2'>
          <Label className='text-lg'>Small Summary</Label>
          <Textarea placeholder='Enter you product description' rows={3}/>
        </div>

        <div className='flex flex-col gap-y-2'>
          <Label className='text-lg'>Description</Label>
          <Tiptap />
        </div>



      </CardContent>
    </form>
  )
}

export default SellForm