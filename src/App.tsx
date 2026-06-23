import { useReducer } from "react"

// 1. 定义 State 的类型
interface StateType {
  count: number;
}

// 定义 Action 的类型
interface ActionType {
  type: 'add' | 'dec';
}

const initState: StateType = { count: -1 }

// 2. 修正 reducer 的 state 类型为 StateType
const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'add':
      return { count: state.count + 1 }
    case 'dec':
      return { count: state.count - 1 }
    default:
      return state
  }
}

// 3. 修正 initfn 的参数类型，并通过正确的属性进行计算
const initfn = (initialState: StateType): StateType => {
  return { count: initialState.count + 10 } // 此时初始值会变成 -1 + 10 = 9
}

function App() {
  // 4. 将 {} 改为 [] 数组解构，并为按钮绑定 dispatch 事件确保页面可用
  const [state, dispatch] = useReducer(reducer, initState, initfn)

  return (
    <div>
      <button onClick={() => dispatch({ type: 'add' })}>;+1</button>
      <button onClick={() => dispatch({ type: 'dec' })}>-1</button>
      <div>{state.count}</div>
    </div>
  ) 
}

export default App