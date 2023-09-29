const chai = require("chai");
const chatHttp = require("chai-http");
const app = require("../index");
const expect = chai.expect;

chai.use(chatHttp);

const loanData = {
  borrowers: [
    {
      pairId: 1,
      firstName: "John",
      lastName: "Doe",
      phone: "12345678",
    },
  ],
};

const borrowerData = {
  pairId: 1,
  firstName: "Kevin",
  lastName: "Scott",
  phone: "12345678",
};

describe("Loan API", () => {
  let loanId;

  // Test GET /loans
  describe("GET /loans", () => {
    it("should return all loans", (done) => {
      chai
        .request(app)
        .get("/loans")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });

  // Test POST /loans
  describe("POST /loans", () => {
    it("should add a new loan", (done) => {
      chai
        .request(app)
        .post("/loans")
        .send(loanData)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect({
            borrowers: res.body.borrowers,
          }).to.eql(loanData);
          loanId = res.body.loanId;
          done();
        });
    });
  });

  // Test GET /loans/:loanId
  describe("GET /loans/:loanId", () => {
    it("should return a specific loan", (done) => {
      chai
        .request(app)
        .get(`/loans/${loanId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect({
            borrowers: res.body.borrowers,
          }).to.eql(loanData);
          done();
        });
    });

    it("should return 404 error if loan is not found", (done) => {
      chai
        .request(app)
        .get("/loan/9999")
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  // Test PATCH /loans/:loanId/borrowers/:borrowerId
  describe("PATCH /loans/:loanId/borrowers/:borrowerId", () => {
    it("should patch a specific borrower", (done) => {
      chai
        .request(app)
        .patch(`/loans/${loanId}/borrowers/1`)
        .send(borrowerData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.eql(borrowerData);
          done();
        });
    });

    it("should return 404 if loan is not found", (done) => {
      chai
        .request(app)
        .patch(`/loans/9999/borrowers/1`)
        .send(borrowerData)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it("should return 404 if borrow is not found", (done) => {
      chai
        .request(app)
        .patch(`/loans/1/borrowers/9999`)
        .send(borrowerData)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  // Test DELETE /loans/:loanId/borrowers/:borrowerId
  describe("DELETE /loans/:loanId/borrowers/:borrowerId", () => {
    it("should delete a specific borrower", (done) => {
      chai
        .request(app)
        .delete(`/loans/${loanId}/borrowers/1`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.eql(borrowerData);
          done();
        });
    });

    it("should return 404 if loan is not found", (done) => {
      chai
        .request(app)
        .delete(`/loans/9999/borrowers/1`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it("should return 404 if borrow is not found", (done) => {
      chai
        .request(app)
        .delete(`/loans/1/borrowers/9999`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  // Test DELETE /loans/:loanId
  describe("DELETE /loans/:loanId", () => {
    it("should delete a specific loan", (done) => {
      chai
        .request(app)
        .delete(`/loans/${loanId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it("should return 404 error if loan is not found", (done) => {
      chai
        .request(app)
        .get("/loan/9999")
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
