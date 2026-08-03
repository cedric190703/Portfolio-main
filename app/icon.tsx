import { ImageResponse } from "next/og"

export const size = {
  width: 48,
  height: 48,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#17191e",
        color: "#f8f8f6",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        fontSize: 28,
        fontWeight: 700,
        height: "100%",
        justifyContent: "center",
        letterSpacing: -3,
        width: "100%",
      }}
    >
      C<span style={{ color: "#8eb5ff", marginLeft: 1 }}>/</span>
    </div>,
    size,
  )
}
