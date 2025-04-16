import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <p className='text-md text-cyan-600'>{text1} <span className='text-md text-cyan-950'>{text2}</span></p>
  )
}

export default Title