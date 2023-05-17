import { useEffect, useState } from 'react';
import './App.css'
import { Link } from 'react-router-dom';



// *** NOTES
// post/create r kaj ta app.jsx e korci
// read/get r kaj ta server api diye main.jsx e loader diye korchi user.jsx e
// delete r kaj ta users r form diye data niye deleteHandler r vhitore korchi
// update tao user.jsx e update btn r link e dynamic link boshiye id onujayi link e jabe onno component/update e
// server e jehetu users nam diye table/collection khulchi tai shob kaj ai link diyei korte hobe /user/.. porer part dynamic hole hote pare but users thakbei



function App() {
  const [users, setUsers] = useState();


  // form submit handler
  const handleAddUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const user = { email, password };
    // console.log(user);


    // ai link e form r user(name,password) ta padhabo
    // creating server api(api taken from server to send data to that link/api users)
    // jate ai URL hit kore and ai URL e amra form r data ta padhte pari server e then req.body diye recieve korbo
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers:
      {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
      // fetch r second object r moddhe kore ai api te data padhabo from client to server R .then diye recieve korbo
    })
      // ai same link user kore server theke jeta send korbo sheta akhne recive korbo .then r data te
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          alert('data inserted succefully')
          form.reset();
        }
      })
    // ekhane data te result ta pacchi which contains acknowledge true and insert id to confirm the insertion

  }



  return (
    <>
      <h1>Simple CRUD </h1>

      <button>
        <Link to='/users'>See this Users stored in database</Link>
      </button>

      <h3>Insert email,password to insert it to mongoDB via express.js server</h3>

      {
        // <h3>{users.length}</h3>
      }

      <div>
        <form onSubmit={handleAddUser}>
          <input type="email" placeholder='email' name="email" />
          <br />
          <input type="password" placeholder='password' name="password" />
          <br />
          <input type="submit" name='submit' value="Add User" />
        </form>
      </div>

    </>
  )
}

export default App
