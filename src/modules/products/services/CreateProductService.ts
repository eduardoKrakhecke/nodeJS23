import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from "@shared/errors/AppError";
import Product from "@modules/products/typeorm/entities/Product";

interface IRequest {
  name: string
  price: number
  quantity: number
}

class CreateProductService {
  public async execute({ name, price, quantity }:IRequest): Promise<Product> {

    const productRepositoty = getCustomRepository(ProductsRepository)
    const productExists = productRepositoty.findByName(name)
    if(productExists) {
      throw new AppError('Já existe um produto com este nome', 400)
    }

    const product = productRepositoty.create({
      name,
      price,
      quantity
    })

    await productRepositoty.save(product)
    return product

  }
}

export default CreateProductService
