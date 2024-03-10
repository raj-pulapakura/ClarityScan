import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { message: "No file was provided." },
        { status: 400 }
      );
    }

    const arrayBuffer = await (file as File).arrayBuffer();

    // Convert TIFF data to JPEG
    const jpegBuffer = await sharp(arrayBuffer).toFormat("jpeg").toBuffer();

    return new NextResponse(jpegBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg", // Correct MIME type for JPG images
        "Content-Disposition": "inline; filename=image.jpg",
      },
    });
  } catch (error) {
    console.error("Error converting image:", error);
    return NextResponse.json(
      { message: "Error converting image " + error },
      { status: 500 }
    );
  }
}
