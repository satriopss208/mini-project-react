import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TbSunHigh, TbMoonStars } from "react-icons/tb";

const SideBar = (props) => {
    const { onHandlePage, currentPage, totalPage, userList, theme, toggleTheme, getId, id } = props;
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`
      fixed left-0 top-0 h-full 
      ${isCollapsed ? 'w-20' : 'w-56'}
      bg-popover
      border-r
      rounded-r-lg
      transition-all duration-300 ease-in-out
      shadow-lg z-30
    `}>
            <div className='flex items-center justify-between px-4 my-2'>
                {!isCollapsed && <h1 className='font-bold pl-1'>USER LIST</h1>}
                <Button
                    onClick={toggleSidebar}
                    className="bg-popover 
                               text-popover-foreground 
                               dark:hover:bg-[#171717] 
                               hover:bg-[#ffffff] 
                               transition-all 
                               duration-300 ease-in-out
                               hidden
                               md:flex"
                >
                    {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
                </Button>
            </div>

            <div className={`flex items-center justify-center space-y-2 px-4 mb-4 pb-2 border-b`}>
                <Button
                    onClick={toggleTheme}
                    className={` bg-popover border text-popover-foreground dark:hover:bg-[#171717] hover:bg-[#ffffff] ${isCollapsed ? 'w-14' : 'w-48'}`}
                >
                    {(theme == 'light') && <TbSunHigh />}
                    {(theme == 'dark') && <TbMoonStars />}
                </Button>
            </div>

            <div className="space-y-2">
                <ul>
                    {userList.map((user, index) => (
                        <li key={user.id} onClick={() => getId(user.id)} className="cursor-pointer ">
                            <div
                                key={index}
                                className={`
                                            flex items-center 
                                            ${isCollapsed ? 'justify-center' : 'px-4'}
                                            py-[10px]
                                            ${user.id == id && (theme == 'dark' ? 'bg-white/40' : 'bg-black/40')} 
                                            cursor-pointer  
                                            hover:bg-background
                                          `}
                            >
                                <Avatar>
                                    <AvatarImage src={user.avatar} alt="gambar user" />
                                    <AvatarFallback>{user.first_name[0]}{user.last_name[0]}</AvatarFallback>
                                </Avatar>
                                {!isCollapsed && (
                                    <span className="ml-3 text-sm font-medium">
                                        {user.first_name} {user.last_name}
                                    </span>
                                )}
                            </div>
                        </li>
                    ))}
                    {!isCollapsed &&
                        <div className="flex items-center justify-between gap-4 px-4">
                            <Button
                                onClick={() => onHandlePage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-2 rounded-md disabled:opacity-50"
                            >
                                <FaChevronLeft />
                            </Button>
                            <p>{currentPage} of {totalPage}</p>
                            <Button
                                onClick={() => onHandlePage(currentPage + 1)}
                                disabled={currentPage === totalPage}
                                className="px-3 py-2  rounded-md disabled:opacity-50"
                            >
                                <FaChevronRight />
                            </Button>
                        </div>
                    }
                    {isCollapsed &&
                        <div className="flex items-center justify-center py-[10px] px-4">
                            {currentPage == totalPage ?
                                <Button
                                    onClick={() => onHandlePage(currentPage - 1)}
                                    className="px-3 py-2 rounded-md "
                                >
                                    <FaChevronLeft />
                                </Button>
                                :
                                <Button
                                    onClick={() => onHandlePage(currentPage + 1)}
                                    className="px-3 py-2 rounded-md "
                                >
                                    <FaChevronRight />
                                </Button>
                            }
                        </div>
                    }
                </ul>
            </div>
        </div>
    );
};

export default SideBar;