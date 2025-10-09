"use server"
import { createClient } from "@/utils/supabase/server";
import { generateInviteCode } from "@/utils/helperFunctions";

export const createInviteCode = async (groupID: string) => {
  const supabase = await createClient();
  const inviteCode = await generateInviteCode();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Add invite code to invite table
  const { data, error } = await supabase
    .from("invites")
    .insert({
      group_id: groupID,
      invite_code: inviteCode,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating invite:", error);
    throw new Error("Failed to create invite");
  }

  return data.invite_code;
};