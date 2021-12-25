import { useState } from 'react'

export default function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue)
  const toggleValue = () => setValue(prev => !prev)
  return [value, toggleValue]
}

// use it like: 
// const [value, toggleValue] = useToggle(true)
// <p onClick={toggleValue}>{value}</p>
