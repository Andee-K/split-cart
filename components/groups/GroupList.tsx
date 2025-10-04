"use client";
import React from "react";
import { Group } from "@/utils/types";
import GroupCard from "./GroupCard";
import MdiAccountPlus from "../icons/MdiAccountPlus";
import MdiAccountMultiplePlus from "../icons/MdiAccountMultiplePlus";
import { Button, useDisclosure } from "@heroui/react";
import GroupModal from "./GroupModal";

const GroupList = ({ groups }: { groups: Group[] }) => {
  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();

  const {
    isOpen: isOpenJoin,
    onOpen: onOpenJoin,
    onClose: onCloseJoin,
  } = useDisclosure();

  return (
    <div>
      <Button onPress={onOpenCreate} endContent={<MdiAccountMultiplePlus />}>
        Create a New Group
      </Button>
      <Button onPress={onOpenJoin} endContent={<MdiAccountPlus />}>
        Join a Group
      </Button>

      <GroupModal
        isOpen={isOpenCreate}
        onOpenChange={(open) => (open ? onOpenCreate() : onCloseCreate())}
        onClose={onCloseCreate}
        type="create"
      />

      <GroupModal
        isOpen={isOpenJoin}
        onOpenChange={(open) => (open ? onOpenJoin() : onCloseJoin())}
        onClose={onCloseJoin}
        type="join"
      />

      <ul className="grid md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <li key={group.id}>
            <GroupCard name={group.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
