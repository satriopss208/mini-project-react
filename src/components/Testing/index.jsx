import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Testing = () => {

    const [userList, setUserList] = useState([]);
    const [pagination, setPagination] = useState([
        {
          current_page: 1,
          per_page: null,
          total: null,
          total_pages: null,
        }
      ]);

    const getUserList = async (page) => {
        try {
            const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
            console.log("res: ", res);
            setUserList(res.data.data);
            setPagination(
                {
                    current_page: res.data.page,
                    per_page: res.data.per_page,
                    total: res.data.total,
                    total_pages: res.data.total_pages,
                  }
            );

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserList(pagination.current_page);
    },[pagination.current_page]);

    return (
        <div>
            <ul>
                {userList.map((user,index) => (
                    <li key={index}>
                        <div className='flex flex-col items-center justify-center mx-20'>
                            <img src={user.avatar} alt="avatar user" />
                            <p>{user.id}</p>
                            <p>{user.first_name}</p>
                            <p>{user.last_name}</p>
                            <p>{user.email}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Testing