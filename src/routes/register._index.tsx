import readingImg from "@/assets/reading-on-books.webp";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import InputWithLabelError from "@/components/InputWithLabelError";
import { supabase } from "@/lib/supabaseClient";
import { Spinner } from "@/components/ui/spinner";
import { FieldGroup } from "@/components/ui/field";
import { isAuthApiError } from "@supabase/supabase-js";
import { toast } from "sonner";

const UserSchema = z
  .object({
    username: z
      .string()
      .trim()
      .nonempty("Required")
      .max(15, "Must be 15 characters or fewer"),
    email: z.email({
      error: (iss) => (iss.input === "" ? "Required" : iss.message),
    }),
    password: z.string().nonempty("Required"),
    confirm: z.string().nonempty("Required"),
  })
  .refine((data) => data.password === data.confirm, {
    error: "Passwords do not match",
    path: ["confirm"],
    when(payload) {
      return UserSchema.pick({ password: true, confirm: true }).safeParse(
        payload.value,
      ).success;
    },
  });

type User = z.infer<typeof UserSchema>;

function Register() {
  const navigate = useNavigate();

  const form = useForm<User>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
    reset,
    setError,
  } = { ...form };

  const onSubmit = async ({ username, email, password }: User) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      setError("root", error);

      if (isAuthApiError(error)) {
        toast.error(error.message, {
          description: "Please try again",
        });
      } else {
        toast.error("Oops! Something went wrong", {
          description: "Please try again later",
        });
      }
    } else {
      toast.success(`Welcome, ${username}!`, {
        description: "Time to build your library 📚✨",
      });
      reset();
      navigate("/");
    }
  };

  return (
    <div className="mt-8 grid h-[calc(100vh-64px)] w-full place-items-center px-16 pt-8 pb-16">
      <section className="flex h-full w-full items-center justify-evenly rounded-4xl bg-white p-8">
        <div className="flex h-full flex-col items-center justify-center gap-y-5">
          <div className="space-y-2 text-center">
            <div className="font-mono text-4xl tracking-widest">Join Us!</div>
            <div className="text-sm">
              <span>Already have an account?</span>
              <Link to="/login">
                <Button size="sm" variant="link" className="text-sm">
                  Log in
                </Button>
              </Link>
            </div>
          </div>
          <img src={readingImg} alt="reading" className="max-w-[360px]" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-96">
          <FieldGroup>
            <InputWithLabelError
              name="username"
              label="Username"
              control={control}
              autoComplete="username"
            />

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

            <InputWithLabelError
              name="confirm"
              label="Confirm password"
              control={control}
              type="password"
            />

            <Button
              size="xl"
              className="my-10 rounded-full"
              disabled={isSubmitting || isSubmitSuccessful}
            >
              {isSubmitting ? <Spinner /> : "Create an account"}
            </Button>
          </FieldGroup>
        </form>
      </section>
    </div>
  );
}

export default Register;
