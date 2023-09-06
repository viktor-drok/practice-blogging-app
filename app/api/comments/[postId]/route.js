import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export const GET = async (request, { params }) => {
  const { postId } = params;
  const supabase = createRouteHandlerClient({ cookies });

  const { data: comment } = await supabase.from("comments").select("comment, authorEmail, id,created_at").eq("commendedPostId", postId);

  console.log(postId);

  if (comment) {
    return NextResponse.json(comment);
  }

  return new Response({ status: 404 });
};