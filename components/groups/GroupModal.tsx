"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { createGroup, joinGroup } from "@/app/dashboard/actions";

type GroupModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  type: "create" | "join";
};

const GroupModal = ({
  isOpen,
  onOpenChange,
  onClose,
  type,
}: GroupModalProps) => {
  const title = type === "create" ? "Create a New Group" : "Join a Group";

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody>
            {type === "create" ? (
              <form
                id="create-group"
                action={createGroup}
                className="flex flex-col gap-1"
              >
                <label htmlFor="group-name">Enter Your Group Name</label>
                <input
                  type="text"
                  id="group-name"
                  name="groupName"
                  placeholder="e.g. Best Group Ever"
                  required
                />
              </form>
            ) : (
              <form
                id="join-group"
                action={joinGroup}
                className="flex flex-col gap-1"
              >
                <label htmlFor="group-code">Enter Your Group Invite Code</label>
                <input
                  type="text"
                  id="group-code"
                  name="groupCode"
                  placeholder="e.g. Af8k3LzP"
                  required
                />
              </form>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            {type === "create" ? (
              <Button color="primary" type="submit" form="create-group">
                Create Group
              </Button>
            ) : (
              <Button color="primary" type="submit" form="join-group">
                Join Group
              </Button>
            )}
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default GroupModal;
