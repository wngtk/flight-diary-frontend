import { SyntheticEvent, useEffect, useState } from 'react'
import { NonSensitiveDiaryEntry, Visibility, Weather } from './types'
import diaryService from './services/diaryService'
import "./index.css"

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])

  useEffect(() => {
    diaryService.getAllDiaries()
      .then(data => setDiaries(data))
  }, [])

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      date: { value: string },
      visibility: { value: Visibility },
      weather: { value: Weather },
      comment: { value: string }
    }

    const newDiary = await diaryService.addDiary({
      date: target.date.value,
      comment: target.comment.value,
      visibility: target.visibility.value,
      weather: target.weather.value
    })
    setDiaries(diaries.concat(newDiary))
  }

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={submit}>
        <div>
          date
          <input type="text" name='date' />
        </div>
        <div>
          visibility
          <input type="text" name='visibility' />
        </div>
        <div>
          weather
          <input type="text" name='weather' />
        </div>
        <div>
          comment
          <input type="text" name='comment' />
        </div>
        <button>add</button>
      </form>
      <h2>Diary entries</h2>
      {diaries
        .map(d =>
          <div key={d.id}>
            <h3>{d.date}</h3>
            <p>visibility: {d.visibility}</p>
            <p>weather: {d.weather}</p>
          </div>)}
    </>
  )
}

export default App
