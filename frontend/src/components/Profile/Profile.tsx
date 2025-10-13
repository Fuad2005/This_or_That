"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getUserByToken } from '@/utils/functions'
import PostItem from '../post/PostItem'
import Swal from 'sweetalert2'
import { resetGlobalUserData } from '@/utils/functions'
import { AppContext } from '@/app/appInitializer'



function Profile() {

    const [userData, setUserData] = React.useState();
    const{ setTokenCheck } = React.useContext(AppContext)!

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            (async () => {
                const res = await getUserByToken(token);
                setUserData(res!.data);
            })();
        } else {
            window.location.href = "/auth/login";
        }
    }, [])

    const logoutHandler = React.useCallback(() => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        resetGlobalUserData();
        localStorage.removeItem("token")
        setTokenCheck(prev => prev + 1)
        window.location.href = "/auth/login";
        
      }
    })
  }, [setTokenCheck])

    //   React.useEffect(() => {
    //       console.log(userData);
    //   }, [userData]);

  return (
    <div>
        <button onClick={logoutHandler} className='bg-red-500 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded shadow absolute top-5 right-5'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
            </svg>
        </button>
        <div className='p-5 sm:p-16 flex justify-between'>
              <div className='w-1/2 flex flex-col gap-4 items-center justify-center'>
                <div className='w-24 h-24 rounded-full overflow-hidden'>
                    <Image priority src={`https://api.dicebear.com/9.x/shapes/png?seed=${userData?.user.username}`} alt='user' width={100} height={100}/>
                </div>
                <div className='text-2xl font-bold'>{userData?.user.username}</div>

              </div>
              <div className='w-1/2 flex flex-col items-center gap-5'>
                {/* <div className='text-2xl font-bold'>{userData?.user.username}</div> */}
                <div className='flex text-center gap-4'>
                    <div>
                      <h3>Posts</h3>
                      <p>{userData?.posts.length}</p>
                    </div>
                    <div>
                      <h3>Votes</h3>
                      <p>{userData?.votes.length}</p>
                    </div>
                </div>

                <Link href={'profile/edit'} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  Edit Profile
                </Link>
              </div>
          </div>

            <div className='text-2xl font-bold p-4'>Posts</div>
            <div className='flex px-4 flex-col gap-4'>
                {userData?.posts.map((post: any) => (
                    <PostItem key={post.id} id={post.id} question={post.question} option1={post.option1} option2={post.option2} author={post.author} author_id={post.author_id} />
                ))}
            </div>
    </div>
  )
}

export default Profile