"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export function ContactForm({ email }: { email: string }) {
  const [form, setForm] = useState({ name: "", topic: "General question", message: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`[EstiCalc] ${form.topic}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  const input =
    "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20";

  return (
    <form onSubmit={submit} className="not-prose space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="c-name" className="mb-1.5 block text-sm font-semibold text-slate-700">
          Your name
        </label>
        <input id="c-name" required className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div>
        <label htmlFor="c-topic" className="mb-1.5 block text-sm font-semibold text-slate-700">
          Topic
        </label>
        <select id="c-topic" className={input} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
          <option>General question</option>
          <option>Report a calculator error</option>
          <option>Suggest a new calculator</option>
          <option>Advertising or partnership</option>
          <option>Privacy request</option>
        </select>
      </div>
      <div>
        <label htmlFor="c-msg" className="mb-1.5 block text-sm font-semibold text-slate-700">
          Message
        </label>
        <textarea
          id="c-msg"
          required
          rows={6}
          className={input}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="If you're reporting an error, include the calculator name and the values you entered."
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-2.5 font-semibold text-white hover:bg-brand-800"
      >
        <Mail className="h-4 w-4" aria-hidden="true" /> Send message
      </button>
      <p className="text-xs text-slate-500">This opens your email app with the message ready to send.</p>
    </form>
  );
}
