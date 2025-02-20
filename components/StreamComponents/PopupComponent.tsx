import { useEffect, useRef, useState } from 'react';
import { ChzzkChat } from 'chzzk';
import 'animate.css';
import useInterval from '@/hooks/intervalHook';

type ViewerType = {
  userIdHash: string;
  badges: string[];
  nickname: string;
  subscribe: boolean;
  vote: string;
};

const PopupComponent = () => {
  const isSocketLoaded = useRef(false);
  const socketClient = useRef<any>(null);
  const [popupState, setPopupState] = useState(false);
  const [pollState, setPollState] = useState(false);
  const [users, setUsers] = useState<Array<ViewerType>>([]);

  const updateList = (list: Array<ViewerType>, newUser: ViewerType) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].userIdHash === newUser.userIdHash) {
        list[i].vote = newUser.vote;
        return Array.from(list);
      }
    }
    return Array.from([...list, newUser]);
  };

  const openSocket = async () => {
    const options = {
      channelId: 'eaf7b569c9992d0e57db0059eb5c0eeb',
      pollInterval: 30 * 1000,
      baseUrls: {
        chzzkBaseUrl: '/api/proxy/chzzkBase',
        gameBaseUrl: '/api/proxy/gameBase',
      },
    };

    const client = new ChzzkChat(options);
    client.on('connect', () => {
      console.log('Connected');
      // 최근 50개의 채팅 및 고정 메시지를 요청 (선택사항, 도네 및 시스템 메시지 포함이므로 주의)
      // client.requestRecentChat(50);
    });
    client.on('reconnect', (newChatChannelId) => {
      console.log(`Reconnected to ${newChatChannelId}`);
    });
    client.on('chat', (chat) => {
      const message = chat.hidden ? '[블라인드 처리 됨]' : chat.message;
      const profile = chat.profile;
      if (
        message === '!투표1' ||
        message === '!투표2' ||
        message === '!투표 1' ||
        message === '!투표 2'
      ) {
        let thisUser: ViewerType = {
          userIdHash: profile.userIdHash,
          badges: [],
          nickname: profile.nickname,
          subscribe: profile.streamingProperty.subscription ? true : false,
          vote: message,
        };
        if (profile.badge) {
          thisUser.badges.push(profile.badge.imageUrl);
        }

        if (profile.streamingProperty.subscription) {
          thisUser.badges.push(
            profile.streamingProperty.subscription.badge.imageUrl,
          );
        }

        for (let e of profile.activityBadges) {
          thisUser.badges.push(e.imageUrl);
        }
        setUsers((prevUsers) => updateList(prevUsers, thisUser));
      }
      // console.log(`${chat.profile.nickname}: ${message}`);
    });

    await client.connect();
    socketClient.current = client;
  };

  useEffect(() => {
    // handleConnect();
  }, []);

  const handleConnect = () => {
    if (!isSocketLoaded.current) {
      openSocket();
      isSocketLoaded.current = true;
    }
  };

  const handleDisconnect = () => {
    if (socketClient.current) {
      socketClient.current.disconnect();
      isSocketLoaded.current = false;
      console.log('Disconnected');
    }
  };

  useInterval(() => {
    setPopupState(true);
    setPollState(true);
    setTimeout(() => {
      setPollState(false);
      // 투표진행 후 결과 표시
    }, 60 * 1000);
    setTimeout(() => {
      setPopupState(false);
      setUsers([]);
    }, 90 * 1000);
  }, 10 * 60 * 1000000);

  return (
    <div className="flex w-1/4 h-full items-center p-4">
      {popupState ? (
        <div
          id="PopupComponent"
          className="flex flex-col justify-center w-full h-full bg-white border-8 rounded-3xl border-black animate__animated animate__zoomIn"
        >
          {pollState ? (
            <>
              <div className="flex w-full text-xl justify-center items-center">
                이기고 있는 팀은 어디로 보시나요?
              </div>
              <div className="flex w-full text-xl justify-center items-center">
                <span className="flex w-full justify-center text-center">
                  홈: !투표1
                </span>
                <span className="flex w-full justify-center text-center">
                  어웨이: !투표2
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex w-full text-xl justify-center items-center">
                이기고 있는 팀은 어디로 보시나요?
              </div>
              <div className="flex w-full text-xl justify-center items-center">
                {'홈 ' +
                  users.filter((user: ViewerType) => {
                    return user.vote === '!투표1' || user.vote === '!투표 1';
                  }).length +
                  ' 어웨이 ' +
                  users.filter((user: ViewerType) => {
                    return user.vote === '!투표2' || user.vote === '!투표 2';
                  }).length}
              </div>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PopupComponent;
