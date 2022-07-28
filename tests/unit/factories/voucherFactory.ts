import {faker} from '@faker-js/faker'

function createVoucher(max: number, min: number) {
  const voucher = {
    code: faker.random.alphaNumeric(5),
    discount: Math.floor(Math.random() * ((max + 1) - min) + min)
  }
  return voucher
}

const voucherFactory = {
  createVoucher,
}

export default voucherFactory