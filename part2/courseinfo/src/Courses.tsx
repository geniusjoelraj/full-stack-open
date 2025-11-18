type partType = {
  name: string,
  exercises: number,
  id: number
}
type courseType = {
  id: number,
  name: string,
  parts: Array<partType>
}

const Header = ({ header }: { header: string }) => <h1>{header}</h1>
const Part = ({ name, exercises }: { name: string, exercises: number }) => <p>{name} {exercises}</p>
const Content = ({ parts }: { parts: Array<partType> }) => parts.map((part: partType) => <Part name={part.name} key={part.id} exercises={part.exercises} />)

const Course = ({ course }: { course: courseType }) => {
  return <>
    <Header header={course.name} />
    <Content parts={course.parts} />
    <p style={{ fontWeight: "bold" }}> total of {course.parts.reduce((acc, n) => acc + n.exercises, 0)} exercises</p>
  </>

}

const Courses = ({ courses }: { courses: Array<courseType> }) => {
  return <>
    {courses.map((course) => (
      <Course course={course} key={course.id} />
    ))}
  </>
}

export default Courses;
