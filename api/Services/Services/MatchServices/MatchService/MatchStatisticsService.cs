using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataContracts;
using DataContracts.MatchRepositories;
using DataEntities.Entities;
using DataEntities.Entities.Match;
using Infrastructure;
using ServiceContracts.Services.MatchServices.MatchService;
using ServiceContracts.Services.MatchServices.MatchService.Models.Statistics;
using ServiceContracts.Services.MatchServices.PlayerPointService.Models;

namespace Services.Services.MatchServices.MatchService
{
    public class MatchStatisticsService : IMatchStatisticsService
    {
        private readonly IMatchRepository matchRepository;
        private readonly IMapper _mapper;
        private readonly IPlayerRepository _playerRepository;
        private readonly IMatchPointRepository _matchPointRepository;
        private readonly IPlayerPointRepository _playerPointRepository;
        private readonly IMatchPlayerRepository _matchPlayerRepository;
        
        public MatchStatisticsService(
            IMatchRepository matchRepository,
            IMapper _mapper,
            IPlayerRepository playerRepository,
            IMatchPointRepository matchPointRepository,
            IPlayerPointRepository playerPointRepository,
            IMatchPlayerRepository matchPlayerRepository)
        {
            this.matchRepository = matchRepository;
            this._mapper = _mapper;
            _playerRepository = playerRepository;
            _matchPointRepository = matchPointRepository;
            _playerPointRepository = playerPointRepository;
            _matchPlayerRepository = matchPlayerRepository;
        }

        public async Task<T> GetStatistics<T>(int id) where T : IMatchStatisticsDomainModel, new()
        {
            var match = await matchRepository.GetByIdAsync(id);
            var teamAName = match.TeamAEntity.Name;
            var teamBName = match.TeamBEntity.Name;

            if (match == null)
            {
                throw new RulesException("Varžybos tokiu id neegzistuoja");
            }

            var matchPlayerPoints = from matchPoint in _matchPointRepository.GetAll()
                where matchPoint.MatchId == id
                group matchPoint by matchPoint.SetNumber
                into c
                select new MatchSetDomainModel
                {
                    SetNumber = c.Key,
                    APoints = c.Count(x => x.TeamId == match.TeamAId),
                    BPoints = c.Count(x => x.TeamId == match.TeamBId),
                    SetSteps = c.Select((x, index) => new MatchSetStepper()
                    {
                        PointNumber = index + 1,
                        TeamAction = $"Tašką laimėjo {(x.TeamId == match.TeamAId ? teamAName : teamBName)}",
                        PlayerActions = GeneratePointActionInfo(x)
                    })
                };

            var result = new T
            {
                Id = match.Id,
                Sets = matchPlayerPoints,
                MatchTeamA = FormTeamStatistics(match.TeamAEntity, id),
                MatchTeamB = FormTeamStatistics(match.TeamBEntity, id)
            };

            return result;
        }

        private IMatchTeamStatisticsDomainModel FormTeamStatistics(TeamEntity team, int matchId)
        {
            var playerPoints = from matchPoint in _matchPointRepository.GetAll()
                join playerPoint in _playerPointRepository.GetAll() on matchPoint.Id equals playerPoint.MatchPointId
                where matchPoint.MatchId == matchId
                select playerPoint;
            return new MatchTeamStatisticsDomainModel
            {
                Id = team.Id,
                Name = team.Name,
                PlayerStatistics = from player in _playerRepository.GetAll()
                    join matchPlayer in _matchPlayerRepository.GetAll().Where(x => x.MatchId == matchId) on player.Id equals matchPlayer.PlayerId into matchPlayers
                    from matchPlayer in matchPlayers.DefaultIfEmpty()
                    where player.TeamEntityId == team.Id
                    select new MatchPlayerStatisticDomainModel
                    {
                        PlayerName = player.Name,
                        Number = player.Number,
                        WasOnCourt = matchPlayer != null,
                        Aces = playerPoints.Count(x =>
                            x.PlayerId == player.Id && x.PointType == (int) ClsfPlayerPointType.Ace),
                        Points = playerPoints.Count(x =>
                            x.PlayerId == player.Id && x.PointType == (int) ClsfPlayerPointType.Point),
                        Assists = playerPoints.Count(x =>
                            x.PlayerId == player.Id && x.PointType == (int) ClsfPlayerPointType.Assist),
                        Blocks = playerPoints.Count(x =>
                            x.PlayerId == player.Id && x.PointType == (int) ClsfPlayerPointType.Block),
                        CardReds = playerPoints.Count(x =>
                            x.PlayerId == player.Id && x.PointType == (int) ClsfPlayerPointType.CardRed),
                        CardYellows = playerPoints.Count(x =>
                            x.PlayerId == player.Id && x.PointType == (int) ClsfPlayerPointType.CardYellow),
                        Turnovers = playerPoints.Count(x =>
                            x.PlayerId == player.Id && x.PointType == (int) ClsfPlayerPointType.Turnover),
                    }
            };
        }
        
        private IEnumerable<string> GeneratePointActionInfo(MatchPointEntity entity)
        {
            var query = (from playerPoint in _playerPointRepository.GetAll()
                join player in _playerRepository.GetAll() on playerPoint.PlayerId equals player.Id
                where playerPoint.MatchPointId == entity.Id
                select $"{player.Name} - {GetActionStringByPointType(playerPoint.PointType)}");
            return query;
        }

        private static string GetActionStringByPointType(int pointType)
        {
            switch (pointType)
            {
                case (int) ClsfPlayerPointType.Ace:
                    return "atlieka neatriamemą padavimą";
                case (int) ClsfPlayerPointType.Point:
                    return "pelno tašką";
                case (int) ClsfPlayerPointType.Block:
                    return "pastato bloką";
                case (int) ClsfPlayerPointType.Assist:
                    return "atlieka rezultatyvų pakėlimą";
                case (int) ClsfPlayerPointType.Turnover:
                    return "padaro klaidą";
                case (int) ClsfPlayerPointType.CardRed:
                    return "gauna raudoną kortelę";
                case (int) ClsfPlayerPointType.CardYellow:
                    return "gauna geltoną kortelę";
            }

            return "neatpažintas veiksmas";
        }

    }
}