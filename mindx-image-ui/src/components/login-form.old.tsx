// sử dụng controlled  Components 
//và Uncontrolled Components
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
import { useEffect, useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });

  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    // đoạn này nên dùng thư viện  Toast để thông báo eror  validate
    if (!formState.username && submited) {
      setErrors((prevError) => ({
        ...prevError,
        username: "Username is required",
      }));
    } else {
      setErrors((prevError) => ({
        ...prevError,
        username: "",
      }));
    }
  }, [formState.username, submited]);

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    //tạo biến và lấy value, name trong target
    const { value, name } = e.target;
    console.log(value, name);

    //bắt buộc phải dùng như này để có thể dữ được state cũ
    setFormState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmited(true);
    const { username, password } = formState;
    alert(`${username} ${password}`);

    try {
      const res = await request({
        method: "POST",
        url: "/auth/login",
        data: { username, password },
      });

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitForm}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="m@example.com"
                  onChange={handleChangeForm}
                  value={formState.username}
                  //tạo thêm atribute name để hàm handleChangeForm có thể lấy được
                  name="username"
                  required
                />
                {errors.username && (
                  <p style={{ color: "red" }}> {errors.username}</p>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={handleChangeForm}
                  name="password"
                  value={formState.password}
                  required
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  disabled={!formState.username || !formState.password}
                >
                  Login
                </Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
