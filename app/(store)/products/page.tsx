import Link from "next/link";

const Products = () => {
  return (
    <div>
      <div>Products</div>
      <Link href={"/products/new"}>Add product</Link>
    </div>
  );
};

export default Products;
