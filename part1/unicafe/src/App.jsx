import { useState } from 'react'

const StaticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Stastics = (props) => {
  const all = props.good + props.neutral + props.bad
  
  if (!all) {
    return <div><p>No feedback</p></div>
  }

  const avg = ((props.good * 1) + (props.neutral * 0) + (props.bad * (-1))) / all
  const pos = `${(props.good / all) * 100} %`
  const HEADER = () => <h1>Statistics</h1>

  return (

    <>
      <HEADER/>
      <table>
        <tbody>
          <StaticsLine text = {'good'} value={props.good}/>
          <StaticsLine text = {'neutral'} value={props.neutral}/>
          <StaticsLine text = {'bad'} value={props.bad}/>
          <StaticsLine text = {'all'} value={all}/>
          <StaticsLine text = {'average'} value={avg}/>
          <StaticsLine text = {'positive'} value={pos}/>
        </tbody>
      </table>
    </>
    
  )
}


const Button = (props) => 
<button onClick={props.func}>{props.txt}</button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const func_good = () => setGood(good + 1)
  const func_neutral = () => setNeutral(neutral + 1)
  const func_bad = () => setBad(bad + 1)


  return (
    <div>
      <h1>give feedback</h1>
      <Button func={func_good} txt={'good'}></Button>
      <Button func={func_neutral} txt={'neutral'}></Button>
      <Button func={func_bad} txt={'bad'}></Button>
      <Stastics good={good} neutral={neutral} bad={bad}></Stastics>
    </div>
  )
}

export default App