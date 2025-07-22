import { useState } from 'react'

const MAIN = (props) => <div><h1>Anecdote of the day</h1>{props.anecdote}<br/>has {props.votes} votes</div>

const MOST = (props) => <div><h1>Anecdotes with most votes</h1>{props.anecdote}<br/> has {props.votes} votes</div>

const Button = (props) => <button onClick={props.func}>{props.txt}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const randint = () => Math.floor(Math.random() * anecdotes.length)
  const next = () => setSelected(randint)

  const [votes, setVoted] = useState(Array(anecdotes.length).fill(0))

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVoted(copy)
  }

  const most = Math.max(...votes)
  const indexOfmost = votes.indexOf(most)
  // console.log(most)

  return (
    <>
      <MAIN anecdote={anecdotes[selected]} votes={votes[selected]}></MAIN>
      <Button func={vote} txt="vote"></Button>
      <Button func={next} txt="next anecdote"></Button>
      <MOST anecdote={anecdotes[indexOfmost]} votes={most}></MOST>
    </>
  )
}

export default App