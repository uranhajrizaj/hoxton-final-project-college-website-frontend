import create from "zustand";
import {Children, StateType, User} from "./Types";


export const useStore = create < StateType > ((set, get) => ({
    currentUser: null,
    currentUserData: null,
    signInErrors: [],
    setErrors: () => set(
        {signInErrors: []}
    ),

    signInUser: (formData : any, navigate : any) => {
        fetch(`http://localhost:4455/sign-in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then(resp => resp.json()).then(data => {
            if (data.user) {
                set({currentUser: data.user})
                localStorage.token = data.token
                fetch(`http://localhost:4455/${
                    data.user.role
                }/${
                    data.user.email
                }`).then(resp => resp.json()).then(dataUser => {
                    set({currentUserData: dataUser})
                    console.log("data of user", dataUser)
                    navigate(`/${
                        data.user.role
                    }`)
                })

            } else {
                set({signInErrors: data.errors})
            }
        })
    },

    signOutUser: () => {
        localStorage.removeItem("token")
        set({currentUser: null})
    },
    selectedPerson: null,
    selectedPersonData: [],
    setSelectedPerson: (person : Children) => set(
        {selectedPerson: person}
    ),
    getDataForselectedPerson: (email : any) => {
        fetch(`http://localhost:4455/student/${email}`).then(resp => resp.json()).then(data => set({selectedPersonData: data}))
    },

    selectedClass: [],
    setSelectedClass: (teachingClass) => set(
        {selectedClass: teachingClass}
    ),

    selectedClassData: [],
    getDataForClass: (email : any) => {
        fetch(`http://localhost:4455/class/${email}`).then(resp => resp.json()).then(data => set({selectedClassData: data}))
    },
    showContent: true,
    setShowContent: () => set(
        {
            showContent: !get().showContent
        }
    ),

    selectedSubject: null,
    setSelectedSubject: (subject) => set(
        {selectedSubject: subject}
    ),
    subjectData: [],
    getSubjectData: (name : any) => {
        fetch(`http://localhost:4455/subject/${name}`).then(resp => resp.json()).then(data => set({subjectData: data}))
    },
    postMarkToAStudent: (formData,name) => {
        fetch(`http://localhost:4455/marks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then(resp => resp.json()).then(data => {
            if (data.mark) {
                fetch(`http://localhost:4455/subject/${name}`).then(resp => resp.json()).then(data => set({subjectData: data}))
            }
        })
    }


}))
