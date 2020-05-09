import React, { useState, memo, useEffect, useRef, useMemo, useReducer, useCallback, useContext } from 'react'
import { Button, Divider } from 'antd'

const Child = memo(({ data }) => {
  console.log('child1 render...', data)
  const [name, setName] = useState(data)
  return (
    <div>
      <div>child</div>
      <div>{name} --- {data}</div>
    </div>
  );
})

const Child2 = memo(({ data }) => {
  console.log('child2 render...', data.name)
  return (
    <div>
      <div>child</div>
      <div>{data.name}</div>
    </div>
  );
})

const Child3 = memo(({ data, onChange }) => {
  console.log('child3 render...')
  return (
    <div>
      <div>child</div>
      <div>{data}</div>
      <input type="text" onChange={onChange} />
    </div>
  );
})

const reducer = (state = 0, { type }) => {
  switch (type) {
    case "add":
      return state + 1
    case 'delete':
      return state - 1
    default:
      return state;
  }
}

const Context = React.createContext(null)

const Child4 = memo(() => {
  const [count, dispatch] = useContext(Context)
  console.log('child4 render...')
  return (
    <div>
      <div>child...{count}</div>
      <button onClick={() => dispatch({ type: 'add' })}>child add</button>
      <button onClick={() => dispatch({ type: 'delete' })}>child delete</button>
    </div>
  )
})


function Hooks(props) {
  console.log('Hook render...')
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const [name, setName] = useState('rose')
  const [count2, dispatch] = useReducer(reducer, 0)
  const [count3, dispatch2] = useReducer(reducer, 0)
  const [width, height] = useWindowSize()
  const countRef = useRef(0)
  const btnRef = useRef()

  // useEffect(() => {
  //   console.log('use effect...', count)
  //   const timer = setInterval(() => {
  //     console.log('timer...count:', countRef.current)
  //     setCount(++countRef.current)
  //   }, 1000)
  //   return () => clearInterval(timer)
  // }, [])

  // useEffect(() => {
  //   // 定时器只执行一次，useEffect 里面使用到的state的值, 固定在了useEffect内部， 不会被改变，除非useEffect刷新，重新固定state的值
  //   // 这个是有办法解决的，就是用useRef，可以理解成useRef的一个作用：
  //   const timer = setInterval(() => setCount(count + 1), 1000)
  //   return () => clearInterval(timer)
  // }, [])

  // useEffect(() => {
  //   console.log('use effect...', count)
  //   const timer2 = setInterval(() => setCount(count + 1), 1000)
  //   return () => clearInterval(timer2)
  // })

  useEffect(() => {
    console.log("count changed")
    const onClick = () => {
      setCount(count + 1)
    }
    btnRef.current.addEventListener('click', onClick, false)
    return () => btnRef.current.removeEventListener('click', onClick, false)
  }, [count])

  const data = useMemo(() => {
    return {
      name
    }
  }, [name])
  const onChange = useCallback((e) => {
    setText(e.target.value)
  }, [])
  return (
    <div>
      自定义hook: <br />
      useWindowSize: 宽{width},高{height}
      <div>
        {count}
      </div>
      <Button type="primary" onClick={() => setCount(count + 1)}>update count </Button>
      <Button type="primary" onClick={() => setName('jack')}>update name </Button>
      <button type="primary" ref={btnRef} >click me useRef</button>
      <Child data={name} />
      <Divider />
      {
        count2
      }
      <button onClick={() => dispatch({ type: 'add' })}>add</button>
      <button onClick={() => dispatch({ type: 'delete' })}>delete</button>

      <Child2 data={data} />
      text:{text}
      <Child3 data={name} onChange={onChange} />
      <Context.Provider value={[count3, dispatch2]}>
        <div>
          <div>mom ... {count3}</div>
          <Child4/>
          <button onClick={() => dispatch2({ type: 'add' })}>mom add</button>
          <button onClick={() => dispatch2({ type: 'delete' })}>mom delete</button>
        </div>
      </Context.Provider>
    </div>
  )
}

const useWindowSize = () => {
  console.log('useWindowSize')
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()

  useEffect(() => {
    const { clientWidth, clientHeight } = document.documentElement
    setWidth(clientWidth)
    setHeight(clientHeight)
  }, [])

  useEffect(() => {
    const handleWindowResize = () => {
      const { clientWidth, clientHeight } = document.documentElement
      setWidth(clientWidth)
      setHeight(clientHeight)
    }
    window.addEventListener('resize', handleWindowResize, false)
    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  })
  return [width, height]
}

export default Hooks