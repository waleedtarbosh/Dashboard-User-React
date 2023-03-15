import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from "./MaterialTableIcons";
import { useState, useEffect } from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import "./Table.css";


//use for Get page of users , Get 2nd Page of users
const apiUrl1 = 'https://randomuser.me/api?results=8';
const apiUrl2 = 'https://randomuser.me/api?results=8&page=2';


function Table() {
  const [users, setUsers] = React.useState([]);
  const [nationality, setNationality] = useState('Nationality');
  const [gender, setGender] = useState('Gender');

  useEffect(() => {
    const url1 = `${apiUrl1}${
      nationality === 'Nationality' ? '' : '&nat=' + nationality
    }${gender === 'Gender' ? '' : '&gender=' + gender}`;

    const url2 = `${apiUrl2}${
      nationality === 'Nationality' ? '' : '&nat=' + nationality
    }${gender === 'Gender' ? '' : '&gender=' + gender}`;


    Promise.all([
      fetch(url1),
      fetch(url2),
    ])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      const firstUsersData = data[0].results.slice(0, 8).map(user => ({
        name: `${user.name.first} ${user.name.last} `,
        address: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}, ${user.location.country}`,
        email: user.email,
        phone: user.phone,
        country: user.location.country,
        postCode: user.location.postcode,
        registrationDate: new Date(user.registered.date),
        registrationTime: new Date(user.registered.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }),
        imageUrl: user.picture.large,
        
      }));

      const secondUsersData = data[1].results.slice(0, 8).map(user => ({
        name: `${user.name.first} ${user.name.last}`,
        address: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}, ${user.location.country}`,
        email: user.email,
        phone: user.phone,
        country: user.location.country,
        postCode: user.location.postcode,
        registrationDate: new Date(user.registered.date),
        registrationTime: new Date(user.registered.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }),
        imageUrl: user.picture.large,
      
      }));
    

      setUsers([...firstUsersData, ...secondUsersData]);
    
    })
    .catch(error => console.error(error));
  }, [nationality,gender]);



//User details page

  let currentAlert;

  const handleRowClick = (event, rowData) => {
    const alertElement = document.createElement('div');
    alertElement.className = 'custom-alert';
  
    // Create background div and add it as the first child of alertElement
    const backgroundElement = document.createElement('div');
    backgroundElement.className = 'background';
    alertElement.appendChild(backgroundElement);
  
    const closeButton = document.createElement('div');
    closeButton.className = 'close-button';
    closeButton.innerText = 'x';
    closeButton.addEventListener('click', () => {
      alertElement.remove();
    });
    alertElement.appendChild(closeButton);
  
    const imgElement = document.createElement('img');
    imgElement.className = 'img-alert';
    imgElement.src = rowData.imageUrl;
    imgElement.alt = 'User Avatar';
    imgElement.style.width = '132px';
    imgElement.style.borderRadius='50%';
  
    const nameElement = document.createElement('div');
    nameElement.className = 'name';
    nameElement.innerText = rowData.name;
  
    const addressElement = document.createElement('div');
    addressElement.className = 'address';
    addressElement.innerText = rowData.address;
  
    const buttonElement = document.createElement('button');
    buttonElement.className = 'details-button';
    buttonElement.innerText = 'Details';
    buttonElement.addEventListener('click', () => {
      // Open details page in a new tab
      window.open(`/users/${rowData.tableData.id}`)
        });
    
    // Create a container div for the nameElement, addressElement, and buttonElement
    const userInfoElement = document.createElement('div');
    userInfoElement.className = 'user-info';
    userInfoElement.appendChild(nameElement);
    userInfoElement.appendChild(addressElement);
    userInfoElement.appendChild(buttonElement); // Append button element
  
    // Create a container div for the imgElement and userInfoElement
    const contentElement = document.createElement('div');
    contentElement.className = 'content';
    contentElement.appendChild(imgElement);
    contentElement.appendChild(userInfoElement);
  
    // Add the contentElement to alertElement
    alertElement.appendChild(contentElement);
  
    // Close the current alert before opening a new one
    if (currentAlert) {
      currentAlert.remove();
    }
    currentAlert = alertElement;
  
    document.body.appendChild(alertElement);
  };

  
  //Table material ui Components.
  return (
    <div style={{ width: '100%',
    maxWidth: '100%',
    overflowX: 'auto'
    }}>
    <MaterialTable  className="table-container"
      title="All Users"
      icons={tableIcons}
      columns={[
        {
          title: 'User',
          field: 'name',
          filtering: false,
          width: '30%',
          cellClassName: 'small-cell',
          cellStyle: {
            fontSize: '12px',
          },
          render: rowData => (
         
         <div style={{ display: 'flex', alignItems: 'center',}}>
        <img
        style={{ borderRadius: '50%', marginRight: '10px' }}
        src={rowData.imageUrl}
        alt="User Avatar"
        width={50}
        height={50}
          />
              <div style={{ marginLeft: 10 }}>
                <div style={{ fontWeight: 'bold' }}>{rowData.name}</div>
                <div style={{ color: '#C5C7CD' }}>{rowData.address}</div>
              </div>
            </div>
          
          ),
        },
        {
          title: 'Contact Information',
          field: 'email',
          filtering: false,
          width: '30%',
          cellStyle: {
            fontSize: '12px',
          },
          render: rowData => (
            <div >
              <div style={{ fontWeight: 'bold' }}> {rowData.email }</div>
              
              <div style={{ color: '#C5C7CD' }}>{rowData.phone}</div>
            </div>
          ),
        },
        {
          title: 'Registration Date',
          field: 'registrationDate',
          type: 'date',
          filtering: false,
          width: '30%',
          cellStyle: {
            fontSize: '12px',
          },
          render: rowData => (
            <>
            <div style={{ fontWeight: 'bold' }}>{rowData.registrationDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}<br /></div>
              
              <span style={{ color: '#C5C7CD' }}>{rowData.registrationTime}</span>
            </>
          ),
        },
        {
          title: 'Country/PostCode',
          field: 'country',
          filtering: true,
          width: '30%',
          cellStyle: {
            fontSize: '12px',
          },
          filterPlaceholder: "Nationality",
          render: rowData => (
            <div>
              <div style={{ fontWeight: 'bold' }}> {rowData.country}</div>
              <div style={{ color: '#C5C7CD' }}>{rowData.postCode}</div>
            </div>
          ),
        },
      ]}
      data={users}
      options={{

        paging: true,
        search: false,
        pageSize: 8,
        showFirstLastPageButtons: false,
        paginationType: "stepped",  paginationPosition: "bottom",
        filtering: false,
        customFilterAndSearch:true,
        pageSizeOptions: [8,5,10,15,20],
  
      }}

      //Filter by Nationality and Gender

      actions={[
       
        {
          icon: () => (
            <TextField  className="custom-text-field"
              labelId="gender-select-label"
              id="gender-select"
              style={{ width: 100, border:'1px solid #DFE0EB' ,borderRadius: '3px;',paddingLeft:'20px',}}
              value={gender}
              onChange={(e) => setGender(e.target.value.toLowerCase())}
            >
              
              <MenuItem value={'Gender'}>
              <em>All</em>
              </MenuItem>
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
            </TextField>
            
          ),
          tooltip: 'Filter Gender',
          isFreeAction: true,
        },
        
        {
          icon: () => (
            <TextField  className="custom-text-field"
              labelId="nationality-select-label"
              id="nationality-select"
              style={{ width: 100,border:'1px solid #DFE0EB' ,borderRadius: '3px;' ,paddingLeft:'20px'}}
              value={nationality}
              onChange={(e) => setNationality(e.target.value.toLowerCase())}
            >
              <MenuItem value={'Nationality'}>
                <em>All</em>
              </MenuItem>
              <MenuItem value={'us'}>US</MenuItem>
              <MenuItem value={'gb'}>UK</MenuItem>
              <MenuItem value={'ca'}>Canada</MenuItem>
              <MenuItem value={'fr'}>France</MenuItem>
            </TextField>
          ),
          tooltip: 'Filter Nationality',
          isFreeAction: true,
        },
      ]}
      onRowClick={handleRowClick}

    />
    </div>
  );
}

export default Table;
