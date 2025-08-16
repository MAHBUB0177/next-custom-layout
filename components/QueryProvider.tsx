
// 'use client'
// import React, { useEffect, useState } from 'react';
// import {
//   QueryClient,
//   QueryClientProvider
// } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import Sidebar from './layout/sideBar';
// import RootHeader from './layout/rootHeader';
// import RootFooter from './layout/rootFooter';

// interface Props {
//   children: React.ReactNode;
// }

// // Initialize QueryClient outside the component to persist cache
// const queryClient = new QueryClient();

// const QueryProvider = ({ children }: Props) => {

//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <div className="flex">
//         <div className={`${isOpen ? "w-[15%]" : "w-[5%]"} transition-all duration-300`} >
//           <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
//         </div>

//         {/* Main Content */}
//         <div className={`${isOpen ? "w-[85%]" : "w-[95%]"} transition-all duration-300`}>
//           <RootHeader isOpen={isOpen} />
//           <main className="p-6">{children}</main>
//           <RootFooter />
//         </div>
//       </div>
//       <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
//     </QueryClientProvider>
//   );
// };

// export default QueryProvider;


'use client'
import React, { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Sidebar from './layout/sideBar';
import RootHeader from './layout/rootHeader';
import RootFooter from './layout/rootFooter';
import { useSession } from 'next-auth/react';
import Login from '@/app/(authentication)/auth/page';
import SignUp from '@/app/(authentication)/signup/page';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;

}

// Initialize QueryClient outside the component to persist cache
const queryClient = new QueryClient();

const QueryProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session, status: sessionStatus } = useSession();
  const pathname = usePathname();

  if (sessionStatus === 'unauthenticated' && pathname == '/signup') {
    return <SignUp />;
  }else if(sessionStatus === 'unauthenticated'){
    return <Login/>
  }
  return (
   
    <QueryClientProvider client={queryClient}>
      <div className="flex relative">
        {/* Sidebar */}
        <div className={`${isOpen ? "w-[45%] absolute md:relative md:w-[20%] lg:w-[15%]" : "hidden md:block md:[10%] lg:w-[5%]"} transition-all duration-300`} >
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        {/* Main Content */}
        <div className={`${isOpen ? "w-full  md:w-[80%] lg:w-[85%]" : "w-full md:[90%] lg:w-[95%]"} transition-all duration-300`}>
          {/* Fixed Header on Small Devices when isOpen is true */}
          <div >
            <RootHeader isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          {/* Main Content with adjusted padding when Sidebar is open */}
          <main style={{ minHeight: "calc(100vh)" }}
            className="pt-[95px] md:pt-[90px] bg-[#FCFCFC] px-2 md:px-6 lg:px-4">
            {children}
          </main>

          {/* Fixed Footer on Small Devices when isOpen is true */}
          <div>
            <RootFooter />
          </div>

        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
};

export default QueryProvider;

