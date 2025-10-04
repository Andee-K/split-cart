import React from "react";
import { createClient } from "@/utils/supabase/server";
import GroupList from "@/components/groups/GroupList";
import { redirect } from "next/navigation";
import { UserGroupRow } from "@/utils/types";

async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Retrieve all groups the user is in
  const { data: userGroups, error } = await supabase
    .from("group_users")
    .select("group(*)")
    .eq("user_id", user.id)
    .returns<UserGroupRow[]>();

  const groups = userGroups?.map((item) => item.group) ?? [];

  return (
    <>
      <h1>Dashboard Page</h1>
      <h2>Your Groups</h2>
      <GroupList groups={groups ?? []}></GroupList>
    </>
  );
}

export default DashboardPage;
