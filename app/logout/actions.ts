"use client";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

const supabase = createClient();

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error.message);
  redirect("/login");
};
