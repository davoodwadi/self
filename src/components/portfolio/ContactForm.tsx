type FormFieldProps = {
  id: string;
  label: string;
  type?: "text" | "email";
  placeholder: string;
};

function FormField({ id, label, type = "text", placeholder }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium text-gray-500 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
}

export function ContactForm() {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField id="name" label="Name" placeholder="John Doe" />
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-xs font-medium text-gray-500 mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors resize-none"
          placeholder="How can we collaborate?"
        ></textarea>
      </div>
      <button
        type="button"
        className="w-full py-4 bg-white text-dark-900 font-medium rounded-lg hover:bg-gray-200 transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
