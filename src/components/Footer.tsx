export default function Footer() {
    return (
        <footer className="relative z-10 max-w-6xl mx-auto px-8 py-8 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2">
                <span className="font-display italic" style={{ fontSize: 13, color: "var(--warm)" }}>aica</span>
            </div>
            <div className="flex items-center gap-6">
                <a href="#" className="footer-link">Privacy</a>
                <a href="#" className="footer-link">Terms</a>
                <a href="#" className="footer-link">Contact</a>
            </div>
            <span className="font-mono" style={{ fontSize: 13, color: "var(--warm)" }}>© 2026</span>
        </footer>
    );
}