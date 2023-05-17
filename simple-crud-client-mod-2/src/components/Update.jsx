import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Update = () => {

    const OldData = useLoaderData();

    const handleUpdate =(event)=>{
        // not to load the entire page
        event.preventDefault();
        // console.log('clicked')
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email,password);
        const UpdateUser = {email,password};
        // akta object e moddhe email password value soho pabo
        // console.log(UpdateUser);


        //1. 1st kaaj korchce database theke dynamic id use kore shei singledata ta ana then shei data k abar
        // update kore shei updated data put method diye ekkhane padhabo

        // jetar vhitore id dibo shetar body tei updated kora data padhano ak link ei 2 kaj
        fetch(`http://localhost:5000/users/${OldData._id}`,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(UpdateUser)
        })
        // jeta res akare pabo update howar por
        .then(res=>res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount>0){
                alert('user updated')
            }
            // 0 theke boro hole mane update hoice and sheta alert kore bujhabo
        })
    }


    return (
        <div>
            <h3>{OldData.email}</h3>

            <div>
                <form onSubmit={handleUpdate}>
                    <input type="text" name='email' defaultValue={OldData.email} /><br />
                    <input type="text" name='password' defaultValue={OldData.password} /><br />
                    <input type="submit" value="Update User" />
                </form>
            </div>
        </div>
    );
};

export default Update;