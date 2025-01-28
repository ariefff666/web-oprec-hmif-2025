"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { FirebaseError } from "firebase/app";

const FormSchema = z.object({
  email: z
    .string({ required_error: "Email tidak boleh kosong" })
    .email({ message: "Masukkan email yang valid" }),
  password: z.string(),
});

export default function BPHLogin() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
  }, []);

  const onSubmit = async (formValues: z.infer<typeof FormSchema>) => {
    const { email, password } = formValues;
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast({ description: "Page Dashboard sedang dalam maintenance", variant: "destructive" });
     // router.push("/dashboard");
      console.log(userCredentials);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast({ description: error?.code, variant: "destructive" });
      }
    }
  };

  return (
    <main className="relative z-20 flex flex-col items-center justify-center min-h-screen">
      <div className="w-[85%] px-3 py-10 rounded-lg lg:w-1/2 lg:px-6 form-pendaftaran-box">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-4"
          >
            <p className="mx-auto text-2xl font-medium text-center text-slate-100">
              LOGINNNNNNN
            </p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full mt-2 text-lg uppercase md:w-1/2 lg:w-1/4 button-submit disabled:opacity-50"
              disabled={form.formState.isSubmitting}
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
