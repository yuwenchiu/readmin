import readingImg from "@/assets/reading-on-chair.webp";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import InputWithLabelError from "@/components/InputWithLabelError";
import { supabase } from "@/lib/supabaseClient";
import { Spinner } from "@/components/ui/spinner";
import { FieldGroup } from "@/components/ui/field";
import { isAuthError } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const LoginSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === "" ? "Required" : iss.message),
  }),
  password: z.string().nonempty("Required"),
});

type LoginInfo = z.infer<typeof LoginSchema>;

function Login() {
  const navigate = useNavigate();

  const form = useForm<LoginInfo>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
    reset,
    setError,
  } = { ...form };

  const onSubmit = async ({ email, password }: LoginInfo) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("root", error);

      if (isAuthError(error) && error.code === "invalid_credentials") {
        toast.error("Wrong email or password ⚡️", {
          description: "Please try again",
        });
      } else {
        toast.error("Oops! Something went wrong", {
          description: "Please try again later",
        });
      }
    } else {
      toast.success(`Hi, ${data.user.user_metadata.username}!`, {
        description: "Nice to see you again 👐🏻",
      });
      reset();
      navigate("/dashboard");
    }
  };

  return (
    <div className="mt-8 grid h-[calc(100vh-64px)] w-full place-items-center px-16 pt-8 pb-16">
      <section className="flex h-full w-full items-center justify-evenly rounded-4xl bg-white p-8">
        <div className="w-full max-w-96">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <InputWithLabelError
                name="email"
                label="Email"
                control={control}
                autoComplete="email"
              />

              <InputWithLabelError
                name="password"
                label="Password"
                control={control}
                type="password"
              />

              <Button
                size="xl"
                className="my-10 rounded-full"
                disabled={isSubmitting || isSubmitSuccessful}
              >
                {isSubmitting ? <Spinner /> : "Log in"}
              </Button>
            </FieldGroup>
          </form>

          <div className="flex items-center gap-x-5">
            <Separator className="flex-1 border-1" />
            <span className="text-base font-light tracking-wide">
              New to here?
            </span>
            <Separator className="flex-1 border-1" />
          </div>

          <Link to="/register">
            <Button
              variant="outline"
              size="xl"
              className="my-10 w-full rounded-full"
            >
              Create an account
            </Button>
          </Link>
        </div>

        <div className="flex h-full flex-col items-center justify-center gap-y-10">
          <div className="font-mono text-4xl tracking-widest">
            Welcome Back!
          </div>
          <img src={readingImg} alt="reading" className="max-w-[380px]" />
        </div>
      </section>
    </div>
  );
}

export default Login;
