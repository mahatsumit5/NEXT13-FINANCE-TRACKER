-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_catagoryId_fkey" FOREIGN KEY ("catagoryId") REFERENCES "ExpenseCatagory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
