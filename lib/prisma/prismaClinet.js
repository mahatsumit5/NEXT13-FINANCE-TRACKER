import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function addNewIncome(newIncome) {
  try {
    return await prisma.income.create({
      data: newIncome,
    });
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
export async function getAllIncome(uid) {
  try {
    const incomes = await prisma.income.findMany({
      where: {
        uid,
      },
    });
    return incomes;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function createCatagory(catagory) {
  try {
    return await prisma.expenseCatagory.create({
      data: catagory,
    });
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
export async function getCatagories(uid) {
  try {
    const catagories = await prisma.expenseCatagory.findMany({
      where: {
        uid,
      },
    });
    return catagories;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
