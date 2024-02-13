import { Product, Variant } from "@prisma/client";

interface EditVariantFormProps {
  product: ProductWithVariants | null;
}
export type ProductWithVariants = Product & {
  variants: Variant[];
};
const EditVariantForm = ({ product }: EditVariantFormProps) => {
  return (
    <div className="lg:flex w-full">
      <div className="mr-5 w-full lg:w-[35%]">
        <div className="w-full rounded-lg overflow-hidden bg-white p-4 border-2 border-gray-200 shadow-lg mb-5">
          wwwwww
        </div>
        <div className="w-full rounded-lg overflow-hidden bg-white p-4 border-2 border-gray-200 shadow-lg mb-5">
          trttg
        </div>
      </div>
      <div className="flex-1">
        <div className="w-full rounded-lg overflow-hidden bg-white p-4 border-2 border-gray-200 shadow-lg mb-5">
          ghthgt
        </div>
        <div className="w-full rounded-lg overflow-hidden bg-white p-4 border-2 border-gray-200 shadow-lg mb-5">
          fg
        </div>
        <div className="w-full rounded-lg overflow-hidden bg-white p-4 border-2 border-gray-200 shadow-lg mb-5">
          yighik
        </div>
        <div className="w-full rounded-lg overflow-hidden bg-white p-4 border-2 border-gray-200 shadow-lg mb-5">
          frgtr
        </div>
      </div>
    </div>
  );
};

export default EditVariantForm;
