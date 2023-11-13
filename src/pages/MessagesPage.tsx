// MessagesPage.tsx
import React, { useEffect } from 'react';
import axios from 'axios';
import Message from '../components/Message';

const MessagesPage = () => {
  useEffect(() => {

    const users = [
        { firstName: 'Emil', lastName: 'Wennström', id: 39, privilege: 'DOCTOR' }
    ]

    const fetchData = async () => {
        const response = await axios.get('http://localhost:8080/messages/getAllDoctors');
        if (response.status === 200) {
          console.log(response.data);
          
        }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once (equivalent to componentDidMount)

  return (
    <div>
      <Message message='test' />
    </div>
  );
};

export default MessagesPage;
