import { useEffect, useState } from "react";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";
import diaryService from "./services/diaryService";
import "./index.css";
import DiaryEntryForm from "./components/DiaryEntryForm";
import axios from "axios";

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [notification, setNotification] = useState('')

  useEffect(() => {
    diaryService.getAllDiaries().then((data) => setDiaries(data));
  }, []);

  const addDiaryEntry = async (object: NewDiaryEntry) => {
    try {
      const newDiary = await diaryService.addDiary(object);
      setDiaries(diaries.concat(newDiary));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setNotification(error.response?.data)
        setTimeout(() => {
          setNotification('')
        }, 3000);
      }
    }
  };

  return (
    <>
      <DiaryEntryForm addDiaryEntry={addDiaryEntry} notification={notification} />
      <h2>Diary entries</h2>
      {diaries.map((d) => (
        <div key={d.id}>
          <h3>{d.date}</h3>
          <p>visibility: {d.visibility}</p>
          <p>weather: {d.weather}</p>
        </div>
      ))}
    </>
  );
}

export default App;
