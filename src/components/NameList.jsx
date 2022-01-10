import { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import {collection, getDocs, addDoc, doc, updateDoc,deleteDoc} from "firebase/firestore"

function NameList() {
  const [newName, setNewName] = useState("")
  const [newAge, setNewAge] = useState("")
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")

  useEffect(() => {
    const getUsers = async () =>{
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map(doc=>({...doc.data(), id: doc.id})))
    }

    getUsers()
  }, [usersCollectionRef,newName, newAge])
  
  const createUser = async () =>{
    if(newName !== "" && newAge !== "")
      await addDoc(usersCollectionRef,{name: newName, age:Number(newAge)})
  } 

  const updateAge = async (id,age) =>{
      const userDoc = doc(db,'users', id)
      await updateDoc(userDoc, {age: age+1})
  }

  const deleteUser = async (id) =>{
      const userDoc = doc(db,'users', id)
      await deleteDoc(userDoc)
  }

  return (
    <div className="NameList">
        <h3>Name List from FireBase</h3>
        {users.length > 0 && users.map((user,index)=>( 
            <p key={index}>
              {user.name} | {user.age}  <button onClick={()=>updateAge(user.id,user.age)}>+</button>  <button onClick={()=>deleteUser(user.id)}>x</button>
            </p>
        ))}
        <form name="formname"  style={{marginTop:20}}>
          <input required placeholder='Name..' value={newName} onChange={(e) => setNewName(e.target.value)}></input>
          <input required type='number' placeholder='Age..' value={newAge} onChange={(e) => setNewAge(e.target.value)}></input>
          <button type="button" onClick={createUser}>Add</button>
        </form>
 
     </div>

  );
}

export default NameList;
