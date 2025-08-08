import SiteHeader from "@/components/SiteHeader";
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
      <SiteHeader animated={false} toTop visible topPaddingPx={28} />

      {/* Centered 404 message */}
      <div className="flex items-center justify-center" style={{ height: '100%', pointerEvents: 'none' }}>
        <p className="lowercase" style={{ color: '#6B5654' }}>page not found</p>
      </div>
    </div>
  );
}

