import { getProductById } from "@/actions/getProductById";
import EditVariantForm from "@/components/product/EditVariantForm";
interface VariantsIdPageProps {
  params: {
    productId: string;
  };
}
const VariantsId = async ({ params }: VariantsIdPageProps) => {
  const product = await getProductById(params.productId);

  return (
    <div>
      <EditVariantForm product={product} />
    </div>
  );
};

export default VariantsId;
