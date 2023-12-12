import {
  createCatagory,
  getCatagories,
  updateCatagory,
} from "@/lib/prisma/prismaClinet";

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, catagoryId } = body;
    const result = await createCatagory(body);
    await updateCatagory(catagoryId, amount);
    if (result?.id) {
      return Response.json({
        status: "success",
        result: body,
      });
    }
    return Response.json({
      status: "fail",
      msg: "",
    });
  } catch (error) {
    return Response.json({
      status: "error",
      message: error.message,
    });
  }
}
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");
    const result = await getCatagories(uid);
    return Response.json({
      status: "success",
      result,
    });
  } catch (error) {}
}
