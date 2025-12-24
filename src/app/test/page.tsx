export default function TestPage() {
  return (
    <div
      style={{ padding: "40px", textAlign: "center", fontFamily: "Arial" }}
      data-oid="e32_stx"
    >
      <h1 style={{ fontSize: "48px", color: "#14B8A6" }} data-oid="r:o-nk.">
        ✅ РАБОТАЕТ!
      </h1>
      <p style={{ fontSize: "24px", marginTop: "20px" }} data-oid="8:182w7">
        Если вы видите эту страницу, значит деплой работает!
      </p>
      <p
        style={{ fontSize: "18px", color: "#666", marginTop: "20px" }}
        data-oid="2neevq7"
      >
        Timestamp: {new Date().toISOString()}
      </p>
      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: "30px",
          padding: "15px 30px",
          background: "#14B8A6",
          color: "white",
          textDecoration: "none",
          borderRadius: "25px",
          fontSize: "18px",
          fontWeight: "bold",
        }}
        data-oid="_-z5fho"
      >
        → Перейти к Рулетке Ведущих
      </a>
    </div>
  );
}
