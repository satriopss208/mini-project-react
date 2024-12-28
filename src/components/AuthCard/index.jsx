import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginImage from '../../assets/loginImage.png';
import { Link } from "react-router-dom";
import { useState } from "react";

const AuthCard = ({ title, titleDescription, isLogin, handleForm }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-10">
      <Card className="overflow-hidden w-full max-w-5xl sm:w-[90%] md:w-[780px]">
        <CardContent className="grid p-0 md:grid-cols-2 gap-6 md:gap-0">
          <form className="p-6 md:p-4" onSubmit={(e) => { e.preventDefault(); handleForm(form); }}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-balance text-muted-foreground">{titleDescription}</p>
              </div>
              <div className="grid gap-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="w-full"
                />
              </div>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {isLogin && (
                    <a
                      href="#"
                      className="text-xs underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  )}
                </div>
                <Input
                  id="password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="Insert your password here..."
                  required
                  className="w-full"
                />
              </div>
              <Button className="w-full">
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
              <div className="mt-6">
                {isLogin ? (
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to={`/register`} className="underline underline-offset-4 hover:font-medium">
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to={`/login`} className="underline underline-offset-4 hover:font-medium">
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </form>

          {/* Image Section */}
          <div className="relative hidden md:flex">
            <img
              src={loginImage}
              alt="Login"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale object-right"
            />
          </div>
        </CardContent>
      </Card>

      {/* Footer Text */}
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking {isLogin ? `sign in` : `sign up`}, you agree to our <a className="cursor-pointer">Terms of Service</a> and <a className="cursor-pointer">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default AuthCard;
