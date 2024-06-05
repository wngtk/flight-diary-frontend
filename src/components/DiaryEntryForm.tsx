import { SyntheticEvent } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

interface Props {
    addDiaryEntry: (object: NewDiaryEntry) => unknown;
    notification: string
}

const DiaryEntryForm = ({ addDiaryEntry, notification }: Props) => {

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      date: { value: string };
      visibility: { value: Visibility };
      weather: { value: Weather };
      comment: { value: string };
    };

    addDiaryEntry({
        comment: target.comment.value,
        visibility: target.visibility.value,
        weather: target.weather.value,
        date: target.date.value
    })
  };

  const style = {
    color: 'red'
  }

  const flex = {
    display: "flex",
    gap: "1em"
  }

  return (
    <>
      <h2>Add new entry</h2>
      {notification && <p style={style}>{notification}</p>}
      <form onSubmit={submit}>
        <div>
          date
          <input type="date" name="date" />
        </div>
        <div style={flex}>
          visibility
          {
            Object.values(Visibility).map((opt, idx) =>
                <div key={idx}>
                    {opt}<input key={idx} type="radio" name="visibility" value={opt} />
                </div>
            )
          }
        </div>
        <div style={flex}>
          weather
          {
            Object.values(Weather).map((opt, idx) =>
                <div key={idx}>
                    {opt}<input key={idx} type="radio" name="weather" value={opt} />
                </div>
            )
          }
        </div>
        <div>
          comment
          <input type="text" name="comment" />
        </div>
        <button>add</button>
      </form>
    </>
  );
};

export default DiaryEntryForm