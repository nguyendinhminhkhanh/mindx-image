//sử dụng useForm trong thư viện react-hook-form

//Optional chaining(?.)
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import request from "../api/request";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../components/ui/field";
import { Input } from "../components/ui/input";
// import { useEffect, useState } from "react";

interface LoginForm {
  username: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    const { username, password } = data;
    try {
      const res = await request({
        url: "/auth/login",
        method: "POST",
        data: { username, password },
      });
      toast.success("Log in successfully.");
      console.log(res);
      navigate("/postlist");
    } catch (error) {
      console.log(error);
      toast.error("Login information is incorrect!");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your user name below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">User name</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="m@example.com"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <p style={{ color: "red" }}>User name is required.</p>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="*****"
                  {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password?.type === "required" && (
                  <p style={{ color: "red" }}>Password is required.</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p style={{ color: "red" }}>
                    Password is at least 6 characters
                  </p>
                )}
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
