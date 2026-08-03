import { ImageResponse } from "next/og"

export const size = {
  width: 64,
  height: 64,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "transparent",
        color: "#2356b7",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        fontSize: 42,
        fontWeight: 700,
        height: "100%",
        justifyContent: "center",
        letterSpacing: -5,
        width: "100%",
      }}
    >
      C<span style={{ marginLeft: 2 }}>/</span>
    </div>,
    size,
  )
}
