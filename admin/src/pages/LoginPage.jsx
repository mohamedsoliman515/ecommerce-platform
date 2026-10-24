

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import {
  ArrowRight,
  LogIn,
  ShieldCheck,
  ShoppingBag,
  UserPlus,
  Sparkles,
} from "lucide-react";

const LoginPage = () => {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-base-200 px-4 py-12">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 -top-24 -z-10 size-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 -z-10 size-80 rounded-full bg-secondary/15 blur-3xl" />

      <section className="card w-full max-w-md border border-base-300/70 bg-base-100 shadow-2xl">
        <div className="card-body gap-6 p-7 sm:p-10">

          {/* Logo and heading */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-lg shadow-primary/20">
              <ShoppingBag className="size-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight">
                Welcome back
              </h1>

              <p className="text-sm leading-6 text-base-content/60">
                Sign in to your account or create a new one
                to manage your store.
              </p>
            </div>
          </div>

          {/* Signed-out actions */}
          <Show when="signed-out">
            <div className="flex flex-col gap-3">

              <SignInButton>
                <button
                  type="button"
                  className="btn btn-primary btn-lg w-full justify-between gap-3 shadow-md shadow-primary/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="flex items-center gap-3">
                    <LogIn className="size-5" />
                    Sign in to your account
                  </span>

                  <ArrowRight className="size-5" />
                </button>
              </SignInButton>

              <SignUpButton>
                <button
                  type="button"
                  className="btn btn-outline btn-lg w-full gap-3 transition duration-200 hover:-translate-y-0.5"
                >
                  <UserPlus className="size-5" />
                  Create new account
                </button>
              </SignUpButton>

            </div>

            <div className="divider my-0 text-xs text-base-content/40">
              SECURE ACCESS
            </div>

            <div className="flex items-center justify-center gap-2 text-center text-xs text-base-content/60">
              <ShieldCheck className="size-4 text-success" />
              <span>Secure authentication powered by Clerk</span>
            </div>
          </Show>

          {/* Signed-in state */}
          <Show when="signed-in">
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-base-200 p-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-success/10 text-success">
                <Sparkles className="size-6" />
              </div>

              <h2 className="text-lg font-bold">
                You're signed in!
              </h2>

              <p className="text-sm text-base-content/60">
                Your account is ready to use.
              </p>

              <UserButton />
            </div>
          </Show>

          <p className="text-center text-xs text-base-content/50">
            By continuing, you agree to our Terms of Service
            and Privacy Policy.
          </p>

        </div>
      </section>
    </main>
  );
};

export default LoginPage;
