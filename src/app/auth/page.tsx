import { CarFront, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createAccount, signInAccount } from "@/lib/customer-account";

type AuthMode = "login" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const isSignup = mode === "signup";

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setSubmitted(false);
    setMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();

    if (isSignup) {
      createAccount({ name: String(form.get("name") || "").trim(), email });
      setMessage("Your account is ready. Taking you to My Garage…");
    } else if (!signInAccount(email)) {
      setSubmitted(false);
      setMessage("We could not find an account with that email. Please sign up first.");
      return;
    } else {
      setMessage("Welcome back. Taking you to My Garage…");
    }

    setSubmitted(true);
    window.setTimeout(() => navigate("/customer/dashboard"), 550);
  }

  return (
    <main className="min-h-screen bg-brand-surface px-4 py-8 sm:px-6 lg:grid lg:grid-cols-2 lg:p-0">
      <section className="relative hidden overflow-hidden bg-brand-dark px-12 py-14 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1689E844,_transparent_42%),linear-gradient(135deg,#031B3D_0%,#062A5E_60%,#0757A6_100%)]" />
        <Link to="/" className="relative z-10 inline-flex w-fit items-center gap-3 text-xl font-bold tracking-wide text-white">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-brand-navy"><CarFront size={23} /></span>
          STBN AUTOS
        </Link>

        <div className="relative z-10 max-w-lg">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#D9ECFA]">Find your next drive</p>
          <h1 className="font-heading text-5xl font-bold leading-tight text-white">A better way to keep track of the cars you love.</h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-[#D9ECFA]">Save your favourite vehicles, manage reservations, and stay connected with STBN AUTOS.</p>
        </div>

        <p className="relative z-10 text-sm text-[#D7DEE8]">Trusted vehicles. Transparent service.</p>
      </section>

      <section className="mx-auto flex w-full max-w-md items-center py-6 lg:py-12">
        <div className="w-full rounded-2xl border border-brand-border bg-white p-6 shadow-[0_18px_50px_rgba(3,27,61,0.10)] sm:p-9">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 font-bold text-brand-navy lg:hidden">
            <CarFront size={22} /> STBN AUTOS
          </Link>
          <div className="mb-7">
            <h2 className="font-heading text-3xl font-bold text-brand-dark">{isSignup ? "Create an account" : "Welcome back"}</h2>
            <p className="mt-2 text-sm text-brand-text">{isSignup ? "Join STBN AUTOS to save and manage your vehicle choices." : "Sign in to access your saved vehicles and reservations."}</p>
          </div>

          <div className="mb-7 grid grid-cols-2 rounded-lg bg-brand-surface p-1" aria-label="Account form selector">
            <button type="button" onClick={() => changeMode("login")} className={`rounded-md px-3 py-2 text-sm font-semibold transition ${!isSignup ? "bg-white text-brand-navy shadow-sm" : "text-brand-text hover:text-brand-navy"}`}>Sign in</button>
            <button type="button" onClick={() => changeMode("signup")} className={`rounded-md px-3 py-2 text-sm font-semibold transition ${isSignup ? "bg-white text-brand-navy shadow-sm" : "text-brand-text hover:text-brand-navy"}`}>Sign up</button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignup && <label className="block"><span className="mb-1.5 block text-sm font-semibold text-brand-dark">Full name</span><span className="relative block"><UserRound className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-text" size={18} /><input required name="name" autoComplete="name" placeholder="Your full name" className="h-11 w-full rounded-lg border border-brand-border pl-10 pr-3 text-sm text-brand-dark outline-none transition placeholder:text-brand-text/80 focus:border-brand-blue focus:ring-3 focus:ring-[#1689E833]" /></span></label>}
            <label className="block"><span className="mb-1.5 block text-sm font-semibold text-brand-dark">Email address</span><span className="relative block"><Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-text" size={18} /><input required name="email" type="email" autoComplete="email" placeholder="you@example.com" className="h-11 w-full rounded-lg border border-brand-border pl-10 pr-3 text-sm text-brand-dark outline-none transition placeholder:text-brand-text/80 focus:border-brand-blue focus:ring-3 focus:ring-[#1689E833]" /></span></label>
            <label className="block"><span className="mb-1.5 block text-sm font-semibold text-brand-dark">Password</span><span className="relative block"><LockKeyhole className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-text" size={18} /><input required name="password" type={showPassword ? "text" : "password"} autoComplete={isSignup ? "new-password" : "current-password"} placeholder={isSignup ? "Create a password" : "Enter your password"} className="h-11 w-full rounded-lg border border-brand-border pl-10 pr-11 text-sm text-brand-dark outline-none transition placeholder:text-brand-text/80 focus:border-brand-blue focus:ring-3 focus:ring-[#1689E833]" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text hover:text-brand-navy" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>
            {!isSignup && <div className="text-right"><button type="button" className="text-sm font-semibold text-brand-blue hover:text-brand-accent">Forgot password?</button></div>}
            <button type="submit" className="mt-2 h-11 w-full rounded-lg bg-brand-blue text-sm font-bold text-white shadow-sm transition hover:bg-brand-accent focus:outline-none focus:ring-3 focus:ring-[#1689E866]">{isSignup ? "Create account" : "Sign in"}</button>
          </form>

          {message && <p role="status" className={`mt-4 rounded-lg px-3 py-2.5 text-sm ${submitted ? "bg-brand-sky text-brand-navy" : "bg-brand-surface text-brand-dark"}`}>{message}</p>}
          <p className="mt-7 text-center text-sm text-brand-text">{isSignup ? "Already have an account?" : "New to STBN AUTOS?"} <button type="button" className="font-semibold text-brand-blue hover:text-brand-accent" onClick={() => changeMode(isSignup ? "login" : "signup")}>{isSignup ? "Sign in" : "Create an account"}</button></p>
        </div>
      </section>
    </main>
  );
}
