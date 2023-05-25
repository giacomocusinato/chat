"use client";

import { createClient } from "@supabase/supabase-js";
import ChatRoom from "./(chatroom)/ChatRoom";
import React from "react";
import SupabaseContext from "./(realtime)/SupabaseContext";

export default function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      realtime: {
        params: {
          eventsPerSecond: 5,
        },
      },
    }
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SupabaseContext.Provider value={supabase}>
        <ChatRoom />
      </SupabaseContext.Provider>
    </main>
  );
}
