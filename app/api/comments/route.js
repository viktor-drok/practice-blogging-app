import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export const GET = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { data: comment } = await supabase.from("comments").select("comment").eq("commendedPostId", 15);

  console.log(comment);

  if (comment) {
    return NextResponse.json(comment);
  }

  return new Response({ status: 404 });
};