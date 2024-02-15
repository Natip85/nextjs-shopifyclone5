"use client";
import { Product, Variant } from "@prisma/client";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { Badge } from "../ui/badge";
import AddVariantForm from "./AddVariantForm";

interface VariantCardProps {
  product?: Product & {
    variants: Variant[];
  };
  variant: Variant;
}
const VariantCard = ({ product, variant }: VariantCardProps) => {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div>
      <Card className="mb-3 p-2">
        <CardContent>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold mb-3">{variant.title}</h2>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant={"outline"}
                  className="max-h-[30px]"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[900px] w-[90%]">
                <DialogHeader className="px-2">
                  <DialogTitle>Update variant</DialogTitle>
                  <DialogDescription>
                    Make changes to this variant.
                  </DialogDescription>
                </DialogHeader>
                <AddVariantForm
                  product={product}
                  variant={variant}
                  handleDialogOpen={handleDialogOpen}
                />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-2 overflow-y-auto flex-wrap">
            {variant.options.map((val, index) => (
              <div key={index} className="flex gap-2 overflow-y-auto flex-wrap">
                {val.values.map((tag, index) => {
                  return (
                    <Badge key={index} variant="secondary">
                      {tag.name}
                    </Badge>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VariantCard;
