const Course = (props) => {
  return(
    <div>
      <Header courseName={props.course.name}></Header>
      <Content parts={props.course.parts}></Content>
      <Total parts={props.course.parts}></Total>
    </div>
  )
}

const Header = (props) => <h1>{props.courseName}</h1>
const Content = (props) => props.parts.map(part => <Part key={part.id} partName={part.name} partEx={part.exercises}></Part>)
const Part = (props) => <p>{props.partName} {props.partEx}</p>

const Total = (props) => {
  const total = props.parts.reduce((total, curr) => total + curr.exercises, 0)
  return <h4>total of {total} exercises</h4>
}

export default Course