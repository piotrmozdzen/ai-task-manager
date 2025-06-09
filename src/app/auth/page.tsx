"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import styles from "./AuthForm.module.css";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.message);
    } else {
      alert(isLogin ? "Zalogowano!" : "Utworzono konto!");
      router.push("/dashboard");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>{isLogin ? "LOGIN" : "SIGN UP"}</h2>
        <p className={styles.subtitle}>Please enter your login and password!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
          <div>
            <a href="#" className={styles.forgot}>
              Forgot password?
            </a>
          </div>
          <button type="submit" className={styles.button}>
            {isLogin ? "LOGIN" : "SIGN UP"}
          </button>
        </form>
        <div className={styles.socials}>
          <button className={styles.socialBtn}>F</button>
          <button className={styles.socialBtn}>T</button>
          <button className={styles.socialBtn}>G</button>
        </div>
        <p className={styles.switch}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            className={styles.switchBtn}
            onClick={() => setIsLogin((v) => !v)}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
}
