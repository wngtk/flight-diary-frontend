import { useEffect, useState } from 'react'
import { NonSensitiveDiaryEntry } from './types'
import diaryService from './services/diaryService'
import "./index.css"

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])

  useEffect(() => {
    diaryService.getAllDiaries()
      .then(data => setDiaries(data))
  }, [])

  return (
    <>
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
