import { useEffect, useState, useRef } from 'react'

const TextClock = () => {
  const [initialized, setInitialized] = useState(false)
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [prevHours, setPrevHours] = useState<number>(0)
  const [prevMinutes, setPrevMinutes] = useState<number>(0)
  const [nextHours, setNextHours] = useState<number>(0)
  const [nextMinutes, setNextMinutes] = useState<number>(0)
  const [animationOffset, setAnimationOffset] = useState<number>( -500)
  const [animationDuration, setAnimationDuration] = useState<number>(1000)
  const [timeOffset, setTimeOffset] = useState<number>(0)
  const [separatorOffset, setSeparatorOffset] = useState<number>(-10)
  const [gradationEnabled, setGradationEnabled] = useState(false)
  const [gradationMin, setGradationMin] = useState(14)
  const [gradationMax, setGradationMax] = useState(84)
  const hourAnimation = useRef<boolean>(false)
  const minuteAnimation = useRef<boolean>(false)

  useEffect(() => {
    hourAnimation.current = (minutes === 59 && seconds >= (60 + (animationOffset / 1000)) || minutes === 0 && seconds < animationDuration / 1000 + animationOffset / 1000)
  }, [minutes, seconds, animationOffset, animationDuration])

  useEffect(() => {
    minuteAnimation.current = seconds >= (60 + (animationOffset / 1000)) || seconds < animationDuration / 1000 + animationOffset / 1000
  }, [seconds, animationOffset, animationDuration])

  useEffect(() => {
    if (initialized) return
    setInitialized(true)

    const getTime = () => {
      const now = new Date(new Date().getTime() - timeOffset)

      setHours(now.getHours() % 12)
      setMinutes(now.getMinutes())
      setSeconds(now.getSeconds() + now.getMilliseconds() / 1_000)

      const next = new Date(now.getTime() + animationDuration)
      setNextHours(next.getHours() % 12)
      setNextMinutes(next.getMinutes())
      const prev = new Date(next.getTime() - 60000)
      setPrevHours(prev.getHours() % 12)
      setPrevMinutes(prev.getMinutes())

      requestAnimationFrame(getTime)
    }
    getTime()

  }, [initialized])

  return (
    <div className="time rotateH">
      <div className="hour">
        <div style={{animationDuration: `${animationDuration}ms`}}>
          {`${(hourAnimation.current ? prevHours : hours) >= 10 ? Math.floor((hourAnimation.current ? prevHours : hours) / 10) : '\u2007'}`}
        </div>
        {
          hourAnimation.current ?
            <div style={{animationDuration: `${animationDuration}ms`}}>{`${nextHours % 12 >= 10 ? Math.floor(nextHours % 12 / 10) : '\u2007'}`}</div>:
            <></>
        }
      </div>
      <div className="hour">
        <div style={{animationDuration: `${animationDuration}ms`}}>
          {`${(hourAnimation.current ? prevHours : hours) % 10}`}
        </div>
          {
           hourAnimation.current ?
            <div style={{animationDuration: `${animationDuration}ms`}}>{`${nextHours % 12 % 10}`}</div>:
            <></>
        }
      </div>
      <div className="sep" style={{transform: `translateY(${separatorOffset}px)`}}>:</div>
      <div className={`min${gradationEnabled ? ' gradation' : ''}`}>
        <div style={gradationEnabled ? {background: `linear-gradient(to bottom, white ${(60 - seconds) / 60 * (gradationMax - gradationMin) + gradationMin}%, skyblue ${(60 - seconds) / 60 * (gradationMax - gradationMin) + gradationMin}%, skyblue)`, animationDuration: `${animationDuration}ms`} : {animationDuration: `${animationDuration}ms`}}>
          {`${Math.floor((minuteAnimation.current ? prevMinutes : minutes) % 60 / 10)}`}
        </div>
        {
          minuteAnimation.current ?
            <div style={{animationDuration: `${animationDuration}ms`}}>{`${Math.floor(nextMinutes % 60 / 10)}`}</div>:
            <></>
        }
      </div>
      <div className={`min${gradationEnabled ? ' gradation' : ''}`}>
        <div style={gradationEnabled ? {background: `linear-gradient(to bottom, white ${(60 - seconds) / 60 * (gradationMax - gradationMin) + gradationMin}%, skyblue ${(60 - seconds) / 60 * (gradationMax - gradationMin) + gradationMin}%, skyblue)`, animationDuration: `${animationDuration}ms`} : {animationDuration: `${animationDuration}ms`}}>
          {`${((minuteAnimation.current ? prevMinutes : minutes) % 10)}`}
        </div>
        {
          minuteAnimation.current ?
            <div style={{animationDuration: `${animationDuration}ms`}}>{`${Math.min(nextMinutes % 10)}`}</div>:
            <></>
        }
      </div>
    </div>
  )
}

export default TextClock
