import axios from "axios";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SideBar from '../../components/SideBar'
import { Link } from "react-router-dom";

const HomePage = () => {

  const savedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(savedTheme || 'light');
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState([]);
  const [id, setId] = useState('');
  const [pagination, setPagination] = useState([
    {
      current_page: 1,
      per_page: null,
      total: null,
      total_pages: null,
    }
  ]);

  const randomQuotes = [
    "Growth isn’t just about moving forward; sometimes it’s about learning to move in the right direction.",
    "The quiet moments are often the ones where our minds find the loudest answers.",
    "True strength is not in how hard you can hit, but in how gracefully you rise after every fall.",
    "Dreams are like stars—sometimes you can’t touch them, but they light your path when the night feels darkest.",
    "To find peace, you must first be willing to make peace within yourself.",
    "The greatest battles we face are often the ones no one else sees.",
    "Don’t wait for the world to change—start by changing the way you see it.",
    "The beauty of life lies in its unpredictability; embrace the surprises along the way.",
    "Wisdom isn’t knowing all the answers, but asking the right questions.",
    "The past is a lesson; the present, a gift; the future, an invitation.",
    "In the stillness of your heart, you’ll often find the clarity that eludes your mind.",
    "The journey isn’t always about reaching the destination; sometimes it’s about discovering who you become along the way.",
  ]

  const getUserList = async (page) => {
    try {
      const res = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${pagination.per_page}`);
      console.log("res: ", res);
      setUserList(res.data.data);
      setPagination(
        {
          current_page: res.data.page,
          per_page: res.data.per_page,
          total: res.data.total,
          total_pages: res.data.total_pages,
        }
      )
    } catch (error) {
      console.log("err: ", error);
    }
  };

  const getSingleUser = async (id) => {
    try {
      const res = await axios.get(`https://reqres.in/api/users/${id}`);
      console.log("res: ", res);
      setUser(res.data.data);
    } catch (error) {
      console.log("err: ", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.total_pages) {
      setPagination((prevState) => ({ ...prevState, current_page: newPage }));
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const getId = (id) => {
    setId(id);
  }

  const handleLogout = () => {
    localStorage.clear();
  }
  
  useEffect(() => {

    getUserList(pagination.current_page);
    getSingleUser(id);
   

    // untuk toggle light & dark mode
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);

  },[pagination.current_page, theme, id]);

  return (
    <div className="flex flex-col items-center justify-center md:h-screen z-0 ml-5">
      <SideBar toggleTheme={toggleTheme}
        theme={theme}
        onHandlePage={handlePageChange}
        currentPage={pagination.current_page}
        totalPage={pagination.total_pages}
        userList={userList}
        getId={getId}
        id={id}
      />
      <div className={`absolute top-3 right-5`}>
      <Link to={"/login"} onClick={handleLogout}>
                <Button className="bg-popover border text-popover-foreground dark:hover:bg-[#171717] hover:bg-[#ffffff] w-20">
                    logout
                </Button>
                </Link>
      </div>
        {!id &&
          <div className="flex items-center justify-center w-full h-screen">
            <h1 className="text-3xl font-semibold">SELECT USER!</h1>
          </div>
        }
        {id &&
        <div className="relative flex flex-col items-center justify-center m-20 p-4 shadow-lg border rounded-lg gap-3">
          <div className="absolute top-2 left-5">
            <p className="text-[8pt] font-semibold">{(user.id < 10 ? 'User ID: UID00'+user.id : 'User ID: UID0'+user.id)}</p>
          </div>
          <div className="mt-3 pt-3">
          <Avatar className="w-32 h-32 font-medium border-[8px] border-double">
            <AvatarImage src={user.avatar} alt="gambar user" />
            <AvatarFallback className="text-[30px]">{`${user.first_name}`}</AvatarFallback>
          </Avatar>
          </div>
          <div className="flex flex-col justify-center pt-2 gap-1">
            <div className="flex flex-col items-center">
              <p className="font-semibold">{`${user.first_name} ${user.last_name}`}</p>
              <p className="text-sm">{`${user.email}`}</p>
            </div>
            <div className="mt-5 px-2">
              <p className="text-sm">quotes: </p>
            </div>
            <div className="flex items-start justify-center w-[300px] h-[110px] gap-1 py-2 px-3 text-justify border bg-background/40 rounded-lg">
              <p className="text-sm italic">{`"${randomQuotes[id - 1]}"`}</p>
            </div>
          </div>
        </div>}
        
    </div>
  )
}

export default HomePage