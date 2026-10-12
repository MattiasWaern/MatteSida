import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="page page--narrow not-found">
            <p className="eyebrow">Felkod 404</p>
            <h1 className="page-title">Sidan finns inte</h1>
            <p className="lead">
                Länken kan vara felskriven eller så har sidan flyttats.
            </p>

            <div className="btn-row" style={{ marginTop: "24px" }}>
                <Link to="/" className="btn btn-primary">
                    Till startsidan
                </Link>
                <Link to="/quiz/linjara-ekvationer/easy" className="btn btn-secondary">
                    Börja öva
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
