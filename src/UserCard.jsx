export const UserCard = ({ savedValues, setFormVisible }) => {
  return (
    <div className="user-card">
      <h1>{savedValues.fullName}</h1>
      <p className="email">{savedValues.email}</p>
      <p>Room type: {savedValues.roomType}</p>
      <p>Room view: {savedValues.roomView}</p>
      <button onClick={() => setFormVisible(true)}>Edit</button>
    </div>
  )
}
