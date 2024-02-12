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
import AddVariant from "./AddVariant";
import { Badge } from "../ui/badge";

interface VariantCardProps {
  product?: Product & {
    variants: Variant[];
  };
  variant?: Variant;
}
const VariantCard = ({ product, variant }: VariantCardProps) => {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Card className="mb-3 p-2">
      <CardContent>
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">{variant?.title}</h2>
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
                <DialogTitle>Update room</DialogTitle>
                <DialogDescription>
                  Make changes top this room
                </DialogDescription>
              </DialogHeader>
              <AddVariant
                variant={variant}
                handleDialogOpen={handleDialogOpen}
              />
            </DialogContent>
          </Dialog>
        </div>
        {variant?.options.map((val) => (
          <div key={val.id} className="flex gap-2">
            {val.values.map((tag) => {
              return (
                <Badge key={tag.id} variant="secondary">
                  {tag.name}
                </Badge>
              );
            })}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default VariantCard;
