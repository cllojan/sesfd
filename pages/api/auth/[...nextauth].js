import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers";
const handler = NextAuth({
    providers:[
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email:{label: "Email", type:"email",placeholder:"jsmith"},
                password: {label: "Password", type:"password"}
            },
            authorize(credentials, req) {
                const user = {id:"1", fullname:"J Smith",email:"jhon@gmail.com" };
                return user;
            }
        })
    ]
})

