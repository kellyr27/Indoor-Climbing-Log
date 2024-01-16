import React, {useEffect, useState} from 'react'


export default function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  return (
    <div>
      {(typeof data.users === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Users</h1>
          <ul>
            {data.users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
