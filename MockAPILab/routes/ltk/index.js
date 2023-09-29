const express = require("express");
const router = express.Router();
const Loan = require("../../models/Loan");

const loans = [];
let loanIdCounter = 1;

router.get("/", (req, res) => {
  res.json(loans);
});

router.post("/", (req, res) => {
  const { borrowers } = req.body;
  if (!borrowers || !Array.isArray(borrowers) || !borrowers.length) {
    res.status(400).json({ error: "Invalid Data" });
  } else {
    const newLoan = new Loan(loanIdCounter++, borrowers);
    loans.push(newLoan);
    res.status(201).json(newLoan);
  }
});

router.get("/:loanId", (req, res) => {
  const loanId = parseInt(req.params.loanId);
  const loan = loans.find((loan) => loan.loanId === loanId);
  if (!loan) {
    res.status(404).json({ error: "Loan not found" });
  } else {
    res.json(loan);
  }
});

router.patch("/:loanId/borrowers/:pairId", (req, res) => {
  const loanId = parseInt(req.params.loanId);
  const pairId = parseInt(req.params.pairId);

  const loan = loans.find((loan) => loan.loanId === loanId);
  if (!loan) {
    res.status(404).json({ error: "Loan not found" });
  } else {
    const borrower = loan.borrowers.find(
      (borrower) => borrower.pairId === pairId
    );
    if (!borrower) {
      res.status(404).json({ error: "Borrow not found" });
    } else {
      Object.assign(borrower, req.body);
      res.status(200).json(borrower);
    }
  }
});

router.delete("/:loanId/borrowers/:pairId", (req, res) => {
  const loanId = parseInt(req.params.loanId);
  const pairId = parseInt(req.params.pairId);

  const loan = loans.find((loan) => loan.loanId === loanId);
  if (!loan) {
    res.status(404).json({ error: "Loan not found" });
  } else {
    const borrowerIndex = loan.borrowers.findIndex(
      (borrower) => borrower.pairId === pairId
    );
    if (borrowerIndex === -1) {
      res.status(404).json({ error: "Borrow not found" });
    } else {
      const deleteBorrower = loan.borrowers.splice(borrowerIndex, 1);
      res.json(deleteBorrower[0]);
    }
  }
});

router.delete("/:loandId", (req, res) => {
  const loanId = parseInt(req.params.loandId);

  const loanIndex = loans.find((loan) => loan.loanId === loanId);

  if (loanIndex === -1) {
    res.status(404).json({ error: "Loan not found" });
  } else {
    const deleteLoan = loans.splice(loanIndex, 1);
    res.json(deleteLoan[0]);
  }
});

module.exports = router;
