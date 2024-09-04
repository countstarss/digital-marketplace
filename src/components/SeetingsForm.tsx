'use client'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect } from 'react'
import { Submitbutton } from './Buttons'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { State, UpdateUserSettings } from '../app/actions'
import { useFormState } from 'react-dom'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'


interface appProps {
  firstName : string,
  lastName: string,
  email: string
}

const SeetingsForm = ({ firstName,lastName,email }: appProps) => {
  const initalState: State = { message: "", status: undefined };
//INFO: useFormState用于管理表单状态的 React Hook ,它可以帮助你轻松地处理表单的输入值、校验、提交状态等
  const [state, seetingsForm] = useFormState(UpdateUserSettings, initalState);

  useEffect(() => {
    if(state.status === 'success') {
      toast.success("Settings has been updated")
    } else if (state.status === 'error') {
      toast.error(state.message)
    } 
  },[state])

  return (
    <form action={seetingsForm}>
      <Toaster />
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Here you will find settings regarding your account</CardDescription>
      </CardHeader>
      {/* 
      // MARK: INFO
      */}
      <CardContent className='flex flex-col gap-y-5'>
        <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-4'>
          <div className='flex flex-col gap-y-2'>
            <Label>First Name</Label>
            <Input name='firstName' type='text' autoComplete='off' defaultValue={firstName}/>
          </div>
          <div className='flex flex-col gap-y-2'>
            <Label>Last Name</Label>
            <Input name='lastName' type='text' autoComplete='off' defaultValue={lastName}/>
          </div>
        </div>

        <div className='flex flex-col gap-y-2'>
            <Label>Email</Label>
            <Input name='email' type='text' autoComplete='off' defaultValue={email}/>
          </div>
      </CardContent>
      <CardFooter>
        <Submitbutton title='Update Settings'/>
      </CardFooter>
    </form>
  )
}

export default SeetingsForm