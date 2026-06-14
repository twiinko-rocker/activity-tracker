import { useState, useEffect } from "react";
import '../styles/pages.css';
import { Link } from "react-router-dom";

export const ActivityList = () => {
    const [activities, setActivities] = useState([]);
    const totalSessions = activities.length;
    const totalMinutes = activities.reduce((sum, activity) => sum + activity.duration, 0);
    const totalDistance = activities.reduce((sum, activity) => sum + (activity.distance || 0), 0); // Optional: total distance if you want to display it
    const [filter, setFilter] = useState("All");
    const filteredActivities = filter === "All" ? activities : activities.filter(activity => activity.activity === filter); // Filter activities based on selected activity type
    const activityTypes = ["All", ...new Set(activities.map(activity => activity.activity))];

    useEffect(() => {
        async function fetchActivities() {
            const token = localStorage.getItem("token");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/activities`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setActivities(data);
            } else {
                console.error("Failed to fetch activities");
            }
        }
        fetchActivities();
    }, []);

    async function handleDelete(id) {
        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/activities/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            setActivities((prev) => prev.filter((activity) => activity._id !== id));
        } else {
            console.error("Failed to delete activity");
        }
    }


    return (
        <div className="activity-info">
            <h2>Your Activities</h2>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <div className="activity-card" style={{ flex: 1, textAlign: 'center' }}>
                    <h3>{totalSessions}</h3>
                    <p>Total Sessions</p>
                </div>
                <div className="activity-card" style={{ flex: 1, textAlign: 'center' }}>
                    <h3>{totalMinutes}</h3>
                    <p>Total Minutes</p>
                </div>
                <div className="activity-card" style={{ flex: 1, textAlign: 'center' }}>
                    <h3>{totalDistance} km</h3>
                    <p>Total Distance</p>
                </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="activity-filter" style={{ marginRight: '0.5rem' }}>Filter by Activity:</label>
                <select id="activity-filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    {activityTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            
            {filteredActivities.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                    <p>No activities logged yet.</p>
                    <Link to="/log-activity" style= {{ color: '#007BFF', textDecoration: 'none' }}>
                        Log your first activity!
                    </Link>
                </div>
            ) : (
            filteredActivities.map((activity) => (
                <div key={activity._id} className="activity-card">
                    <h3>{activity.activity}</h3>
                    <p>Duration: {activity.duration} minutes</p>

                    {activity.distance && <p>Distance: {activity.distance} km</p>}
                    <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
                    <p>Notes: {activity.notes}</p>

                    <button className="delete-btn" onClick={() => handleDelete(activity._id)}>
                        Delete
                    </button>
                </div>
            ))
        )}
        </div>
    );
}

