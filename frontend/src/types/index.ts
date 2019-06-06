export interface UserModel {
    token: string;
    name: string;
}

export interface RegistrationModel {
    name: string;
    password: string;
    email: string;
}

export interface UserInfoModel {
    id: number;
    name: string;
    email: string;
    role: RolesEnum;
}

export const enum RolesEnum {
    User = "User",
    Secretary = "Secretary",
    Admin = "Admin",
};

export interface SystemError {
    [key: string]: string[];
}

export interface ProblemDetails {
    Type: string;
    Title: string;
    Status: Number | null;
    Detail: string;
    Instance: string;
    Errors: SystemError;
}


export interface PlayerModel {
    id: number;
    name: string;
    number: number;
    teamId: number;
}

export interface PlayerCreateModel {
    id: number;
    name: string;
    number: number;
    teamId: number;
}

export interface TeamModel {
    id: number;
    name: string;
    city: string;
    players: PlayerModel[];
}

export interface TeamCreateModel {
    id: number;
    name: string;
    city: string;
}

// match
export interface MatchPlayerModel {
    id: number;
    isOnCourt: boolean;
    player: PlayerModel;
    matchId: number;
    teamId: number;
}

export interface MatchPlayerCreateModel {
    id: number;
    isOnCourt: boolean;
    playerId: number;
    matchId: number;
    teamId: number;
}

export interface MatchPointModel {
    id: number;
    setNumber: number;
    isSetPoint: boolean;
    isMatchPoint: boolean;
    matchId: number;
    teamId: number;
}

export type MatchPointCreateModel = MatchPointModel;

export declare enum ClsfPlayerPointType {
    Point = 1,
    Block = 2,
    Assist = 3,
    Turnover = 4,
    Ace = 5,
    CardYellow = 6,
    CardRed = 7
}

export interface PlayerPointModel {
    id: number;
    pointType: ClsfPlayerPointType;
    matchPointId: number;
    playerId: number;
}

export type PlayerPointCreateModel = PlayerPointModel;

export interface MatchModel {
    id: number;
    startsAt: Date;
    location: string;
    isStarted: boolean;
    isFinished: boolean;
    teamA: TeamModel;
    teamB: TeamModel;
    matchPlayers: MatchPlayerModel[];
    pointsSummary: MatchPointsSummaryModel;
}

export interface MatchCreateModel {
    id: number;
    startsAt: Date;
    location: string;
    isStarted: boolean;
    isFinished: boolean;
    teamAId: number;
    teamBId: number;
}

export interface MatchPointsSummaryModel {
    setNumber: number;
    teamAPoints: number;
    teamBPoints: number;
    teamASetPoints: number;
    teamBSetPoints: number;
    lastPoint: MatchPointModel | null;
    points: MatchPointModel[];
}

// match end

// statistics
export interface MatchStatisticsModel {
    id: number;
    matchTeamA: MatchTeamStatisticsModel;
    matchTeamB: MatchTeamStatisticsModel;
    sets: MatchSetStatisticsModel[];
}

export interface MatchTeamStatisticsModel {
    id: number;
    name: string;
    playerStatistics: MatchPlayerStatisticsModel[];
}

export interface MatchPlayerStatisticsModel {
    playerName: string;
    number: number;
    points: number;
    blocks: number;
    assists: number;
    turnovers: number;
    aces: number;
    cardYellows: number;
    cardReds: number;
    wasOnCourt: boolean;
}

export interface MatchSetStatisticsModel {
    setNumber: number;
    aPoints: number;
    bPoints: number;
    setSteps: MatchSetStepperModel[];
}

export interface MatchSetStepperModel {
    setScore: string;
    teamAction: string;
    playerActions: string[];
}
// match
export interface UserLoginModel {
    username: string;
    password: string;
}

export interface UserCreateModel {
    name: string;
    password: string;
    email: string;
}