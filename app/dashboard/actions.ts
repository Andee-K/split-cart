"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


// Server action to create a new group
export const createGroup = async (formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not authenticated");
  }

  const groupName = formData.get("groupName") as string;
  // 1. Insert the new group and get its data back
  const { data: newGroup, error: groupError } = await supabase
    .from("group")
    .insert({
      name: groupName,
      created_by: user.id,
    })
    .select()
    .single();

  if (groupError) {
    console.error("Error creating group:", groupError);
    throw new Error("Failed to create group");
  }

  // 2. Add the creator to the group_users table
  const { error: groupUserError } = await supabase.from("group_users").insert({
    group_id: newGroup.id,
    user_id: user.id,
    role: "admin",
  });

  if (groupUserError) {
    console.error("Error adding user to group:", groupUserError);
    throw new Error("Failed to add user to the new group");
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
};

export const joinGroup = async (formData: FormData) => {
  const supabase = await createClient();
};

export const generateInviteCode = () => {

}
