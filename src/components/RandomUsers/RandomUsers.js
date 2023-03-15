import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../TableUsers/Table.css";
const RandomUsers = () => {
  let params = useParams();
  const [user, setUser] = useState('');

let getUser = async () => {
  let { data } = await axios.get(`https://randomuser.me/api/?results=${params.id}`);
  setUser(data.results[0]);
};

  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      <div>id: {params.id}</div>
      {user && (
        <div>
        <div class ="custom-alert">
          <div class="background">
            <div class='content'>
          <img class='img-alert'
                style={{ borderRadius: '50%', marginRight: '10px' }}
                src={user.picture.large}
                alt="User Avatar"
                  /><br/>
          <div class="name"
        >{user.name.first} {user.name.last}<br/></div>
          <div class="address">{user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}, ${user.location.country}</div>
          <br/><br/><div>ID name: {user.id.name}</div>
          <br/><br/><div>ID value: {user.id.value}</div>
          </div>
          </div>
          
        </div>
        </div>
      )}
    </>
  );
};

export default RandomUsers;
