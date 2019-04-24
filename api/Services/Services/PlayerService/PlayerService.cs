using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataContracts;
using DataContracts.Base;
using DataEntities.Entities;
using Infrastructure;
using ServiceContracts.Services.PlayerService.Models;
using ServiceContracts.Services.PlayerService;

namespace Services.Services.PlayerService
{
    public class PlayerService : IPlayerService
    {
        private readonly IPlayerRepository PlayerRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        
        public PlayerService(
            IPlayerRepository PlayerRepository,
            IUnitOfWork _unitOfWork,
            IMapper _mapper)
        {
            this.PlayerRepository = PlayerRepository;
            this._unitOfWork = _unitOfWork;
            this._mapper = _mapper;
        }
        
        public async Task<T> Get<T>(int playerId) where T: IPlayerDomainModel, new()
        {
            var player = await PlayerRepository.GetByIdAsync(playerId);

            if (player == null)
                throw new RulesException("Žaidėjas tokiu Id neegzistuoja");

            return new T
            {
                Name = player.Name,
                Number = player.Number,
                TeamId = player.TeamEntityId
            };
        }
        
        public IEnumerable<T> GetByIds<T>(int[] playerIds) where T: IPlayerDomainModel, new()
        {
            var players = PlayerRepository.GetAllMatching(x => playerIds.Contains(x.Id)).Select(player => 
                new T
                {
                    Name = player.Name,
                    Number = player.Number,
                    TeamId = player.TeamEntityId
                });

            if (!players.Any())
                throw new RulesException("Nurodytais ID žaidėjai neegzistuoja.");

            return players;
        }
        
        public async Task<T> Save<T>(IPlayerCreateDomainModel model) where T: IPlayerDomainModel, new()
        {
            var entity = new PlayerEntity();
            if (model.Id != 0)
                entity = await PlayerRepository.GetByIdAsync(model.Id);

            _mapper.Map(model, entity);
            await _unitOfWork.CommitChangesAsync();
            var response = await Get<T>(entity.Id);
            return response;
        }
    }
}