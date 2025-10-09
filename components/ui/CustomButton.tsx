import { Button, ButtonGroup } from "@heroui/button";
import React from "react";

export const CustomButton = ({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress: () => void;
}) => {
  return (
    <Button onPress={onPress} color="default" variant="solid" radius="md">
      {children}
    </Button>
  );
};
