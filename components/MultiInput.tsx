import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import { forwardRef, useState } from "react";

type InputTagsProps = InputProps & {
  value: string[];
  onChange: (value: string[]) => void;
};
const MultiInput = forwardRef<HTMLInputElement, InputTagsProps>(
  ({ value, onChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = useState("");

    const addPendingDataPoint = () => {
      if (pendingDataPoint) {
        const newDataPoints = new Set([...value, pendingDataPoint]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    };

    return (
      <div>
        <div className="flex items-center justify-between">
          <div className="w-[90%]">
            <Input
              placeholder="Medium"
              value={pendingDataPoint}
              onChange={(e) => setPendingDataPoint(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addPendingDataPoint();
                } else if (e.key === "," || e.key === " ") {
                  e.preventDefault();
                  addPendingDataPoint();
                }
              }}
              className="mr-3"
              {...props}
              ref={ref}
            />
          </div>
          <Button
            type="button"
            size={"sm"}
            variant={"outline"}
            onClick={addPendingDataPoint}
          >
            Add
          </Button>
        </div>
        <div className="min-h-[2.5rem] overflow-y-auto p-2 flex gap-2 flex-wrap items-center mt-2">
          {value.map((item, idx) => (
            <Badge key={idx} variant="secondary">
              {item}
              <button
                type="button"
                className="w-3 ml-2"
                onClick={() => {
                  onChange(value.filter((i) => i !== item));
                }}
              >
                <XIcon className="w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    );
  }
);

MultiInput.displayName = "InputTags";
export default MultiInput;
