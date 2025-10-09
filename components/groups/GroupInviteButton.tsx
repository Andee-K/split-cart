"use client";

import { useState, useTransition } from "react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { createInviteCode } from "@/app/dashboard/group/[id]/actions";

export default function GroupInvite({ groupId }: { groupId: string }) {
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  async function handleGenerate() {
    startTransition(async () => {
      const code = await createInviteCode(groupId);
      setInviteCode(code);
    });
  }

  return (
    <>
      <Button onPress={handleOpen}>Invite a User</Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen} placement="center" backdrop="blur">
        <ModalContent>
          <>
            <ModalHeader>Invite a user to this group</ModalHeader>
            
            <ModalBody>
              {!inviteCode ? (
                <p>Generate a unique invite link to share.</p>
              ) : (
                <div className="flex gap-2 items-center">
                  <input
                    readOnly
                    value={inviteCode}
                    className="w-full border rounded-md p-2 text-sm"
                  />
                  <Button
                    size="sm"
                    onPress={() => navigator.clipboard.writeText(inviteCode)}
                  >
                    Copy
                  </Button>
                </div>
              )}
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => setIsOpen(false)}>
                Close
              </Button>
              {!inviteCode && (
                <Button color="primary" onPress={handleGenerate} isLoading={isPending}>
                  Generate
                </Button>
              )}
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
