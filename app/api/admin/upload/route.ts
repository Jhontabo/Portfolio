import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { verifyAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}.${fileExt}`;

    const { data, error } = await getSupabaseAdmin().storage
      .from("portfolio")
      .upload(fileName, file, { contentType: file.type });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const { data: urlData } = getSupabaseAdmin().storage
      .from("portfolio")
      .getPublicUrl(data.path);

    return NextResponse.json({ url: urlData.publicUrl, path: data.path });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
