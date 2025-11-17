const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Header = ({ course }: { course: string }) => {
    return <h1>{course}</h1>
  }
  const Content = ({ part, exercises }: { part: string, exercises: number }) => {
    return <p>
      {part} {exercises}
    </p>
  }
  const Total = ({ exercises }: { exercises: Array<number> }) => {
    return <p>Number of exercises {exercises.reduce((acc, n) => acc + n, 0)}</p>
  }
  return (
    <div>
      <Header course={course} />
      <Content part={part1} exercises={exercises1} />
      <Content part={part2} exercises={exercises2} />
      <Content part={part3} exercises={exercises1} />

      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App
