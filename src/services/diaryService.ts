import axios from "axios"
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types"

const getAllDiaries = async () => {
  const response = await axios.get('/api/diaries')
  return response.data as NonSensitiveDiaryEntry[]
}

const addDiary = async (object: NewDiaryEntry) => {
  const response = await axios.post('/api/diaries', object)
  return response.data as DiaryEntry
}

export default {
  getAllDiaries,
  addDiary
}