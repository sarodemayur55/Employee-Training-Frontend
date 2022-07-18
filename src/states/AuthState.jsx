import { createState, useState } from '@hookstate/core';


const authState = createState({
    isLoading:true,
    isAuthenticated:false,
    user_id:'',
    first_name:'',
    last_name:'',
    email:'',
    role:'',
})

export function useAuth(){
    return useState(authState)
}

export function useAuthState() {      
    const state = useState(authState)

    return ({
        get isLoading(){
            return state.isLoading.get()
        },
        setIsLoading(){
            state.isLoading.set(p=>p)
        },
        get isAuthenticated(){
            return state.isAuthenticated.get()
        },
        setIsAuthenticated(){
            state.isAuthenticated.set(p=>p)
        },
        get user_id(){
            return state.user_id.get()
        },
        // setFirst_name(){
        //     state.first_name.set(p=>p)
        // },
        get first_name(){
            return state.first_name.get()
        },
        setFirst_name(){
            state.first_name.set(p=>p)
        },
        get last_name(){
            return state.last_name.get()
        },
        setLast_name(){
            state.last_name.set(p=>p)
        },
        get email(){
            return state.email.get()
        },
        setEmail(){
            state.email.set(p=>p)
        },
        get role(){
            return state.role.get()
        },
        setRole(){
            state.role.set(p=>p)
        },
    })
}