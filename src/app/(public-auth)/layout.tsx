import AuthHeader from "./auth-header";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
            {/* ── Inline script: apply saved theme before first paint ── */}
            <script dangerouslySetInnerHTML={{
                __html: `
                    (function() {
                        var stored = localStorage.getItem('aica-theme');
                        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        if (stored === 'dark' || (!stored && prefersDark)) {
                            document.documentElement.classList.add('dark');
                        }
                    })();
                `
            }} />

            <AuthHeader />
            {children}
        </div>
    );
}