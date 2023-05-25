import {
  REALTIME_SUBSCRIBE_STATES,
  RealtimePresenceState,
} from "@supabase/supabase-js";
import { useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SupabaseContext from "./SupabaseContext";

export type PresencePayload = {
  username: string;
  color: string;
  onlineAt: string;
};
export type PresenceState = RealtimePresenceState<PresencePayload>;
export type TrackPresenceParams = Omit<PresencePayload, "onlineAt">;

export type MessagePayload = {
  message: string;
  createdAt: string;
  userId: string;
};

export default function useRealtimeChannel(channelName: string) {
  const [userId] = useState(uuidv4());

  const supabase = useContext(SupabaseContext);
  const channel = useMemo(() => {
    if (supabase === null) {
      return;
    }

    return supabase.channel(channelName, {
      config: {
        broadcast: {
          self: true,
          ack: true,
        },
        presence: {
          key: userId,
        },
      },
    });
  }, [supabase]);

  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [presenceState, setPresenceState] = useState<
    RealtimePresenceState<PresencePayload>
  >({});
  const [subscribeStatus, setSubscribeStatus] = useState<
    `${REALTIME_SUBSCRIBE_STATES}` | null
  >(null);
  const [isPresenceTracked, setIsPresenceTracked] = useState<boolean>(false);

  useEffect(() => {
    if (!channel) {
      return;
    }

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState<PresencePayload>();
        setPresenceState({ ...state });
      })
      .on("broadcast", { event: "message" }, ({ payload }) => {
        setMessages((messages) => [...messages, payload]);
      })
      .subscribe((status) => {
        setSubscribeStatus(status);
      });

    return () => {
      channel.unsubscribe();
    };
  }, [channel]);

  useEffect(() => {
    setIsPresenceTracked(() => {
      return presenceState[userId] && presenceState[userId].length > 0;
    });
  }, [presenceState, userId]);

  const sendMessage = async (message: string) => {
    if (!channel) {
      throw Error();
    }

    await channel.send({
      type: "broadcast",
      event: "message",
      payload: {
        message,
        userId,
        createdAt: new Date().toISOString(),
      },
    });
  };

  const trackPresence = async (data: TrackPresenceParams) => {
    if (!channel) {
      throw Error();
    }
    const currentUser = {
      onlineAt: new Date().toISOString(),
      ...data,
    };
    const presenceTrackStatus = await channel.track(currentUser);

    if (presenceTrackStatus !== "ok") {
      throw Error();
    }
  };

  return {
    messages,
    presenceState,
    subscribeStatus,
    isPresenceTracked,
    trackPresence,
    sendMessage,
  };
}
