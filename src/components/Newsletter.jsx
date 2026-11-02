import React, { useState } from "react";
import { motion } from "motion/react";

import { animationTop } from "../constants";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      setMessageType("error");
      return;
    }

    if (!consent) {
      setMessage("Please agree to receive newsletter emails.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            consent,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong. Please try again."
        );
      }

      setMessage(data.message);
      setMessageType("success");

      setEmail("");
      setConsent(false);
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter"
      className="z-40 relative py-12 lg:py-20 overflow-hidden"
    >
      <div className="custom-container">
        <div className="relative flex flex-col lg:w-1/2 mx-auto gap-6 text-center items-center">

          <motion.p
            {...animationTop}
            className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm"
          >
            Newsletter
          </motion.p>

          <motion.h1
            {...animationTop}
            transition={{
              ...animationTop.transition,
              delay: 0.05,
            }}
            className="heading"
          >
            Stay connected,{" "}
            <span className="text-russian-red">
              keep learning
            </span>
          </motion.h1>

          <motion.p
            {...animationTop}
            transition={{
              ...animationTop.transition,
              delay: 0.1,
            }}
          >
            Get one new word, one grammar tip and one free
            practice quiz in your inbox every week. No spam,
            unsubscribe anytime.
          </motion.p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 max-w-xl w-full mx-auto"
          >
            <div className="flex flex-wrap flex-col sd:flex-row gap-3 w-full">

              <motion.input
                {...animationTop}
                transition={{
                  ...animationTop.transition,
                  delay: 0.15,
                }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="flex-1 rounded border border-gray-200 bg-white px-4 py-2 placeholder:text-gray-400 text-gray-600 focus:ring-2 focus:ring-russian-red focus:outline-hidden focus:border-none resize-none"
              />

              <motion.button
                {...animationTop}
                transition={{
                  ...animationTop.transition,
                  delay: 0.2,
                }}
                type="submit"
                disabled={loading}
                className="button button-russian-red disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>
                  {loading ? "Subscribing..." : "Subscribe"}
                </span>
              </motion.button>

            </div>

            <label className="flex items-start gap-2 text-left text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 accent-russian-red"
              />

              <span>
                I agree to receive the Russian Learning newsletter
                by email. I understand that I can unsubscribe at
                any time.
              </span>
            </label>

            {message && (
              <p
                role="status"
                aria-live="polite"
                className={`text-sm text-left ${
                  messageType === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>

          <motion.p
            {...animationTop}
            transition={{
              ...animationTop.transition,
              delay: 0.15,
            }}
            className="text-sm"
          >
            Join our Russian learning community.
          </motion.p>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;
// import React from 'react'
// import { motion } from "motion/react";
// import { animationTop } from '../constants';

// const Newsletter = () => {
//   return (
//     <section
//       id="newsletter"
//       className="z-40 relative py-12 lg:py-20 overflow-hidden"
//     >
//       <div className="custom-container">
//         <div className="relative flex flex-col lg:w-1/2 mx-auto gap-6 text-center items-center">
//           <motion.p
//             {...animationTop}
//             className="uppercase font-bold text-russian-dark-blue border-l-2 border-russian-red pl-2 text-sm">Newsletter
//           </motion.p>
//           <motion.h1
//             {...animationTop}
//             transition={{
//               ...animationTop.transition,
//               delay: 0.05,
//             }}
//             className="heading">Stay connected, <span className="text-russian-red">keep learning</span></motion.h1>
//           <motion.p
//             {...animationTop}
//             transition={{
//               ...animationTop.transition,
//               delay: 0.1,
//             }}
//           >Get one new word, one grammar tip and one free practice quiz in your inbox every
//             week. No spam, unsubscribe anytime.</motion.p>
//           <form
//             className="flex flex-wrap flex-col sd:flex-row gap-3 max-w-xl w-full mx-auto"
//           >
//             <motion.input
//              {...animationTop}
//             transition={{
//               ...animationTop.transition,
//               delay: 0.15,
//             }}
//               type="email"
//               required
//               placeholder="Enter your email"
//               className='flex-1 rounded border border-gray-200 bg-white px-4 py-2 placeholder:text-gray-400 text-gray-600 focus:ring-2 focus:ring-russian-red focus:outline-hidden focus:border-none resize-none'
//             />
//             <motion.button
//              {...animationTop}
//             transition={{
//               ...animationTop.transition,
//               delay: 0.2,
//             }}
//               type="submit"
//               className="button button-russian-red"
//             ><span>Subscribe</span></motion.button>
//           </form>
//           <motion.p
//            {...animationTop}
//             transition={{
//               ...animationTop.transition,
//               delay: 0.15,
//             }}
//            className="text-sm">Join 1.2k+ learners already reading.</motion.p>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Newsletter


// import { useState } from "react";

// const API_URL = import.meta.env.VITE_API_URL; // e.g. https://your-service.onrender.com

// export default function NewsletterForm() {
//   const [email, setEmail] = useState("");
//   const [consent, setConsent] = useState(false);
//   const [status, setStatus] = useState({ type: "", text: "" });
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     setStatus({ type: "", text: "" });
//     try {
//       const res = await fetch(`${API_URL}/api/newsletter/subscribe`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, consent }),
//       });
//       const data = await res.json();
//       setStatus({ type: data.success ? "ok" : "error", text: data.message });
//       if (data.success) { setEmail(""); setConsent(false); }
//     } catch {
//       setStatus({ type: "error", text: "Network error. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email" required placeholder="Your email"
//         value={email} onChange={(e) => setEmail(e.target.value)}
//       />
//       <label>
//         <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
//         I agree to receive weekly newsletter emails.
//       </label>
//       <button disabled={loading || !consent}>{loading ? "Sending..." : "Subscribe"}</button>
//       {status.text && <p style={{ color: status.type === "ok" ? "green" : "red" }}>{status.text}</p>}
//     </form>
//   );
// }