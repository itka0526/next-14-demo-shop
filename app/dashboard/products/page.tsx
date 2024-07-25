import prisma from "@/lib/db";
import { ProductSchema } from "@/lib/types";

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
                    {products.map((info, idx) => (
                        <tr key={`product-${info.id}`}>
                            {Object.values(info).map((value, idx) => (
                                <td key={`${value}${idx}`}>{value.toLocaleString().toString()}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
