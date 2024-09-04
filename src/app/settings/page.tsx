import { Card } from '@/components/ui/card'
import SeetingsForm from '@/src/components/SeetingsForm'
import prisma from '@/src/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import React from 'react'

type Props = {}

async function getData(userId:string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName:true,
      lastName:true,
      email:true
    },
  })
  return data
}

const SettingsPage = async (props: Props) => {
  const { getUser } = getKindeServerSession()
  const user = getUser()

  if(!user) {
    throw new Error("Not Authorized")
  }

  const data = await getData((await user).id)
  return (
    <section className='max-w-7xl mx-auto px-4 md:px-8'>
      <Card>
        <SeetingsForm 
          firstName={data?.firstName as string} 
          lastName={data?.lastName as string} 
          email={data?.email as string}
        />
      </Card>
    </section>
  )
}

export default SettingsPage