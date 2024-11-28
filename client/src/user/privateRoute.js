import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Element }) => {
    const user = useSelector(state => state.user);

    // אם המשתמש לא מחובר, מפנים לדף ההתחברות
    if (!user) {
        return <Navigate to="/login" />;
    }

    // אם המשתמש מחובר, מציגים את הקומפוננטה המבוקשת
    return <Element />;
};

export default PrivateRoute;
