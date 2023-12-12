import {
  createCatagory,
  deleteExpCat,
  getCatagories,
  updateCatagory,
} from "@/lib/prisma/prismaClinet";

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
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const result = await deleteExpCat(id);
    if (result?.id) {
      return Response.json({
        status: "success",
        message: "Delete Successfull",
      });
    }
    return Response.json({
      status: "fail",
      result,
    });
  } catch (error) {
    return Response.json({
      status: "error",
      message: error.message,
    });
  }
}
export async function PUT(req) {
  try {
    const body = await req.json();
    console.log(body);
    const { amount, id } = body;
    const result = await updateCatagory(id, amount);

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
