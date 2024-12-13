"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function EmailFormSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/pre-register/save/email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setEmail("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to subscribe, please try again later");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <p className="mb-6 text-center text-3xl font-bold max-w-4xl mx-auto">
        Be the first to know when our website goes live and fully functional!
        Leave your email, and we'll send you an exclusive notification as soon
        as everything is up and running!
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-4 py-2 rounded text-black selection:bg-"
          required
        />
        <button
          type="submit"
          className="bg-white text-[#ff5470] px-4 py-3 rounded text-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
            transform="rotate(90)"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>
      <p className="mt-4 text-center text-3xl font-bold max-w-md mx-auto">
        Thank You!
      </p>
    </section>
  );
}
