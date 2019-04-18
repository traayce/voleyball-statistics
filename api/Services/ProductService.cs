using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataContracts;
using DataContracts.Base;
using DataEntities.Entities;
using ServiceContracts;
using ServiceContracts.Models.Product;

namespace Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository productRepository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;

        public ProductService(
            IProductRepository productRepository,
            IUnitOfWork unitOfWork,
            IMapper _mapper)
        {
            this.productRepository = productRepository;
            this.unitOfWork = unitOfWork;
            this._mapper = _mapper;
        }

        public IEnumerable<T> GetAll<T>(string name) where T : class, IProductDomainModel, new()
        {
            bool query = string.IsNullOrEmpty(name);
            var list = productRepository.GetAllMatching(x => query || x.Name.StartsWith(name)).Select(x =>
                new T
                {
                    Id = x.Id,
                    Price = x.Price,
                    Code = x.Code,
                    Name = x.Name,
                    Photo = x.Photo
                });

            return list;
        }

        public ProductDomainModel Create(ProductDomainModel model)
        {
            var entity = _mapper.Map<ProductEntity>(model);
            entity = productRepository.Add(entity);
            unitOfWork.CommitChanges();

            return _mapper.Map(entity, model);
        }


        public async Task<ProductDomainModel> GetById(int id)
        {
            var entity = await productRepository.GetByIdAsync(id);
            if (entity == null) return null;

            return _mapper.Map<ProductDomainModel>(entity);
        }

        public async Task<ProductDomainModel> Delete(int id)
        {
            var entity = await productRepository.GetByIdAsync(id);
            if (entity == null) return null;

            productRepository.Delete(entity);
            unitOfWork.CommitChanges();
            return _mapper.Map<ProductDomainModel>(entity);
        }

        public async Task<ProductDomainModel> Edit(int id, ProductDomainModel model)
        {
            var entity = await productRepository.GetByIdAsync(id);
            if (entity == null) return null;

            _mapper.Map(model, entity);
            productRepository.Edit(entity);
            unitOfWork.CommitChanges();
            return _mapper.Map(entity, model);
        }

        public bool IsCodeValid(string code, int id = 0)
        {
            if (String.IsNullOrEmpty(code)) return false;
            var entity = productRepository.GetAllMatching(x => x.Code == code).SingleOrDefault();
            return !(entity != null && entity.Id != id);
        }
    }
}