import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router";
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

interface SignupForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>();

  const onSubmit = async (data: SignupForm) => {
    const { username, password } = data;

    try {
      const res = await request({
        url: "/auth/signup",
        method: "POST",
        data: { username, password },
      });
      console.log(res);
      toast.success("Đăng kí thành công.");
      navigator("/postlist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">User name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Khanh Dinh"
                {...register("username")}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                required
              />
              {errors.email && (
                <p style={{ color: "red" }}>Email is required.</p>
              )}
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="******"
                required
                {...register("password", { minLength: 6 })}
              />
              {errors.password?.type === "minLength" && (
                <p style={{ color: "red" }}>
                  Password is at least 6 characters
                </p>
              )}
              <FieldDescription>
                Must be at least 6 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                placeholder="******"
                required
                {...register("confirmPassword", { minLength: 6 })}
              />
              {errors.confirmPassword?.type === "minLength" && (
                <p style={{ color: "red" }}>
                  Confirm password is at least 6 characters
                </p>
              )}
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
