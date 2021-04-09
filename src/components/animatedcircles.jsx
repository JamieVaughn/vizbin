import React, {useEffect, useState, useRef} from 'react'
import {animated, useSpring} from 'react-spring'
import useInterval from '../hooks/useInterval'

const allCircles = [1, 2, 3, 4, 5, 6]

const generateCircles = () => allCircles.filter(c => Math.random() > 0.5)

export const AnimatedCircles = () => {
  const [visibleCircles, setVisibleCircles] = useState(
    generateCircles()
  )
  useInterval(() => {
    setVisibleCircles(generateCircles())
  }, 3000)
  return (
    <svg width='600' viewBox="0 0 120 20">
      {allCircles.map(d => (
        <AnimatedCircle
          key={d}
          index={d}
          isShowing={visibleCircles.includes(d)}
        />
      ))}
    </svg>
  )
}
const AnimatedCircle = ({ index, isShowing }) => {
  const wasShowing = useRef(false)
  useEffect(() => {
    setTimeout(() => wasShowing.current = isShowing, 1000)
  }, [isShowing])
  const style = useSpring({
    config: {
      duration: 1000,
    },
    r: isShowing ? 6 : 0,
    opacity: isShowing ? 1 : 0,
  })
  return (
    <animated.circle {...style}
      cx={index * 15 + 10}
      cy="10"
      fill={
        !isShowing          ? "tomato" :
        !wasShowing.current ? "cornflowerblue" :
                              "lightgrey"
      }
    />
  )
}