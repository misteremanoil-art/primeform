import { ImageResponse } from "next/og";

// Without this the static export tries to treat the image as a dynamic route
// and fails the build.
export const dynamic = "force-static";

export const alt =
  "PRIMEFORM — Personalised Fitness Coaching · Demo by Emanoil Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background:
            "radial-gradient(1100px 700px at 82% 12%, rgba(255,129,84,0.28), transparent 55%), linear-gradient(135deg, #13110f 0%, #1b1713 100%)",
          color: "#faf2e8",
          fontFamily: "sans-serif",
          padding: "72px",
        }}
      >
        {/* Left copy */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#b7aa9d",
            }}
          >
            Personalised Fitness Coaching
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: -1.5,
              marginTop: 22,
              maxWidth: 560,
            }}
          >
            Train with a plan built around you.
          </div>
          <div
            style={{
              display: "flex",
              gap: 40,
              marginTop: 40,
            }}
          >
            <Stat value="91%" label="completed" />
            <Stat value="−6.6 kg" label="progress" />
            <Stat value="7 wks" label="streak" />
          </div>
          <div style={{ display: "flex", marginTop: 44, fontSize: 24, color: "#b7aa9d" }}>
            Demo by Emanoil Studio
          </div>
        </div>

        {/* Training halo */}
        <div
          style={{
            display: "flex",
            width: 360,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 320,
              height: 320,
              borderRadius: 320,
              border: "3px solid rgba(255,129,84,0.6)",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 90px rgba(255,129,84,0.35)",
              background:
                "radial-gradient(circle at 40% 32%, rgba(40,33,28,0.7), rgba(19,17,15,0.2))",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ display: "flex", fontSize: 84, fontWeight: 800 }}>91%</div>
              <div style={{ display: "flex", fontSize: 20, letterSpacing: 3, color: "#b7aa9d", textTransform: "uppercase" }}>
                weekly progress
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", fontSize: 48, fontWeight: 800 }}>{value}</div>
      <div style={{ display: "flex", fontSize: 20, color: "#b7aa9d", textTransform: "uppercase", letterSpacing: 2 }}>
        {label}
      </div>
    </div>
  );
}
