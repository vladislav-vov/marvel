import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <h1 style={{'textAlign': 'center', 'fontSize': '46px'}}>Error 404</h1>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '20px'}}>Page does not exist</p>
            <Link to="/" style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '20px', 'color': '#9f0013'}}>Back to main page</Link>
        </div>
    )
}

export default Page404