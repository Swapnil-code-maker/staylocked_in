"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

import { AxiosError } from "axios";
import { toast } from "sonner";

import { useRegister } from "../user.hooks";
import {
  registerSchema,
  RegisterFormData,
} from "../register.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const registerMutation = useRegister();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      fullName: "",
      email: "",
      dateOfBirth: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterFormData) {
    try {
      await registerMutation.mutateAsync(values);

      toast.success(
        "Account created successfully. Please login."
      );

      router.replace("/login");
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 409) {
        toast.error("Email already exists.");
        return;
      }

      toast.error("Registration failed.");
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl">
          Create Account
        </CardTitle>

        <CardDescription>
          Create your StayLockedIn account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Full Name
            </label>

            <Input
              placeholder="Full Name"
              {...form.register("fullName")}
            />

            <p className="text-sm text-destructive">
              {form.formState.errors.fullName?.message}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Email
            </label>

            <Input
              type="email"
              placeholder="you@example.com"
              {...form.register("email")}
            />

            <p className="text-sm text-destructive">
              {form.formState.errors.email?.message}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Date of Birth
            </label>

            <Input
              type="date"
              {...form.register("dateOfBirth")}
            />

            <p className="text-sm text-destructive">
              {form.formState.errors.dateOfBirth?.message}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 characters"
                className="pr-10"
                {...form.register("password")}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            <p className="text-sm text-destructive">
              {form.formState.errors.password?.message}
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign In
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}