export default function NotFound() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#3f2d2c',
      }}
    >
      {/* Header label at the top */}
      <div className="fixed left-0 right-0 z-20 flex items-center justify-center header-bar" style={{ top: 0, pointerEvents: 'none' }}>
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
      </div>

      {/* Centered 404 message */}
      <div className="flex items-center justify-center" style={{ height: '100%', pointerEvents: 'none' }}>
        <p className="lowercase" style={{ color: '#6B5654' }}>404 — page not found</p>
      </div>
    </div>
  );
}

