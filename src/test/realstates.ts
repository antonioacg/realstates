import chai = require("chai");
import chaiHttp = require("chai-http");
import * as mocha from "mocha";
import * as request from "supertest";
import server from "../";

chai.use(chaiHttp);
const expect = chai.expect;

const baseUrlRealStates = "/api/v1/realstates";
const realStateTest = {
  address: "Avenida Barbacena, 1200",
  price: 5000000,
};
let realStateTestId: string;

describe("POST " + baseUrlRealStates, () => {
  it("saves a new realstate", (done) => {
    request(server).post(baseUrlRealStates)
      .send(realStateTest)
      .expect(201)
      .end((err, res) => {
        realStateTestId = res.body.id;
        done(err);
      });
  });
});

describe("GET " + baseUrlRealStates, () => {
  it("should return http status \"200\"", () => {
    return request(server).get(baseUrlRealStates)
      .expect(200);
  });

  it("should return objects with keys \"price\",\"address\",\"id\"", (done) => {
    request(server).get(baseUrlRealStates)
      .end((err, res) => {
        expect(err).to.be.null;
        res.body.every((i: Document) =>
          expect(i).to.have.all.keys([
            "price",
            "address",
            "id",
          ]),
        );
        done(err);
      });
  });

  it("should return object by id", (done) => {
    request(server).get(baseUrlRealStates + "/" + realStateTestId)
      .end((err, res) => {
        const realStateReal = res.body;
        expect(realStateReal.address).to.be.eq(realStateTest.address);
        expect(realStateReal.id).to.be.eq(realStateTestId);
        expect(realStateReal.price).to.be.eq(realStateTest.price);
        done(err);
      });
  });
});
