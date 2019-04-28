using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataContracts.Base;
using DataContracts.MatchRepositories;
using DataEntities.Entities.Match;
using Infrastructure;
using ServiceContracts.Services.MatchServices.MatchService;
using ServiceContracts.Services.MatchServices.MatchService.Models;

namespace Services.Services.MatchServices.MatchService
{
    public class MatchService : IMatchService
    {
        private readonly IMatchRepository matchRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        
        public MatchService(
            IMatchRepository matchRepository,
            IUnitOfWork _unitOfWork,
            IMapper _mapper)
        {
            this.matchRepository = matchRepository;
            this._unitOfWork = _unitOfWork;
            this._mapper = _mapper;
        }
        
        public async Task<T> Get<T>(int matchId) where T: IMatchDomainModel, new()
        {
            var match = await matchRepository.GetByIdAsync(matchId);

            if (match == null)
                throw new RulesException("Komanda tokiu Id neegzistuoja");
            var model = _mapper.Map(match, new T());
            return model;
        }
        
        public IEnumerable<T> GetByIds<T>(int[] matchIds) where T: IMatchDomainModel, new()
        {
            var matches = matchRepository.GetAllMatching(x => matchIds.Contains(x.Id)).Select(match => _mapper.Map(match, new T()));

            if (!matches.Any())
                throw new RulesException("Nurodytais ID komandos neegzistuoja.");

            return matches;
        }
        
        public async Task<T> Save<T>(IMatchCreateDomainModel model) where T: IMatchDomainModel, new()
        {
            var entity = new MatchEntity();
            if (model.Id != 0)
                entity = await matchRepository.GetByIdAsync(model.Id);

            Mapper.Map(model, entity);
            matchRepository.Add(entity);
            _unitOfWork.CommitChanges();
            var response = await Get<T>(entity.Id);
            return response;
        }
        
        public IEnumerable<T> GetList<T>() where T: IMatchDomainModel, new()
        {
            var matches = matchRepository.GetAllAsync().Result.Select(match => _mapper.Map(match, new T()));

            return matches;
        }
    }
}