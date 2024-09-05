type lineupData = {
  [key: number]: lineupPlayerData[];
};

type lineupPlayerData = {
  id: number;
  name: string;
  jerseyNumber: number;
  goalCount: number;
  isWarned: boolean;
  isBanned: boolean;
  substitution: boolean;
  position: string;
};

type korLineupType = {
  [key: number]: string;
};

type EventResponseType = {
  time: {
    elapsed: number;
    extra: number | null;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  player: {
    id: number;
    name: number;
  };
  assist: {
    id: number | null;
    name: number | null;
  };
  type: string;
  detail: string;
  comments: string | null;
};

export const makeComment = (
  homeId: number,
  awayId: number,
  homeFixtureLineup: lineupData,
  awayFixtureLineup: lineupData,
  homeTotalLineup: any,
  awayTotalLineup: any,
  korFixtureLineup: korLineupType,
  setFixtureHomeLineup: any,
  setFixtureAwayLineup: any,
  eventData: EventResponseType,
) => {
  let ReturnCommentData = {
    commentTitle: '',
    commentDetail: '',
    commentFlag: '',
  };

  switch (eventData.type) {
    case 'Var':
      ReturnCommentData = VAR(eventData.detail, eventData);
      break;
    case 'subst':
      ReturnCommentData = substitutionEvent(
        getIsHome(homeId, awayId, eventData),
        getPositionNumber(
          homeId,
          awayId,
          homeFixtureLineup,
          awayFixtureLineup,
          eventData.player.id,
          eventData,
        ),
        homeFixtureLineup,
        awayFixtureLineup,
        homeTotalLineup,
        awayTotalLineup,
        korFixtureLineup,
        setFixtureHomeLineup,
        setFixtureAwayLineup,
        eventData,
      );
      break;
    case 'Card':
      if (eventData.detail === 'Yellow Card')
        ReturnCommentData = yellowCard(
          getIsHome(homeId, awayId, eventData),
          getPositionNumber(
            homeId,
            awayId,
            homeFixtureLineup,
            awayFixtureLineup,
            eventData.player.id,
            eventData,
          ),
          homeFixtureLineup,
          awayFixtureLineup,
          korFixtureLineup,
          eventData,
        );
      else if (eventData.detail === 'Red card')
        ReturnCommentData = redCard(
          getIsHome(homeId, awayId, eventData),
          getPositionNumber(
            homeId,
            awayId,
            homeFixtureLineup,
            awayFixtureLineup,
            eventData.player.id,
            eventData,
          ),
          homeFixtureLineup,
          awayFixtureLineup,
          korFixtureLineup,
          eventData,
        );
      break;
    case 'Goal':
      ReturnCommentData = goalEvent(
        getIsHome(homeId, awayId, eventData),
        getPositionNumber(
          homeId,
          awayId,
          homeFixtureLineup,
          awayFixtureLineup,
          eventData.player.id,
          eventData,
        ),
        homeFixtureLineup,
        awayFixtureLineup,
        eventData.detail,
        korFixtureLineup,
        eventData,
      );
      break;
    default:
      break;
  }
  return ReturnCommentData;
};

const getIsHome = (
  homeId: number,
  awayId: number,
  eventData: EventResponseType,
) => {
  if (eventData.team.id === homeId) return true;
  else return false;
};

const getPositionNumber = (
  homeId: number,
  awayId: number,
  homeFixtureLineup: lineupData,
  awayFixtureLineup: lineupData,
  playerId: number,
  eventData: EventResponseType,
) => {
  if (eventData.detail === 'Own Goal') {
    if (eventData.team.id === homeId) {
      for (let i: number = 0; i < 11; i++) {
        if (awayFixtureLineup[i][0].id === playerId) return i;
      }
    } else {
      for (let i: number = 0; i < 11; i++) {
        if (homeFixtureLineup[i][0].id === playerId) return i;
      }
    }
  } else {
    if (eventData.team.id === homeId) {
      for (let i: number = 0; i < 11; i++) {
        if (homeFixtureLineup[i][0].id === playerId) return i;
      }
    } else {
      for (let i: number = 0; i < 11; i++) {
        if (awayFixtureLineup[i][0].id === playerId) return i;
      }
    }
  }
  return -1;
};

const goalEvent = (
  isHome: boolean,
  positionNumber: number,
  homeFixtureLineup: lineupData,
  awayFixtureLineup: lineupData,
  eventDetail: string,
  korFixtureLineup: korLineupType,
  eventData: EventResponseType,
) => {
  let commentTitle = '';
  let commentDetail = '';
  let commentFlag = '';
  switch (eventDetail) {
    case 'Normal Goal':
      if (isHome) {
        homeFixtureLineup[positionNumber][0].goalCount++;
        commentTitle = eventData.time.elapsed + '분 골!';
        commentDetail =
          korFixtureLineup[eventData.player.id] + '가 골을 기록합니다.';
        commentFlag = 'Home';
      } else {
        awayFixtureLineup[positionNumber][0].goalCount++;
        commentTitle = eventData.time.elapsed + '분 골!';
        commentDetail =
          korFixtureLineup[eventData.player.id] + '가 골을 기록합니다.';
        commentFlag = 'Away';
      }
      break;
    case 'Own Goal':
      if (isHome) {
        awayFixtureLineup[positionNumber][0].goalCount++;
        commentTitle = eventData.time.elapsed + '분 자책골';
        commentDetail =
          korFixtureLineup[eventData.player.id] + '가 자책골을 기록합니다.';
        commentFlag = 'Home';
      } else {
        homeFixtureLineup[positionNumber][0].goalCount++;
        commentTitle = eventData.time.elapsed + '분 자책골';
        commentDetail =
          korFixtureLineup[eventData.player.id] + '가 자책골을 기록합니다.';
        commentFlag = 'Away';
      }
      break;
    case 'Penalty':
      break;
    case 'Missed Penalty':
      break;
  }
  return {
    commentTitle: commentTitle,
    commentDetail: commentDetail,
    commentFlag: commentFlag,
  };
};
const yellowCard = (
  isHome: boolean,
  positionNumber: number,
  homeFixtureLineup: lineupData,
  awayFixtureLineup: lineupData,
  korFixtureLineup: korLineupType,
  eventData: EventResponseType,
) => {
  let commentTitle = '';
  let commentDetail = '';
  let commentFlag = '';
  if (isHome) {
    homeFixtureLineup[positionNumber][0].isWarned = true;
    commentTitle = eventData.time.elapsed + '분 경고';
    commentDetail =
      korFixtureLineup[eventData.player.id] + '가 옐로우카드를 받습니다.';
    commentFlag = 'Home';
  } else {
    awayFixtureLineup[positionNumber][0].isWarned = true;
    commentTitle = eventData.time.elapsed + '분 경고';
    commentDetail =
      korFixtureLineup[eventData.player.id] + '가 옐로우카드를 받습니다.';
    commentFlag = 'Away';
  }
  return {
    commentTitle: commentTitle,
    commentDetail: commentDetail,
    commentFlag: commentFlag,
  };
};
const redCard = (
  isHome: boolean,
  positionNumber: number,
  homeFixtureLineup: lineupData,
  awayFixtureLineup: lineupData,
  korFixtureLineup: korLineupType,
  eventData: EventResponseType,
) => {
  let commentTitle = '';
  let commentDetail = '';
  let commentFlag = '';
  if (isHome) {
    homeFixtureLineup[positionNumber][0].isBanned = true;
    commentTitle = eventData.time.elapsed + '분 퇴장';
    commentDetail =
      korFixtureLineup[eventData.player.id] + '가 레드카드를 받습니다.';
    commentFlag = 'Home';
  } else {
    awayFixtureLineup[positionNumber][0].isBanned = true;
    commentTitle = eventData.time.elapsed + '분 퇴장';
    commentDetail =
      korFixtureLineup[eventData.player.id] + '가 레드카드를 받습니다.';
    commentFlag = 'Away';
  }

  return {
    commentTitle: commentTitle,
    commentDetail: commentDetail,
    commentFlag: commentFlag,
  };
};
const substitutionEvent = (
  isHome: boolean,
  positionNumber: number,
  homeFixtureLineup: lineupData,
  awayFixtureLineup: lineupData,
  homeTotalLineup: any,
  awayTotalLineup: any,
  korFixtureLineup: korLineupType,
  setFixtureHomeLineup: any,
  setFixtureAwayLineup: any,
  eventData: EventResponseType,
) => {
  let newPlayer: lineupPlayerData;
  let commentTitle = '';
  let commentDetail = '';
  let commentFlag = '';
  console.log(eventData);
  if (isHome) {
    let newJerseyNumber;
    let newPosition;
    for (let i = 0; i < homeTotalLineup.length; i++) {
      if (homeTotalLineup[i].player.id === eventData.assist.id) {
        newJerseyNumber = homeTotalLineup[i].player.number;
        newPosition = homeTotalLineup[i].player.pos;
        break;
      }
    }
    console.log(eventData.assist);
    if (eventData.assist.id !== null) {
      newPlayer = {
        id: eventData.assist.id,
        name: korFixtureLineup[eventData.assist.id],
        jerseyNumber: newJerseyNumber,
        goalCount: 0,
        isWarned: false,
        isBanned: false,
        substitution: true,
        position: newPosition,
      };
      setFixtureHomeLineup({
        ...homeFixtureLineup,
        [positionNumber]: [newPlayer, ...homeFixtureLineup[positionNumber]],
      });
      commentTitle = eventData.time.elapsed + '분 선수교체';
      commentDetail =
        '[' +
        korFixtureLineup[eventData.player.id] +
        ']' +
        ' 나가고' +
        '[' +
        korFixtureLineup[eventData.assist.id] +
        ']' +
        ' 들어갑니다.';
      commentFlag = 'Home';
    }
  } else {
    let newJerseyNumber;
    let newPosition;
    for (let i = 0; i < awayTotalLineup.length; i++) {
      if (awayTotalLineup[i].player.id === eventData.assist.id) {
        newJerseyNumber = awayTotalLineup[i].player.number;
        newPosition = awayTotalLineup[i].player.pos;
        break;
      }
    }
    console.log(eventData.assist);
    if (eventData.assist.id !== null) {
      newPlayer = {
        id: eventData.assist.id,
        name: korFixtureLineup[eventData.assist.id],
        jerseyNumber: newJerseyNumber,
        goalCount: 0,
        isWarned: false,
        isBanned: false,
        substitution: true,
        position: newPosition,
      };
      setFixtureAwayLineup({
        ...awayFixtureLineup,
        [positionNumber]: [newPlayer, ...awayFixtureLineup[positionNumber]],
      });
      commentTitle = eventData.time.elapsed + '분 선수교체';
      commentDetail =
        '[' +
        korFixtureLineup[eventData.player.id] +
        ']' +
        ' 나가고' +
        '[' +
        korFixtureLineup[eventData.assist.id] +
        ']' +
        ' 들어갑니다.';
      commentFlag = 'Away';
    }
  }
  return {
    commentTitle: commentTitle,
    commentDetail: commentDetail,
    commentFlag: commentFlag,
  };
};
const VAR = (eventDetail: string, eventData: EventResponseType) => {
  let commentTitle = '';
  let commentDetail = '';
  let commentFlag = '';

  switch (eventDetail) {
    case 'Goal cancelled':
      commentTitle = eventData.time.elapsed + '분 VAR 결과';
      commentDetail = 'VAR 판독 결과 골 취소됩니다.';
      commentFlag = 'None';
      break;
    case 'Penalty confirmed':
      commentTitle = eventData.time.elapsed + '분 패널티킥';
      commentDetail = '패널티킥이 선언되었습니다.';
      commentFlag = 'None';
      break;
  }
  return {
    commentTitle: commentTitle,
    commentDetail: commentDetail,
    commentFlag: commentFlag,
  };
};
