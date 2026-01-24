import React from "react";
import profileHandler from "../handler/profileHandler";
import LogoutButton from "../components/logout.Button";
import Loader from "../components/loader";
// import { useNavigate } from "react-router-dom";


// Profile Page Component
function ProfilePage(){
    const [profile, setProfile] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    // const navigate = useNavigate();

    React.useEffect(() => {
        const fetchProfile = async () => {
            const response = await profileHandler();
            if(response.error){
                setError(response.error);
            }else{
                setProfile(response.data.user);
            }
            setLoading(false);
        }
        fetchProfile();
    }, []);

    if(loading){
        return <Loader />;
    }

    if(error){
        return <div>Error: {error}</div>;
    }
    
    return (
        <div>
            <LogoutButton />
            <h1>Profile Page</h1>
            {profile && (
                <div>
                    {error && <p style={{color: 'red'}}>Error: {error}</p>}
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    
                </div>
            )}
        </div>
    );
}

export default ProfilePage;