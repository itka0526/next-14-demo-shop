import prisma from "@/lib/db";
import { ProductSchema } from "@/lib/types";
import Link from "next/link";

export default async function Page() {
    const products = await prisma.product.findMany();
    const fields = Object.keys(ProductSchema._def.shape());
    return (
        <div className="overflow-x-scroll">
            <table className="table">
                <thead>
                    <tr>
                        {fields.map((field, idx) => (
                            <th key={`${field}-${idx}`}>{field}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, idx) => (
                        <tr key={`product-${product.id}`}>
                            {Object.values(product).map((value, idx) => (
                                <td key={`${value}${idx}`}>{value.toLocaleString().toString()}</td>
                            ))}
                            <td>
                                <Link href={`/dashboard/products/edit/${product.productName}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
