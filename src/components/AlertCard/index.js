export default function AlertCard({ colorStyle, children }) {
    return (
        <section className="text-center">
            <div className={`alert alert-${colorStyle}`} role="alert">
                {children}
            </div>
        </section>
    );
}