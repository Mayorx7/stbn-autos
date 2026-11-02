import RadioFilter from '@/components/shared/radio-filter'
import { AwaitedPageProps } from '@/config/types'
import { CarStatus } from '@/config/constants'
import React from 'react'
import CreateCarDialog from './CreateCarDialog'

const CarManageHeader = ({searchParams}: AwaitedPageProps) => {
  return (
    <div className='flex flex-col p-6 space-y-4 text-muted'>
      <div className="flex items-center justify-between">
        <h1 className='font-bold text-lg md:text-2xl'>
            All cars/vehicles
        </h1>
        <div className='flex items-center justify-between'>
            <RadioFilter
                searchParams={searchParams}
                items={["ALL", ...Object.values(CarStatus)]}
            />
            {/* create cars dialog */}
            <CreateCarDialog />
        </div>
      </div>
    </div>
  )
}

export default CarManageHeader
