import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { TbMoonStars, TbSunHigh } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const savedTheme = localStorage.getItem('theme');
    const [theme, setTheme] = useState(savedTheme || 'light');

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }, []);

    useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <div className='flex flex-col items-center h-screen gap-3'>
            {/* Header Section: Buttons */}
            <div className='flex flex-col sm:flex-row items-center justify-center p-5 gap-5 sm:gap-10'>
                <Link to={"/login"}>
                <Button className="bg-popover border text-popover-foreground dark:hover:bg-[#171717] hover:bg-[#ffffff] w-20">
                    Login
                </Button>
                </Link>
                <Button
                    onClick={toggleTheme}
                    className="bg-popover border text-popover-foreground dark:hover:bg-[#171717] hover:bg-[#ffffff] w-14"
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? <TbSunHigh /> : <TbMoonStars />}
                </Button>
                <Link to={"/register"}>
                <Button className="bg-popover border text-popover-foreground dark:hover:bg-[#171717] hover:bg-[#ffffff] w-20">
                    Register
                </Button>
                </Link>
            </div>

            {/* Main Heading */}
            <div>
                <h1 className='font-bold text-xl sm:text-3xl lg:text-4xl'>Social App</h1>
            </div>

            {/* Carousel Section */}
            <div className='pb-5'>
                <Carousel className="w-full max-w-xs sm:max-w-lg lg:max-w-2xl">
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <span className="text-4xl font-semibold">{index + 1}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* Show carousel navigation only on larger screens */}
                    <CarouselPrevious className="hidden sm:flex" />
                    <CarouselNext className="hidden sm:flex" />
                </Carousel>
            </div>

            {/* Footer */}
            <div className='mt-20'>
                <p className='text-sm font-light sm:text-base'>2024 &copy; Satrio Prawiro Sumowerdoyo</p>
            </div>
        </div>
    );
};

export default LandingPage;
