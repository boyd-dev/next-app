// iron-session options
export const sessionOption ={
    cookieName: "next-app",
    password: process.env.IRON_SESSION_PASSWORD,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600 // 1 hr
    }
}