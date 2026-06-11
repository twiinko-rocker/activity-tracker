import { useState } from "react";

const activityOptions = [
  { activity: "Running", hasDistance: true },
  { activity: "Walking", hasDistance: true },
  { activity: "Cycling", hasDistance: true },
  { activity: "Swimming", hasDistance: true },
  { activity: "Weightlifting", hasDistance: false },
  { activity: "Yoga", hasDistance: false },
  { activity: "Boxing", hasDistance: false },
];

function LogActivity() {
  const today = new Date().toISOString().split("T")[0];

  const [selectedActivity, setSelectedActivity] = useState("");
  const [customName, setCustomName] = useState("");
  const [customHasDistance, setCustomHasDistance] = useState(false);
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [date, setDate] = useState(today);
  const [notes, setNotes] = useState("");

  const selectedOption = activityOptions.find(
    (activity) => activity.activity === selectedActivity
  );

  const isCustom = selectedActivity === "Custom";

  const shouldShowDistance =
    isCustom ? customHasDistance : selectedOption?.hasDistance;

  async function handleSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    const activityData = {
      activity: isCustom ? customName : selectedActivity,
      duration,
      date,
      notes,
      hasDistance: Boolean(shouldShowDistance),
    };

    if (shouldShowDistance) {
      activityData.distance = distance;
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(activityData),
    });

    if (response.ok) {
      setSelectedActivity("");
      setCustomName("");
      setCustomHasDistance(false);
      setDuration("");
      setDistance("");
      setDate(today);
      setNotes("");
    } else {
      const data = await response.json();
      alert(`Error saving activity: ${data.message}`);
    }
  }

  return (
    <div>
      <h1>Log Activity</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Activity</label>
          <select
            value={selectedActivity}
            onChange={(event) => setSelectedActivity(event.target.value)}
          >
            <option value="">Select an activity</option>

            {activityOptions.map((activity) => (
              <option key={activity.activity} value={activity.activity}>
                {activity.activity}
              </option>
            ))}

            <option value="Custom">Custom</option>
          </select>
        </div>

        {isCustom && (
          <div>
            <label>Custom activity name</label>
            <input
              type="text"
              value={customName}
              onChange={(event) => setCustomName(event.target.value)}
            />

            <label>
              <input
                type="checkbox"
                checked={customHasDistance}
                onChange={(event) =>
                  setCustomHasDistance(event.target.checked)
                }
              />
              Has distance?
            </label>
          </div>
        )}

        <div>
          <label>Duration</label>
          <input
            type="number"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            placeholder="Minutes"
          />
        </div>

        {shouldShowDistance && (
          <div>
            <label>Distance</label>
            <input
              type="number"
              value={distance}
              onChange={(event) => setDistance(event.target.value)}
              placeholder="Kilometers"
            />
          </div>
        )}

        <div>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div>
          <label>Notes</label>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>

        <button type="submit">Save activity</button>
      </form>
    </div>
  );
}

export default LogActivity;