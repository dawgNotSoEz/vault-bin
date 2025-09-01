import React from 'react'

function Dashboard() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1>IT WORKS!</h1>
      <p>If you see this, React is working perfectly.</p>
      <p>Time: {new Date().toLocaleString()}</p>
    </div>
  )
}

export default Dashboard
