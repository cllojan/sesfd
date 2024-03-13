
import NextAuth, { getServerSession } from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";

export const authOptions = {
    providers:[
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email:{label: "Email", type:"email",placeholder:"jsmith"},
                password: {label: "Password", type:"password", placeholder:"******"}
            },
            authorize(credentials, req) {
                const user = {id:"1", fullname:"J Smith",email:"jhon@gmail.com" };
                return user;
            }
        })
    ]
}

export default NextAuth(authOptions)