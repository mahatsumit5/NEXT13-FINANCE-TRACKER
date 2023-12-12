import { createExpense, updateCatagory } from "@/lib/prisma/prismaClinet";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);
    const { amount, catagoryId, total } = body;

    await updateCatagory(catagoryId, total);
    const result = await createExpense({ amount, catagoryId });
    return Response.json({
      status: "success",
      result,
    });
  } catch (error) {
    return Response.json({
      status: "error",
    });
  }
}
