'use client'

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import SelectCategory from './SelectCategory'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Tiptap from '@/src/components/Tiptap'
import { UploadButton, UploadDropzone } from '@/src/lib/uploadthing'
import { Button } from '@/components/ui/button'
import { JSONContent } from '@tiptap/react'
import { useFormState } from 'react-dom'
import { SellProduct, State } from '../../actions'
import { toast, Toaster } from 'sonner'
import { Submitbutton } from '@/src/components/SubmitButtons'

type Props = {}

const SellForm = (props: Props) => {

  const initalState: State = { message: "", status: undefined };
//INFO: useFormState用于管理表单状态的 React Hook ,它可以帮助你轻松地处理表单的输入值、校验、提交状态等
  const [state, formAction] = useFormState(SellProduct, initalState);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<null | string[]>(null);
  const [productFile, SetProductFile] = useState<null | string>(null);

  console.log(state.errors);
  console.log(state.status);
  useEffect(() => {
    if(state.status === 'success') {
      toast.success("Produc has been created")
    } else if (state.status === 'error') {
      toast.error(state.message)
    } 
  },[state])
  
  return (
    <form action={formAction}>
      <Toaster richColors/>
      <CardHeader>
        <CardTitle>Sell your product with ease</CardTitle>
        <CardDescription>
          Please description your product here in detail so that it can be sold
        </CardDescription>
      </CardHeader>

      {/* 
      // MARK: - Form Info 
      */}
      <CardContent className='flex flex-col gap-y-6'>
        <div className='flex flex-col gap-y-2'>
          <Label className='text-lg'>Name</Label>
          <Input type="text" placeholder='Name of your product' className='' name='name'  autoComplete="off" required minLength={3}/>
          {state?.errors?.["name"]?.[0] && (
            <p className='text-red-600/70 text-sm'>{state?.errors?.["name"]?.[0]}</p>
          )}
        </div>

        <div className='flex flex-col gap-y-2'>
          <Label className='text-lg'>Category</Label>
          <SelectCategory />
        </div>

        <div className='flex flex-col gap-y-2'>
          <Label className='text-lg'>Price</Label>
          <Input type="text" placeholder='Enter your product price' className='outline-none' name='price' autoComplete="off" required/>
          {state?.errors?.["price"]?.[0] && (
            <p className='text-red-600/70 text-sm'>{state?.errors?.["price"]?.[0]}</p>
          )}
        </div>

        <div className='flex flex-col gap-y-2'>
          <Label className='text-lg'>Small Summary</Label>
          <Textarea placeholder='Enter you product description' rows={3} name='smallSummary' autoComplete="off" required minLength={10}/>
          {state?.errors?.["smallSummary"]?.[0] && (
            <p className='text-red-600/70 text-sm'>{state?.errors?.["smallSummary"]?.[0]}</p>
          )}
        </div>

        <div className='flex flex-col gap-y-2'>
          <input type="hidden" name='description' value={JSON.stringify(json)}/>
          <Label className='text-lg'>Description</Label>
          <Tiptap json={json} setJson={setJson} />
          {state?.errors?.["description"]?.[0] && (
            <p className='text-red-600/70 text-sm'>{state?.errors?.["description"]?.[0]}</p>
          )}
        </div>
        <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-4'>
          {/* 
          // MARK: - imageUploader
          */}
          <div className='flex flex-col gap-y-2'>
            <input type="hidden" name='images' value={JSON.stringify(images)}/>
            <Label className='text-lg'>Product Images</Label>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImages(res.map((item) => item.url))
                toast.success("images uploaded")
              }}
              onUploadError={(error: Error) => {
                toast.error("Something went wrong,try again")
                throw new Error(`${error}`)
              }}
            />
            {state?.errors?.["images"]?.[0] && (
              <p className='text-red-600/70 text-sm'>{state?.errors?.["images"]?.[0]}</p>
            )}
          </div>

          {/* 
          // MARK: - FileUploader
          */}
          <div className='flex flex-col gap-y-2'>
            <input type="hidden" name='productFile' value={productFile ?? ""}/>
            <Label className='text-lg'>Product File(ZIP)</Label>
            <UploadDropzone
              endpoint="productFileUploader"
              onClientUploadComplete={(res) => {
                SetProductFile(res[0].url)
                toast.success("productFile uploaded")
              }}
              onUploadError={(error: Error) => {
                toast.error("Something went wrong,try again")
                throw new Error(`${error}`)
              }}
            />
            {state?.errors?.["productFile"]?.[0] && (
              <p className='text-red-600/70 text-sm'>{state?.errors?.["productFile"]?.[0]}</p>
            )}
          </div>
        </div>

        <CardFooter className='mt-5 mx-0 px-0'>
          <Submitbutton title='Create Your Product'/>
        </CardFooter>

      </CardContent>
    </form>
  )
}

export default SellForm