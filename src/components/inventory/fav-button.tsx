"use client"
import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { HeartIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toggleFavourite } from '@/lib/favourites'
// TODO: Integrate with Supabase for favourites
// import { api } from '@/lib/api-client'
// import { endpoints } from '@/config/endpoints'


interface FavButtonProps {
  setIsFav: (isFav: boolean) => void
  isFav: boolean
  id: number
}

const FavButton = ({
  setIsFav,
  isFav,
  id
}: FavButtonProps) => {
  const router = useRouter()

  const handlefavClick = async () => {
    // TODO: Integrate with Supabase for favourites
    // const {ids}  = await api.post<{ids: number[]}>(endpoints.favourites, {
    //   json: {id}
    // })

    // if (ids.includes(id) ){
    //   setIsFav(true)
    // }
    // else {
    //   setIsFav(false)
    // }

    const ids = toggleFavourite(id)
    setIsFav(ids.includes(id))

    setTimeout(() => {
      router.refresh()
    }, 250);
  }
  return (
    <Button 
    onClick={handlefavClick}
    size={"icon"}
    variant={"ghost"}
         className={cn(`absolute top-2.5 left-3.5 rounded-full
         z-10 group !h-6 !w-6 lg:!h-8 lg:!w-8 xl:!h-10 xl:!w-10`,
         isFav ? 'bg-[#FFC400] text-[#031B3D] hover:bg-[#FFD34D]' : 'bg-[#D7DEE8] hover:bg-[#D9ECFA]')}
    >
        <HeartIcon 
         className={cn(`duration-200 transition-colors
             ease-in-out w-3.5 h-3.5 lg:w-5 lg:h-5 xl:w-6 xl:h-6
             text-white`,
             isFav ? 'text-white' : 'text-[#53657A] group-hover:text-[#062A5E]')}
        />
    </Button>
  )
}

export default FavButton
