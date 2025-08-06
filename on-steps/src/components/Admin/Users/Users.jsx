import React, { useEffect, useState } from 'react';
import './Users.css'; 

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3000/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
      });
      fetchUsers(); 
    }
  };

  const handleBlockToggle = async (id, currentStatus) => {
    await fetch(`http://localhost:3000/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isBlocked: !currentStatus }),
    });
    fetchUsers();
  };

  return (
    <div className="users-page">
      <h1>Manage Users</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Block/Unblock</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, email, isBlocked }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>
                <button
                  className={isBlocked ? 'unblock-btn' : 'block-btn'}
                  onClick={() => handleBlockToggle(id, isBlocked)}
                >
                  {isBlocked ? 'Unblock' : 'Block'}
                </button>
              </td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
