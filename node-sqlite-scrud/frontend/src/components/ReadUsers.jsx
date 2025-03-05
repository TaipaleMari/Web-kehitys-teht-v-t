import { useState, useEffect } from "react";
import axios from "axios";

export default function ReadUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/users");
                setUsers(response.data);
            } catch (err) {
                setError("Error fetching users: " + (err.response?.data?.error || err.message));
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Users List</h2>
            {loading && <p>Ladataan käyttäjiä...</p>}
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
            {!loading && users.length === 0 && !error && <p>Ei käyttäjiä löytynyt.</p>}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                       UserID:{user.id} {user.name} ({user.email}), Age: {user.age}
                    </li>
                ))}
            </ul>
        </div>
    );
}
