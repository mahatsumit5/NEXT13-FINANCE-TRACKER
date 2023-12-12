import { addNewIncome, getAllIncome } from "@/lib/prisma/prismaClinet";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const income = await addNewIncome(body);
    if (income.id) {
      return Response.json({
        status: "success",
        result: income,
      });
    }
    return Response.json({
      status: "error",
      message: "Unable to add Income",
    });
  } catch (error) {
    Response.json({
      status: "error",
      message: error.message,
    });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");
    const incomes = await getAllIncome(uid);
    if (incomes.length > 0) {
      return Response.json({
        incomes,
      });
    }
    return Response.json({ messgae: "No data found" });
  } catch (error) {
    Response.json({
      status: "error",
      message: error.message,
    });
  }
}
