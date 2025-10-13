import React from 'react'
import ProgressBar from '../progressBar/ProgressBar';
import Image from 'next/image';

type Props = {
    id: number
    question: string
    option1: string
    option2: string
    author: string
    author_id: number
}

function PostItem({id, question, option1, option2, author, author_id}: Props) {

    // React.useEffect(() => {
    //     console.log('id', id);
    //     console.log('question', question);
    //     console.log('option1', option1);
    //     console.log('option2', option2);
    //     console.log('author', author);
    //     console.log('author_id', author_id);
    // }, [id, question, option1, option2, author, author_id])

  return (
    <div className='relative rounded-lg bg-gray-100 dark:bg-gray-800'>
        <div className=' text-center flex flex-col gap-4 px-8 pt-5 pb-16'>
            <h2 className='text-lg font-bold'>{question}</h2>
            <div className='flex flex-col md:flex-row gap-4'>
                <button className='bg-green-500 px-4 py-2 rounded-lg flex-1/2 cursor-pointer hover:bg-green-600 text-white'>{option1}</button>
                <button className='bg-red-500 px-4 py-2 rounded-lg flex-1/2 cursor-pointer hover:bg-red-600 text-white'>{option2}</button>
            </div>
            <div className='flex flex-col gap-4 text-white'>
                <ProgressBar bgcolor="#00C950" progress="85" voteCount={100} height={20} />
                <ProgressBar bgcolor="#fb2c36" progress="40" voteCount={100} height={20} />
            </div>
        </div>

        <div className='absolute bottom-3 right-8 flex items-center gap-2'>
            <div className='w-8 h-8 rounded-full overflow-hidden'>
                <Image priority src={`https://api.dicebear.com/9.x/shapes/png?seed=${author}`} alt='user' width={100} height={100}/>
            </div>
            <h3 className='font-bold'>{author}</h3>
        </div>
    </div>
  )
}

export default PostItem