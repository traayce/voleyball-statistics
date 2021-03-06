using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataContracts.Base;
using DataContracts.Repositories.MatchRepositories;
using DataEntities.Entities.Match;
using Infrastructure;
using ServiceContracts.Services.MatchServices.MatchPlayerService;
using ServiceContracts.Services.MatchServices.MatchPlayerService.Models;

namespace Services.Services.MatchServices.MatchPlayerService
{
    public class MatchPlayerService : IMatchPlayerService
    {
        private readonly IMatchPlayerRepository _matchPlayerRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        
        public MatchPlayerService(
            IMatchPlayerRepository matchPlayerRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _matchPlayerRepository = matchPlayerRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        
        public async Task<T> Get<T>(int matchPlayerId) where T: IMatchPlayerDomainModel, new()
        {
            var matchPlayer = await _matchPlayerRepository.GetByIdAsync(matchPlayerId);

            if (matchPlayer == null)
                throw new RulesException("Taškas tokiu Id neegzistuoja");
            var model = _mapper.Map(matchPlayer, new T());
            return model;
        }
        
        public IEnumerable<T> GetByIds<T>(int[] matchPlayerIds) where T: IMatchPlayerDomainModel, new()
        {
            var matchPlayeres = _matchPlayerRepository.GetAllMatching(x => matchPlayerIds.Contains(x.Id)).Select(matchPlayer => _mapper.Map(matchPlayer, new T()));

            if (!matchPlayeres.Any())
                throw new RulesException("Nurodytais ID taškai neegzistuoja.");

            return matchPlayeres;
        }
        
        public async Task<T> Save<T>(IMatchPlayerCreateDomainModel model) where T: IMatchPlayerDomainModel, new()
        {
            var entity = new MatchPlayerEntity();
            if (model.Id != 0)
                entity = await _matchPlayerRepository.GetByIdAsync(model.Id);

            Mapper.Map(model, entity);
            if (entity.Id != 0)
            {
                _matchPlayerRepository.Edit(entity);
            }
            else
            {
                _matchPlayerRepository.Add(entity);
            }
            _unitOfWork.CommitChanges();
            var response = await Get<T>(entity.Id);
            return response;
        }
        
        public static IEnumerable<IMatchPlayerDomainModel> FormModel(ICollection<MatchPlayerEntity> entity)
        {
            return entity.Select(x => Mapper.Map(x, new MatchPlayerDomainModel()));
        }
        
        public async Task<T> GetCreateModel<T>(int id) where T: IMatchPlayerCreateDomainModel, new()
        {
            var matchPlayerEntity = await _matchPlayerRepository.GetByIdAsync(id);

            if (matchPlayerEntity == null)
                throw new RulesException("Varžybų žaidėjas tokiu Id neegzistuoja");
            var model = _mapper.Map(matchPlayerEntity, new T());
            return model;
        }
    }
}