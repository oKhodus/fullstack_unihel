const Header = (props) => {
  return(
    <div><h1>{props.courseName}</h1></div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>{props.name} {props.ex}</p>
    </div>
  )
}


const Content = (props) => {
  return (
    <div>
      <Part name={props.p1} ex={props.x1}/>
      <Part name={props.p2} ex={props.x2}/>
      <Part name={props.p3} ex={props.x3}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.x1 + props.x2 + props.x3}</p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header courseName={course}/>
      <Content p1={part1} p2={part2} p3={part3} x1={exercises1} x2={exercises2} x3={exercises3}/>
      <Total x1={exercises1} x2={exercises2} x3={exercises3}/>
    </div>
  )
}

export default App