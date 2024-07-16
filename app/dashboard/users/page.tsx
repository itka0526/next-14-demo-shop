import prisma from "@/lib/db";
import { UserSchema } from "@/lib/types";

export default async function Page() {
    const users = await prisma.user.findMany();
    const fields = Object.keys(UserSchema._def.shape());
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
                    {users.map((info, idx) => (
                        <tr key={`${idx}`}>
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
