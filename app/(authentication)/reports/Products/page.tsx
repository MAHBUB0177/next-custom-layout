'use client'

import axiosInstance from '@/service';
import { useGetData } from '@/service/hooks/useGetHook';
import React, { useEffect } from 'react'

const Products = () => {
const { data:currentUser, isLoading, isError } = useGetData<{ id: number; name: string }[]>({
  apiEndpoint: "api/user/currenuserinfo",
});
console.log(currentUser,'currentUser========')

  return (
    <div className='bg-orange-200'>page</div>
  )
}

export default Products;