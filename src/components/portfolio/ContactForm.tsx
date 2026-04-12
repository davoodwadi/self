"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";

type FormFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email";
  placeholder: string;
  required?: boolean;
};

function FormField({ id, name, label, type = "text", placeholder, required = false }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-muted mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleAction(formData: FormData) {
    setStatus("submitting");
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="p-6 bg-accent-500/10 border border-accent-500/20 rounded-lg text-center">
        <h3 className="text-lg font-medium text-white mb-2">Message Sent!</h3>
        <p className="text-muted">Thanks for reaching out. I'll get back to you soon.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-accent-500 hover:text-accent-400 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form action={handleAction} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField id="name" name="name" label="Name" placeholder="John Doe" required />
        <FormField
          id="email"
          name="email" 
          label="Email"
          type="email"
          placeholder="john@example.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-xs font-medium text-muted mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors resize-none"
          placeholder="How can we collaborate?"
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-4 bg-white text-dark-900 font-medium rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-red-500 text-sm mt-2 text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
