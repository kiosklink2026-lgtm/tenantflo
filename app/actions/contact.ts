"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ContactState = {
  ok: boolean;
  message: string;
};

const MAX_NAME = 120;
const MAX_MESSAGE = 4000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const nameRaw = formData.get("name");
  const emailRaw = formData.get("email");
  const messageRaw = formData.get("message");

  const name =
    typeof nameRaw === "string" ? nameRaw.trim().slice(0, MAX_NAME) : "";
  const email =
    typeof emailRaw === "string" ? emailRaw.trim().toLowerCase() : "";
  const message =
    typeof messageRaw === "string"
      ? messageRaw.trim().slice(0, MAX_MESSAGE)
      : "";

  if (!name) {
    return { ok: false, message: "Please enter your name." };
  }
  if (!email) {
    return { ok: false, message: "Please enter your email." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  if (!message) {
    return { ok: false, message: "Please enter a message." };
  }
  if (message.length < 10) {
    return {
      ok: false,
      message: "Please add a bit more detail (at least 10 characters).",
    };
  }

  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return {
      ok: false,
      message:
        "Contact form is not configured. Email us at hello@tenantflo.com instead.",
    };
  }

  const { error } = await supabase.from("contact_submissions").insert({
    name,
    email,
    message,
  });

  if (error) {
    return {
      ok: false,
      message: "Something went wrong. Please try again or email hello@tenantflo.com.",
    };
  }

  return {
    ok: true,
    message: "Thanks — we received your message and will get back to you soon.",
  };
}
