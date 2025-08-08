export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: '#3f2d2c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center', pointerEvents: 'none' }}>
            <h1
              className="lowercase"
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.5',
                fontWeight: 400,
                color: '#6B5654',
                margin: 0,
              }}
            >
              laurent del rey
            </h1>
            <p
              className="lowercase"
              style={{ color: '#6B5654', marginTop: 8 }}
            >
              404 — page not found
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}

