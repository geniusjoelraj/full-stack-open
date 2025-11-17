import { useEffect, useState } from 'react'

const StatisticsLine = ({ text, value }: { text: string, value: number }) => {
  return <>
    <td>{text}</td>
    <td>{value}</td>
  </>
}

const Statistics = ({ good, neutral, bad }: { good: number, neutral: number, bad: number }) => {
  const [average, setAverage] = useState(0)
  const [total, setTotal] = useState(0)
  const [pos, setPos] = useState(0)

  useEffect(() => {
    const total = good + bad + neutral;
    const avg = ((good * 1) + (neutral * 0) + (bad * -1)) / total;
    const positive = (good / total) * 100;
    setPos(positive);
    setTotal(total)
    setAverage(avg)
  }, [good, neutral, bad])
  return <>
    <table>
      <tr>
        <StatisticsLine text={"good"} value={good} />
      </tr>
      <tr>
        <StatisticsLine text={"neutral"} value={neutral} />
      </tr>
      <tr>
        <StatisticsLine text={"bad"} value={bad} />
      </tr>
      <tr>
        <td>total</td>
        <td>{total}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{average}</td>
      </tr>
      <tr>
        <td>positve</td>
        <td>{pos} %</td>
      </tr>
    </table>

  </>
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <div>

        {good || bad || neutral ?
          <Statistics good={good} neutral={neutral} bad={bad} /> :
          <p>No feedback given</p>
        }
      </div>
    </div>
  )
}

export default App
