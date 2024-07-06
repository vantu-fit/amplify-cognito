import { TabsLogin } from '@/components/form-auth/form'
import React from 'react'

function Page() {
  // get email from the query params

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <TabsLogin />
    </div>
  )
}

export default Page