import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const Script = ({videoData}) => {
  return (
    <div className='p-5 shadow rounded-xl'>
        <h2 className='font-bold text-lg'>Video Ads Script</h2>
        <hr className='my-3' />
        <div className=''>
            <label className='text-gray-500' htmlFor="">Project Name</label>
            <Input value={videoData?.topic} />
        </div>
        <div className='mt-3'>
            <label className='text-gray-500' htmlFor="">Video Script</label>
            <Textarea className={'text-lg'}
  value={(videoData?.scriptVariant?.generatedScript ?? '').slice(0, 300) + '...'}
  readOnly
/>



        </div>
    </div>
  )
}

export default Script