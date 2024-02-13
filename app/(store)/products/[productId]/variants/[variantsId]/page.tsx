import { getProductById } from "@/actions/getProductById";
import EditVariantForm from "@/components/product/EditVariantForm";
interface VariantsIdPageProps {
  params: {
    productId: string;
  };
}
const VariantsId = async ({ params }: VariantsIdPageProps) => {
  const product = await getProductById(params.productId);
  console.log("PRODUCT>>>>", product);
  console.log("prodvariants>>>>", product?.variants);
  console.log(
    "options>>>>",
    product?.variants.map((variant) => variant.options)
  );
  console.log(
    "nextoption>>>>",
    product?.variants?.map((variant) => {
      variant?.options?.map((option) => option.values);
    })
  );

  return (
    <div>
      <EditVariantForm product={product} />
    </div>
  );
};

export default VariantsId;
