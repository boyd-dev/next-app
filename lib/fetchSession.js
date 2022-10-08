const fetchUserSession = async () => {
    console.log("fetchSession...");
    return (await fetch("/api/user")).json();
}

export default fetchUserSession;