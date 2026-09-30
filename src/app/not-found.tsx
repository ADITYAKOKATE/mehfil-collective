import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        background: "#080808",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "8rem",
          fontWeight: 700,
          lineHeight: 1,
          background: "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "1rem",
        }}
      >
        404
      </div>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "2rem",
          fontWeight: 500,
          color: "#f0ece4",
          marginBottom: "1rem",
        }}
      >
        The Mehfil has moved on.
      </h1>
      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1rem",
          color: "#888880",
          maxWidth: "400px",
          lineHeight: 1.7,
          marginBottom: "2.5rem",
        }}
      >
        The page you are looking for does not exist. Let us guide you back to the music.
      </p>
      <Link
        href="/"
        style={{
          padding: "13px 30px",
          background: "linear-gradient(135deg, #c9a84c, #e8cc7a)",
          color: "#080808",
          textDecoration: "none",
          fontFamily: "'Outfit', sans-serif",
          fontSize: "0.82rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        Return Home
      </Link>
    </div>
  );
}
