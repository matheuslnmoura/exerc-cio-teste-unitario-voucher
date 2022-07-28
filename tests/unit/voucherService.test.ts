import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";
import { isRef } from "joi";
import voucherRepository from "../../src/repositories/voucherRepository.js";
import voucherService from "../../src/services/voucherService.js";
import voucherFactory from "./factories/voucherFactory.js";


describe("createVoucher test suite", () => {
  it("Should create a voucher", async () => {
    jest.spyOn(voucherRepository, "getVoucherByCode").mockImplementationOnce(():any => {
      return null
    })
    
    jest.spyOn(voucherRepository, "createVoucher").mockImplementationOnce(():any => {
      return undefined
    })
    const {code, discount} = voucherFactory.createVoucher(100, 1)
    await voucherService.createVoucher(code, discount)

    expect(voucherRepository.createVoucher).toHaveBeenCalledTimes(1)
  })

  it("Should return an error when voucher code already exists", async()=>{
    jest.spyOn(voucherRepository, "getVoucherByCode").mockImplementationOnce(():any => {
      return 'oi eu existo'
    })
    
    jest.spyOn(voucherRepository, "createVoucher").mockImplementationOnce(():any => {
      return undefined
    })

    const {code, discount} = voucherFactory.createVoucher(100, 1)

    const promise = voucherService.createVoucher(code, discount)

    await expect(promise).rejects.toEqual({ type: "conflict", message: "Voucher already exist." }); 
  })

})

// describe("Apply voucher Test Suite", ()=>{
//   it()
// })
