import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-items-content";

const UserCartWrapper = ({ cartItems }) => {
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0,
        )
      : 0;
  return (
    <SheetContent className={"sm:max-w-md"}>
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt- space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent cartItems={item} />)
          : null}
      </div>

      <div className=" space-y-4 px-5">
        <div className="flex justify-between">
          <span className="font-bold ">Total</span>
          <span className="font-bold ">${totalCartAmount}</span>
        </div>
      </div>

      <div className="px-5">
        <Button className={"w-full mt-6 h-10 "}>Checkout</Button>
      </div>
    </SheetContent>
  );
};

export default UserCartWrapper;
