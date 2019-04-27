using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataContracts.Base;
using DataContracts.MatchRepositories;
using DataEntities.Entities.Match;
using Infrastructure;
using ServiceContracts.Services.MatchServices.PlayerPointService;
using ServiceContracts.Services.MatchServices.PlayerPointService.Models;

namespace Services.Services.MatchServices.PlayerPointService
{
    public class PlayerPointService : IPlayerPointService
    {
        private readonly IPlayerPointRepository _playerPointRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        
        public PlayerPointService(
            IPlayerPointRepository playerPointRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _playerPointRepository = playerPointRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        
        public async Task<T> Get<T>(int playerPointId) where T: IPlayerPointDomainModel, new()
        {
            var playerPoint = await _playerPointRepository.GetByIdAsync(playerPointId);

            if (playerPoint == null)
                throw new RulesException("Taškas tokiu Id neegzistuoja");
            var model = _mapper.Map(playerPoint, new T());
            return model;
        }
        
        public IEnumerable<T> GetByIds<T>(int[] playerPointIds) where T: IPlayerPointDomainModel, new()
        {
            var playerPointes = _playerPointRepository.GetAllMatching(x => playerPointIds.Contains(x.Id)).Select(playerPoint => _mapper.Map(playerPoint, new T()));

            if (!playerPointes.Any())
                throw new RulesException("Nurodytais ID taškai neegzistuoja.");

            return playerPointes;
        }
        
        public async Task<T> Save<T>(IPlayerPointCreateDomainModel model) where T: IPlayerPointDomainModel, new()
        {
            var entity = new PlayerPointEntity();
            if (model.Id != 0)
                entity = await _playerPointRepository.GetByIdAsync(model.Id);

            Mapper.Map(model, entity);
            _playerPointRepository.Add(entity);
            _unitOfWork.CommitChanges();
            var response = await Get<T>(entity.Id);
            return response;
        }
    }
}