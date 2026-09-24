import { useState } from "react";
import { deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function ActivityList({ activities, syncActivities }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const tryDeleteActivity = async (activityId) => {
    setError(null);

    try {
      await deleteActivity(token, activityId);
      syncActivities();
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.name}
            {token && (
              <button
                type="button"
                onClick={() => tryDeleteActivity(activity.id)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
