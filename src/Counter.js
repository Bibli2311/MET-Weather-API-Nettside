import { useReducer } from "react"

const initialState =
{
    count: 0
}

function HandleCount(state, action)
{
    switch(action.type)
    {
        case "increment":
            return {count: state.count + 1}
        case "decrement":
            return {count: state.count -1 }
        default: console.error("invalid action type in reducer.")
            break;
    }
}

function Counter()
{
    const [state, dispatch] = useReducer(HandleCount, initialState)

    return(
        <>
            Count: {state.count}
            <button onClick={() => dispatch({type: "increment"})}>+</button>
            <button onClick={() => dispatch({type: "decrement"})}>-</button>
        </>
    )
}

export default Counter