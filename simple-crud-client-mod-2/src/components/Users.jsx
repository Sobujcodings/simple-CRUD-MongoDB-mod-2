import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';


// *** NOTES
// post/create r kaj ta app.jsx e korci
// read/get r kaj ta server api diye main.jsx e loader diye korchi user.jsx e
// delete r kaj ta users r form diye data niye deleteHandler r vhitore korchi
// update tao user.jsx e update btn r link e dynamic link boshiye id onujayi link e jabe onno component/update e
// server e jehetu users nam diye table/collection khulchi tai shob kaj ai link diyei korte hobe /user/.. porer part dynamic hole hote pare but users thakbei
 

const Users = () => {

    const usersFromDatabase = useLoaderData();

    // initially ai state r value hobe database r get kora user gula
    const [users,setUsers] = useState(usersFromDatabase)



    // delete handler
    const handleDeleteUser = (id) => {
        console.log('Delete-User',id)

    // jetay click korbo shei id diye fetch hobe dynamically server eo dynamic bhabe id nite hobe params diye
    // atao delele otai delte sheta dekhe match korbe then oikhane jabe
    fetch( `http://localhost:5000/users/${id}`,{
        method: "DELETE",
    })
    // for recieve
    .then(res => res.json())
    .then(data => {
        console.log(data)
        // result diye jeta padhlam shetai ai data it contains acknowledge true and DeletedCount 1 to ensure the deletion
        if(data.deletedCount>0){
            alert('deleted successfully')
            // delete hole ai conditon fill hole ai id bad e bakigula k dekhabo client r UI te

            // delete holei bakigula dekhabe tai ai condition r vhitore korchi
            // * jgula na milbe shegula nibo,akta data delete korar por shei data bad diye bakigula k filter kore remain e rekhe user e set kore dekhabo
            const remaining = users.filter(user=>user._id !== id);
            setUsers(remaining);
            // taholei delete korchi sheta bad diye bakigula notun kore state e set hoye jabe and bakigula dekha jabe
        }
    })
    }



    return (
        <div>
            <h3>USERS LIST FROM DATABASE</h3>
            <p>Total Users: {users.length}</p>
            <Link to='/'>Back Home</Link>

            <div>
                {
                    users.map(singleUser => <>
                        <p key={singleUser._id}>{singleUser.email} : {singleUser.password} {singleUser._id}
                            <button><Link to={`/update/${singleUser._id}`}>Update</Link></button>
                            <button onClick={()=>handleDeleteUser(singleUser._id)}><Link>X</Link></button>

                            {/*  ai update r last r dynamic id part ta k abar main.jsx e id params diye recieve 
                            korbo 1st part mane /update/.. peley/thik thaklei connect hote parbe 2ta shekhane chole jabe id*/}
    
                        </p>
                    </>)
                }
            </div>

        </div>
    );
};

export default Users;