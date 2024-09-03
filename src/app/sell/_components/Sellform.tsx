import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import SelectCategory from './SelectCategory'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Tiptap from '@/src/components/Tiptap'
import { UploadButton, UploadDropzone } from '@/src/lib/uploadthing'
import { Button } from '@/components/ui/button'

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

      {/* 
      // MARK: - Info 
      */}
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
        {/* 
        // MARK: - Upload
        */}
        <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-4'>
          <div className='flex flex-col gap-y-2'>
            <Label className='text-lg'>Product Images</Label>
            <UploadDropzone
              endpoint="imageUploader"
            />
          </div>

          <div className='flex flex-col gap-y-2'>
            <Label className='text-lg'>Product File(ZIP)</Label>
            <UploadDropzone
              endpoint="productFileUploader"
            />
          </div>
        </div>

        <CardFooter className='mt-5 mx-0 px-0'>
          <Button>Submit Form</Button>
        </CardFooter>

      </CardContent>
    </form>
  )
}

export default SellForm