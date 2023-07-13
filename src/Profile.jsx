
function Profile({user}) {
  return (
    <div>
      <h2>Name: {user.name}</h2>
      <h2>Age: {user.age}</h2>
    </div>
  );
}


export default Profile