// Filename - Progress_bar.js

import React from 'react'

const Progress_bar = ({bgcolor,progress,height, voteCount}) => {
   
    const Parentdiv = {
        height: height,
        width: '100%',
        // backgroundColor: 'whitesmoke',
        borderRadius: 40,
      }
    
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius:40,
        textAlign: 'right'
      }
    
      const progresstext = {
        padding: 10,
        color: 'white',
        fontWeight: 700
      }
      
    return (
    <div style={Parentdiv} className='bg-gray-300 dark:bg-[whitesmoke]'>
      <div style={Childdiv}>
        <span style={progresstext}>{`${voteCount}`}</span>
      </div>
    </div>
    )
}

export default Progress_bar;