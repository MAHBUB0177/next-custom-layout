import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import SmallDeviceHeader from './smallDeviceHeader';
import profilePic from '@/public/images/profile.jpg'
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';


interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const RootHeader = ({ isOpen, setIsOpen }:SidebarProps) => {
    const router=useRouter()

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/auth');
      };
   
    return (
        <div >
            <div
            className={`${
                isOpen ? "w-full md:w-[85%]" : "w-full md:[90%] lg:w-[95%]"
              } p-5 bg-white z-50 transition-all duration-300 shadow-sm  fixed md:px-16 lg:px-12  border-t-2 border-slate-100`}
             >
               
                <div className=' hidden md:block'>
                    <div className='  flex justify-between items-center'>
                        <Link href={'/'}>
                            <div className='flex gap-1'>
                                {/* <Image
              src={profilePic}
              alt="Picture of the author"
              className='h-[30px] w-[30px] cursor-pointer'
            /> */}
                                <p className='text-xl text-red-500 font-bold pt-1'>TrendyCart</p>
                            </div>
                        </Link>



                        <div className="flex justify-start gap-7 pt-1 ">






                            {/* {sessionStatus == 'authenticated' ? (
            <>
              <p className="flex justify-center items-center cursor-pointer text-normal h-[35px] w-[35px] font-semibold rounded-full bg-secondary text-white pt-0"
                onClick={() => setShow(!show)}>
                {authUserData?.name?.charAt(0).toUpperCase()}
              </p>{" "}
            </>
          ) : ( */}
                            <div className='flex justify-between gap-2'>
                                {/* <Link href={'/auth'} >
                                    <button
                                        className={"w-20 text-sm p-[6px] font-semibold border hover:bg-red-200 border-red-500  text-red-400 rounded-md hover:scale-105 duration-300"}
                                    >
                                        Sign in

                                    </button>
                                </Link> */}

                                {/* <Link href={'/signup'} > */}
                                    <button
                                        onClick={handleLogout}
                                        className={"w-20 cursor-pointer text-sm p-[6px] font-semibold bg-red-500 rounded-sm text-white"}
                                    >
                                       LogOut
                                    </button>
                                {/* </Link> */}
                            </div>


                            {/* )} */}


                        </div>


                    </div>
                </div>

                <div className='md:hidden '>
                    <SmallDeviceHeader  isOpen={isOpen} setIsOpen={setIsOpen}/>

                </div>
            </div>
        </div>
    )
}

export default RootHeader;