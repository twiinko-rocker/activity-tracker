import { useState, useEffect } from "react";
import '../styles/pages.css';
import { Link } from "react-router-dom";

export const ActivityList = () => {
    const [activities, setActivities] = useState([]);

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

            {activities.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                    <p>No activities logged yet.</p>
                    <Link to="/log-activity" style={{ color: '#007BFF', textDecoration: 'none' }}>
                        Log your first activity!
                    </Link>
                </div>
            ) : (
            activities.map((activity) => (
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

