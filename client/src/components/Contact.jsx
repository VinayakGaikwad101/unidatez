import { useState } from "react";
import { toast } from "react-hot-toast";
import { Send, Loader2 } from "lucide-react";

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
    <section
      id="email-form"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[url('/contactBg.jpg')] bg-no-repeat bg-center bg-contain text-white"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Be the first to know when our website goes live and fully functional!
        </h2>
        <p className="text-xl md:text-2xl font-medium leading-relaxed">
          Leave your email, and we'll send you an exclusive notification as soon
          as everything is up and running!
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-grow px-6 py-3 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-300 flex items-center justify-center"
          >
            {isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <span className="mr-2">Subscribe</span>
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
      <div className="mt-12 text-center">
        <p className="text-3xl font-bold">Thank You!</p>
      </div>
    </section>
  );
}
