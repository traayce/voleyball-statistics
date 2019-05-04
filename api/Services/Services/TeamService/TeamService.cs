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
using ServiceContracts.Services.UserService.Models;

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
        
        public async Task<IEnumerable<T>> GetAll<T>() where T: ITeamDomainModel, new()
        {
            var teams = await teamRepository.GetAllAsync();
            return teams.Select(team => 
                new T
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
                });
        }
        
        public IEnumerable<T> GetByIds<T>(int[] teamIds) where T: ITeamDomainModel, new()
        {
            if (teamIds.Length == 0)
            {
                return GetAll<T>().Result;
            }
            
            var teams = teamRepository.GetAllMatching(x => teamIds.Contains(x.Id)).Select(team => 
                new T
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
                });

            if (!teams.Any())
                throw new RulesException("Nurodytais ID komandos neegzistuoja.");

            return teams;
        }

        public static ITeamDomainModel FormModel(TeamEntity entity)
        {
            return new TeamDomainModel()
            {
                Id = entity.Id,
                Name = entity.Name,
                City = entity.City,
                Players = entity.Players?.Select(x => new PlayerDomainModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Number = x.Number,
                    TeamId = entity.Id
                })
            };
        }
        
        public async Task<T> Save<T>(ITeamCreateDomainModel model) where T: ITeamDomainModel, new()
        {
            var entity = new TeamEntity();
            if (model.Id != 0)
                entity = await teamRepository.GetByIdAsync(model.Id);

            Mapper.Map(model, entity);
            if (entity.Id != 0)
            {
                teamRepository.Edit(entity);
            }
            else
            {
                teamRepository.Add(entity);
            }
            _unitOfWork.CommitChanges();
            var response = await Get<T>(entity.Id);
            return response;
        }
        
        public async Task<T> GetCreateModel<T>(int id) where T: ITeamCreateDomainModel, new()
        {
            var match = await teamRepository.GetByIdAsync(id);

            if (match == null)
                throw new RulesException("Komanda tokiu Id neegzistuoja");
            var model = _mapper.Map(match, new T());
            return model;
        }
    }
}