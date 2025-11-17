const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  type partType = {
    name: string,
    exercises: number
  }
  const Header = ({ course }: { course: string }) => {
    return <h1>{course}</h1>
  }
  const Part = ({ name, exercises }: { name: string, exercises: number }) => {
    return <p>
      {name} {exercises}
    </p>
  }
  const Content = ({ parts }: { parts: Array<partType> }) => {
    return <>
      <Part {...parts[0]} />
      <Part {...parts[1]} />
      <Part {...parts[2]} />

    </>
  }
  const Total = ({ exercises }: { exercises: Array<number> }) => {
    return <p>Number of exercises {exercises.reduce((acc, n) => acc + n, 0)}</p>
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />

      <Total exercises={[course.parts[0].exercises, course.parts[1].exercises, course.parts[2].exercises]} />
    </div>
  )
}

export default App
