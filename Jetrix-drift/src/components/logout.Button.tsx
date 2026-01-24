import useAuth from "../context/authContext";
import logoutService from "../services/logout.Service";

// Logout Button Component
function logoutButton() {
    const { user , setUser} = useAuth();
    const handleLogout = async () => {
        const response = await logoutService();
        if(response.error){
            window.alert("Logout Failed: " + response.error);
        }else{
            console.log("User before null: ", user);
            setUser(null);
            console.log("User After null: ", user);
            window.alert("Successfully Logged Out");
            // Optionally, redirect to login page or home page
            window.location.href = "/login";
        }
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}

export default logoutButton;