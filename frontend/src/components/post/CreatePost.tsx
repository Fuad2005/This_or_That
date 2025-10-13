"use client"

import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';


function CreatePost() {

    const router = useRouter()
    const [question, setQuestion] = React.useState('');
    const [option1, setOption1] = React.useState('');
    const [option2, setOption2] = React.useState('');

    const [errMsg, setErrMsg] = React.useState('');



    React.useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/login");
      }
    }, [router]);


    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/post/create/`, {
            question: question,
            option1: { text: option1 },
            option2: { text: option2 } 
        }, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res);
            router.push('/profile');
        }).catch(err => {
            console.log(err);
            setErrMsg(JSON.stringify(err.response.data))
        })

    }, [option1, option2, question, router])

    const formChange = React.useCallback(() => {
        setErrMsg('');
    }, [])


  return (
    <div>
         <h1 className='text-3xl font-bold text-center mt-10'>Create Post</h1>

        <div>   
            <form onSubmit={handleSubmit} onChange={formChange}>
            <div className="m-10 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="px-4 py-4 bg-white rounded-t-lg dark:bg-gray-800">
                    <label htmlFor="comment" className="sr-only">Your Post</label>
                    <textarea onChange={(e) => {setQuestion(e.target.value)}} value={question} id="question" rows={2} maxLength={100} className="w-full text-sm text-gray-900 bg-white border p-2 rounded-lg border-gray-200 dark:border-gray-600 dark:bg-gray-800 focus:ring-0 outline-0 dark:text-white dark:placeholder-gray-400" placeholder="Ask a Question..." required ></textarea>
                    <div className='flex gap-4 mt-2'>
                        <input type="text" onChange={(e) => {setOption1(e.target.value)}} maxLength={50} value={option1} className="w-full text-sm text-gray-900 bg-white border p-2 rounded-lg border-gray-200 dark:border-gray-600 dark:bg-gray-800 focus:ring-0 outline-0 dark:text-white dark:placeholder-gray-400 " placeholder="Option 1" required />
                        <input type="text" onChange={(e) => {setOption2(e.target.value)}} maxLength={50} value={option2} className="w-full text-sm text-gray-900 bg-white border p-2 rounded-lg border-gray-200 dark:border-gray-600 dark:bg-gray-800 focus:ring-0 outline-0 dark:text-white dark:placeholder-gray-400 " placeholder="Option 2" required />
                    </div>
                </div>
                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Create a Post
                    </button>
                    
                </div>
            </div>
                <div className={`${errMsg==="" ? "hidden" : ""} flex items-center p-4 m-10 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`} role="alert">
                    <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">{errMsg}</span> 
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreatePost