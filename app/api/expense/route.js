import {
  createExpense,
  getExpenseByCat,
  updateCatagory,
} from "@/lib/prisma/prismaClinet";

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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const expenses = await getExpenseByCat(id);
    return Response.json({
      status: "success",
      expenses,
    });
  } catch (error) {
    return Response.json({
      status: "error",
      message: error.message,
    });
  }
}
