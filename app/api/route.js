import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export const GET = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { data: posts } = await supabase.from("blogs").select();

  if (posts) {
    return NextResponse.json(posts);
  }

  return new Response({ status: 404 });
};