import asyncHandler from "express-async-handler";
import Brand from "../models/brandModel";
import express from "express";




const getBrandByUserId = asyncHandler(async (request: express.Request, response: express.Response) => {
    let query = {userId: request.params.id}
    const brand = await Brand.find(query)

    if (brand) {
        response.json(brand);
    } else {
        response.status(404);
        throw new Error('Product not found');
    }
});

const registerBrand = asyncHandler(async (request: express.Request, response: express.Response) => {
    const {brandName, userId, cnpj, products} = request.body;
    const brandExist = await Brand.findOne({brandName});
    if (!brandName || !userId || !cnpj || !products) {
        response.status(422)
        throw new Error("Missing input");
     }

     if (brandName.length > 100) {
        response.status(422)
        throw new Error("Invalid name");
     }

     if (cnpj > 99999999999999) {
        response.status(422)
        throw new Error("Invalid cnpj");
     }

    if (brandExist) {
        response.status(400);
        throw new Error('Brand already exists');
    }

    const brand = await Brand.create({
        brandName,
        userId,
        cnpj,
        products,
    });

    if(brand) {
        response.status(201).json({
            brandName: brand.brandName,
            userId: brand.userId,
            cnpj: brand.cnpj,
            products: brand.products
        });
    } else {
        response.status(400);
        throw new Error('Invalid brand data');
    }
});

const deleteBrand = asyncHandler(async (request: express.Request, response: express.Response) => {
    
    const brand = await Brand.findById(request.params.id)
    if (brand) {
      await brand.remove()
      response.json({ message: 'Brand removed' })
    } else {
      response.status(404)
      throw new Error('Brand not found')
    }
  })
  const updateBrand = asyncHandler(async (request: express.Request, response: express.Response) => {
    const brand = await Brand.findById(request.params.id)

    if(brand) {
        brand.brandName = request?.body?.brandName || brand.brandName;
        brand.cnpj = request?.body?.cnpj || brand.cnpj;
        if (request.body.cnpj > 99999999999999) {
            response.status(422)
            throw new Error("Invalid cnpj");
         }

       

        const upBrand = await brand.save();

        return response.json({
            brandName: upBrand.brandName,
            cnpj: upBrand.cnpj,
            products: upBrand.products
        });
    }

    response.status(404);
    throw new Error('User not found');
});

export {
      getBrandByUserId,
      registerBrand,
      deleteBrand,
      updateBrand
}