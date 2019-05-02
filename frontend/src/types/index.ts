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
    Role: string;
}

export interface Error {
    [key: string]: string[];
}

export interface ProblemDetails {
    Type: string;
    Title: string;
    Status: Number | null;
    Detail: string;
    Instance: string;
    Errors: Error;
}


export interface PlayerModel {
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
    secretary: UserInfoModel;
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
    secretaryId: number;
    teamAId: number;
    teamBId: number;
}

export interface MatchPointsSummaryModel {
    setNumber: number;
    teamAPoints: number;
    teamBPoints: number;
    teamASetPoints: number;
    teamBSetPoints: number;
    points: MatchPointModel[];
}

// match end