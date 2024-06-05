import axios from "axios"
import { NonSensitiveDiaryEntry } from "../types"

const getAllDiaries = async () => {
  const response = await axios.get('/api/diaries')
  return response.data as NonSensitiveDiaryEntry[]
}

export default {
  getAllDiaries
}