"use client";

import { motion } from "framer-motion";

import LoginHeader from "./components/login-header";
import LoginFooter from "./components/login-footer";
import LoginForm from "./components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="w-full max-w-md space-y-8"
      >
        <LoginHeader />

        <LoginForm />

        <LoginFooter />
      </motion.div>
    </main>
  );
}