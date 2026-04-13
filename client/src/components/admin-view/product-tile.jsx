import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

function AdminProductTile({ product }) {
  return (
    <Card className={"w-full max-w-sm mx-auto"}>
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>

        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2 pb-3 border-b ">
            <span
              className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>

          <CardFooter className={"flex justify-between items-center px-1 "}>
            <Button className={"w-16"}>Edit</Button>
            <Button className={"w-16"}>Delete</Button>
          </CardFooter>
        </CardContent>
      </div>
    </Card>
  );
}

export default AdminProductTile;
