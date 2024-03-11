import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    if (!formData.has("file")) {
      return NextResponse.json(
        { message: "No file was provided." },
        { status: 400 }
      );
    }

    if (Array.from(formData.keys()).length > 1) {
      return NextResponse.json(
        { message: "To many fields provided in form data" },
        { status: 400 }
      );
    }

    const response = await fetch(process.env.DENOISING_MODEL_SERVER!, {
      body: formData,
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(
        `Network response was not ok - Status = ${response.status}`
      );
    }

    const blob = await response.blob();

    const arrayBuffer = await blob.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=images.zip",
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
