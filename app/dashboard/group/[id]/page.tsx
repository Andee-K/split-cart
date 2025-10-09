import React from "react";
import { createClient } from "@/utils/supabase/server";
import GroupInviteButton from "@/components/groups/GroupInviteButton";

interface GroupUsers {
  role: string;
  user: {
    username: string;
  };
}

async function GroupPage({ params }: { params: Promise<{ id: string }> }) {
  // Serverside: Load current users in group, past carts, current existing cart
  // Clientside: Invite link, creating new cart,
  const { id: groupId } = await params;
  const supabase = await createClient();

  const { data: groupCartData } = await supabase
    .from("cart")
    .select("*")
    .eq("group_id", groupId)
    .single();

  const { data: groupName, error } = await supabase
    .from("group")
    .select("name")
    .eq("id", groupId)
    .single();

  const { data: groupUsers } = await supabase
    .from("group_users")
    .select(
      `
    role,
    user: user_id (
      username
    )
  `
    )
    .eq("group_id", groupId)
    .returns<GroupUsers[]>();

  console.log("groupUsers:", groupUsers);

  return (
    <div>
      <p>{groupName?.name || "No group found"}</p>
      <p>
        Members in the group:{" "}
        {groupUsers?.map((groupUser) => groupUser.user?.username).join(", ")}
      </p>
      <GroupInviteButton groupId={groupId}></GroupInviteButton>
      <p>{groupCartData?.name || "No cart found"}</p>
    </div>
  );
}

export default GroupPage;
