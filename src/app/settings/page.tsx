import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import SeetingsForm from '@/src/components/SeetingsForm'
import prisma from '@/src/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ShieldAlert } from 'lucide-react'
import React from 'react'

type Props = {}

async function getData(userId:string) {
  try {
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
  } catch (error) {
    return null
  }
}

const SettingsPage = async (props: Props) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if(!user) {
    return (
      <section className='max-w-7xl mx-auto px-4 md:px-8'>
        <Card>
          <CardHeader>
              <div className='flex flex-row items-center mx-auto gap-2'>
                <ShieldAlert color="#ee2020" className='mx-auto'/>
                <CardTitle className='mx-auto'>Unauthorized</CardTitle>
              </div>
            </CardHeader>
        </Card>
      </section>
    )
  }

  const data = await getData(user.id);

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