using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DataContracts;
using DataContracts.Base;
using DataEntities.Entities;
using Infrastructure;
using Microsoft.IdentityModel.Tokens;
using ServiceContracts.Services.PlayerService.Models;
using ServiceContracts.Services.TeamService;
using ServiceContracts.Services.TeamService.Models;

namespace Services.Services.TeamService
{
    public class TeamService : ITeamService
    {
        private readonly ITeamRepository teamRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        
        public TeamService(
            ITeamRepository teamRepository,
            IUnitOfWork _unitOfWork,
            IMapper _mapper)
        {
            this.teamRepository = teamRepository;
            this._unitOfWork = _unitOfWork;
            this._mapper = _mapper;
        }
        
        public async Task<T> Get<T>(int teamId) where T: ITeamDomainModel, new()
        {
            var team = await teamRepository.GetByIdAsync(teamId);

            if (team == null)
                throw new RulesException("Komanda tokiu Id neegzistuoja");

            return new T
            {
                Id = team.Id,
                Name = team.Name,
                City = team.City,
                Players = team.Players?.Select(x => new PlayerDomainModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Number = x.Number,
                    TeamId = team.Id
                })
            };
        }
        
        public IEnumerable<T> GetByIds<T>(int[] teamIds) where T: ITeamDomainModel, new()
        {
            var teams = teamRepository.GetAllMatching(x => teamIds.Contains(x.Id)).Select(team => 
                new T
                {
                    Name = team.Name,
                    City = team.City,
                    Players = team.Players?.Select(x => new PlayerDomainModel()
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Number = x.Number,
                        TeamId = team.Id
                    })
                });

            if (!teams.Any())
                throw new RulesException("Nurodytais ID komandos neegzistuoja.");

            return teams;
        }
        
        public async Task<T> Save<T>(ITeamCreateDomainModel model) where T: ITeamDomainModel, new()
        {
            var entity = new TeamEntity();
            if (model.Id != 0)
                entity = await teamRepository.GetByIdAsync(model.Id);

            Mapper.Map(model, entity);
            teamRepository.Add(entity);
            _unitOfWork.CommitChanges();
            var response = await Get<T>(entity.Id);
            return response;
        }
    }
}