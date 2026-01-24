const logoutService = async () => {
    try{
        const BaseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${BaseUrl}/user/logout`,
            {
                method: 'GET',
                credentials: 'include'
            }
        )
        return response.json();
    }catch(error: any){
        return {error: error.message}
    }
}

export default logoutService;