import React from "react";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";

const GroupCard = ({ name }: { name: string }) => {
  return (
    <Card className="max-w-[300px] w-full mx-auto" isPressable onPress={() => console.log("Path to group page")}>
      <CardBody>
        <Image
          src="/cart_image_test.jpeg"
          alt="cart_image_test"
          width={140}
          height={140}
        />
      </CardBody>
      <CardFooter>
        <h2>{name}</h2>
      </CardFooter>
    </Card>
  );
};

export default GroupCard;
