"use client";
import React, { useEffect, useRef, useContext } from "react";
import { financeContext } from "@/lib/store/finance-context";
import Modal from "../Modal";

// icons
import { FaRegTrashAlt } from "react-icons/fa";
import { currencyFormatter } from "@/lib/utils";
import { authContext } from "@/lib/store/auth-context";

const AddModal = ({ setShowAddIncomeModal, showAddIncomeModal }) => {
  const { user } = useContext(authContext);
  console.log(user.uid);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const { income, addIncomeItem, removeIncomeItem } =
    useContext(financeContext);
  // handle delete

  const deleteIncome = async (id) => {
    try {
      await removeIncomeItem(id);
    } catch (error) {
      console.log(error);
    }
  };
  // handle add function
  const addIncomeHandle = async (e) => {
    e.preventDefault();
    const newIncome = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
      uid: user.uid,
    };
    try {
      await addIncomeItem(newIncome);
    } catch (error) {
      console.log(error);
    }
    descriptionRef.current.value = "";
    amountRef.current.value = "";
  };

  return (
    <Modal onClose={setShowAddIncomeModal} show={showAddIncomeModal}>
      <form
        onSubmit={addIncomeHandle}
        className="input-group
"
      >
        <div className="input-group">
          <label htmlFor="amount"> Income Amount</label>
          <input
            ref={amountRef}
            className="px-4 py-2 rounded-xl bg-slate-600"
            type="number"
            name="amount"
            min={0.1}
            step={0.01}
            placeholder="Enter your income"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="amount"> Description</label>
          <input
            ref={descriptionRef}
            className="px-4 py-2 rounded-xl bg-slate-600"
            type="text"
            name="description"
            placeholder="Enter your description"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>
      <div className=" flex flex-col">
        <h3 className="text-2xl">Income History</h3>
        {income.map(({ id, description, amount, createdAt }) => {
          return (
            <div key={id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{description}</p>
                <small className="text-sm">{createdAt.toDateString()}</small>
              </div>

              <p className="flex items-center gap-2">
                {currencyFormatter(amount)}
                <button
                  className="btn"
                  onClick={() => {
                    deleteIncome(id);
                  }}
                >
                  <FaRegTrashAlt color="red" />
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default AddModal;
