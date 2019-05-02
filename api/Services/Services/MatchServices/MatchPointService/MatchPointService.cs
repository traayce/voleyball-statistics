using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataContracts.Base;
using DataContracts.MatchRepositories;
using DataEntities.Entities.Match;
using Infrastructure;
using ServiceContracts.Services.MatchServices.MatchPointService;
using ServiceContracts.Services.MatchServices.MatchPointService.Models;

namespace Services.Services.MatchServices.MatchPointService
{
    public class MatchPointService : IMatchPointService
    {
        private readonly IMatchPointRepository _matchPointRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MatchPointService(
            IMatchPointRepository matchPointRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _matchPointRepository = matchPointRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<T> Get<T>(int matchPointId) where T : IMatchPointDomainModel, new()
        {
            var matchPoint = await _matchPointRepository.GetByIdAsync(matchPointId);

            if (matchPoint == null)
                throw new RulesException("Taškas tokiu Id neegzistuoja");
            var model = _mapper.Map(matchPoint, new T());
            return model;
        }

        public IEnumerable<T> GetByIds<T>(int[] matchPointIds) where T : IMatchPointDomainModel, new()
        {
            var matchPoints = _matchPointRepository.GetAllMatching(x => matchPointIds.Contains(x.Id))
                .Select(matchPoint => _mapper.Map(matchPoint, new T()));

            if (!matchPoints.Any())
                throw new RulesException("Nurodytais ID taškai neegzistuoja.");

            return matchPoints;
        }

        public async Task<T> Save<T>(IMatchPointCreateDomainModel model) where T : IMatchPointDomainModel, new()
        {
            var entity = new MatchPointEntity();
            if (model.Id != 0)
                entity = await _matchPointRepository.GetByIdAsync(model.Id);

            _mapper.Map(model, entity);
            _matchPointRepository.Add(entity);
            _unitOfWork.CommitChanges();
            var response = await Get<T>(entity.Id);
            return response;
        }

        public static IMatchPointsSummaryDomainModel FormModel(ICollection<MatchPointEntity> entities, int teamAId,
            int teamBId)
        {
            var setNumber = entities.Count(x => x.IsSetPoint);
            return new MatchPointsSummaryDomainModel
            {
                SetNumber = setNumber,
                TeamAPoints = entities.Count(x => x.TeamId == teamAId && x.SetNumber == setNumber),
                TeamBPoints = entities.Count(x => x.TeamId == teamBId && x.SetNumber == setNumber),
                TeamASetPoints = entities.Count(x => x.IsSetPoint && x.TeamId == teamAId),
                TeamBSetPoints = entities.Count(x => x.IsSetPoint && x.TeamId == teamBId),
                Points = entities.Select(x => Mapper.Map(x, new MatchPointDomainModel()))
            };
        }
    }
}