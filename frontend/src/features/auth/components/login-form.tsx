"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "../auth-context";
import { useLogin } from "../auth.hooks";
import {
  loginSchema,
  LoginFormData,
} from "../login.schema";
import { getApiErrorMessage } from "@/lib/api-error";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const router = useRouter();

  const { login } = useAuth();

  const loginMutation = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormData) {
    try {
      const response =
        await loginMutation.mutateAsync(values);

      login(response);

      toast.success("Welcome back!");

      router.replace("/dashboard");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Invalid email or password."));
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl">
          Welcome Back
        </CardTitle>

        <CardDescription>
          Sign in to StayLockedIn
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Email
            </label>

            <Input
              placeholder="you@example.com"
              {...form.register("email")}
            />

            <p className="text-sm text-destructive">
              {form.formState.errors.email?.message}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Password
            </label>

            <Input
              type="password"
              placeholder="••••••••"
              {...form.register("password")}
            />

            <p className="text-sm text-destructive">
              {form.formState.errors.password?.message}
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}