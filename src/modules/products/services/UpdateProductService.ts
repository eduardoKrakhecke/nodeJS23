import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import Product from '@modules/products/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string
  name: string
  price: number
  quantity: number
}

class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {

    const productRepositoty = getCustomRepository(ProductsRepository)
    const product = await productRepositoty.findOne(id)

    if(!product) {
      throw new AppError('Produto não encontrado', 400)
    }

    const productExists = productRepositoty.findByName(name)

    if(productExists && name !== product.name) {
      throw new AppError('Já existe um produto com este nome', 400)
    }

    product.name = name
    product.price = price
    product.quantity = quantity

    await productRepositoty.save(product)

    return product

  }
}

export default UpdateProductService
