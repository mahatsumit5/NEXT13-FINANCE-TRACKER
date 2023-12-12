import { createCatagory, getCatagories } from "@/lib/prisma/prismaClinet";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await createCatagory(body);
    if (result?.id) {
      return Response.json({
        status: "success",
        result: body,
      });
    }
    return Response.json({
      status: "fail",
      msg: "创建失败，请检查输入是否正确！",
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
