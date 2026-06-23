import { useReducer } from "react"

const initData = [
  {
    id: 1,
    name: "张三",
    price: 9,
    count: 1,
    isEdit: false
  },
  {
    id: 2,
    name: "李四",
    price: 19,
    count: 1,
    isEdit: false
  },
  {
    id: 3,
    name: "王五",
    price: 29,
    count: 1,
    isEdit: false
  },
]

type State = typeof initData

const reducer = (state: State, action: { type: string, id: number, name?: string }) => {
  // const item = state.find((item) => item.id === action.id)
  switch (action.type) {
    case 'add':
      return state.map((item) => 
      item.id === action.id 
        ? {...item, count: item.count + 1 } 
        : item
      )
    case 'dec':
      return state.map(item => 
        item.id === action.id && item.count > 1
        ? {...item, count: item.count - 1 }
        : item
      )
    case 'delete':
      return state.filter(item => item.id !== action.id)
    case 'edit':
      return state.map(item => item.id === action.id ? {...item, isEdit: !item.isEdit } : item)
    case 'edit-name':
      return state.map(item => item.id === action.id ? {...item, name: action.name } : item)
    case 'blur':
      return state.map(item => item.id === action.id ? {...item, isEdit: !item.isEdit } : item)
    default:
      return state
  }
}

function ShoppingList() {
  const [data, dispatch] = useReducer(reducer, initData)
  return (
    <div>
      <h2>购物车</h2>
      <table cellSpacing={0} cellPadding={0} border={1} width="100%">
        <thead>
          <tr>
            <th>商品名称</th>
            <th>价格</th>
            <th>数量</th>
            <th>小计</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td align="center">{item.isEdit ? <input type="text" onBlur={() => dispatch({ type: 'blur', id: item.id })} onChange={e => dispatch({ type: 'edit-name', id: item.id, name: e.target.value })} defaultValue={item.name} /> :item.name}</td>
                <td align="center">{item.price}</td>
                <td align="center">
                  <button onClick={() => dispatch({ type: 'add', id: item.id })}>+</button>
                  {item.count}
                  <button onClick={() => dispatch({ type: 'dec', id: item.id })}>-</button>
                </td>
                <td align="center">{item.count * item.price}</td>
                <td align="center">
                  <button onClick={() => dispatch({ type: 'edit', id: item.id })}>编辑</button>
                  <button onClick={() => dispatch({ type: 'delete', id: item.id })}>删除</button>
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td align="center" colSpan={4}>总价</td>
            <td align="center">
              结算:{' '}
              {data.reduce((prev, next) => {
                return prev + next.count * next.price
              }, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default ShoppingList;