import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import "../pagesStyle/student-parent.css"
import { useStore } from "../State/Store";
import { Class, InitialInfo, } from "../State/Types";


export function Teacher() {
    const navigate = useNavigate()

    const currentUser = useStore(state => state.currentUser)
    const currentUserData = useStore(state => state.currentUserData)

    const signOutUser = useStore(state => state.signOutUser)

    const setErrors = useStore(state => state.setErrors)

    const selectedClass = useStore(state => state.selectedClass)
    const setSelectedClass = useStore(state => state.setSelectedClass)

    const selectedClassData = useStore(state => state.selectedClassData)
    const getDataForselectedClass = useStore(state => state.getDataForClass)
    console.log("selectedClass", selectedClass)
    console.log("selectedClassData", selectedClassData)

    const selectedSubject = useStore(state => state.selectedSubject)
    const setSelectedSubject = useStore(state => state.setSelectedSubject)

    const subjectData = useStore(state => state.subjectData)
    console.log("subjectData", subjectData)
    const getSubjectData = useStore(state => state.getSubjectData)

    const postAMark = useStore(state => state.postMarkToAStudent)


    const chartData:any = []
   
    
    selectedClassData[0]?.students.map((student: InitialInfo) => subjectData.marks?.map(object => object.student.fullname === student.fullname && object.subject.name === selectedSubject.name ?chartData.push({ studentname: student.fullname, mark:object.mark})  : null))
    console.log(`chartData`,chartData)
  
    return (
        <div className="student">
            {currentUser ? <>
                <div className="leftMenu">
                    <div className="userInfo">
                        <img src={currentUser?.image} />
                        <h3>{currentUser?.fullname}</h3>
                        <h5>{currentUser?.email}</h5>
                    </div>
                    <button onClick={() => {
                        signOutUser()
                        navigate("/sign-in")
                        setErrors()
                    }
                    }>Sign Out</button>
                    <div className="news">
                        <p className="title">Classes</p>
                        <ul className="information">
                            {currentUserData.classes ? currentUserData.classes.map((teachingClass: Class) => <li onClick={() => {
                                setSelectedClass(teachingClass)
                                //@ts-ignore
                                getDataForselectedClass(selectedClass.name)
                            }}>{teachingClass.name}</li>) : null}
                            {selectedClass.length !== 0 ?
                                <div className="subjectInClass">
                                    <p className="subjectName">Subjects</p>
                                    <ul>
                                        {currentUserData.subjects ? currentUserData.subjects.map(subject => <li onClick={() => {
                                            setSelectedSubject(subject)
                                            getSubjectData(subject.name)

                                        }}>{subject.name}</li>) : null}
                                    </ul>
                                </div> : null}
                        </ul>
                    </div>

                </div>
                {selectedClass && selectedClassData.length !== 0 ?
                    <main >
                        <div className="main-header">
                            <h1>Class: {selectedClassData[0].name}</h1>
                            <LineChart width={500} height={300} data={chartData}>
                                <XAxis dataKey="studentname" />
                                <YAxis />
                                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                {/* <Line type="monotone" dataKey="mark" stroke="#8884d8" name="Subject" /> */}
                                <Line type="monotone" dataKey="mark" stroke="#FF5858 " />
                            </LineChart>
                        </div>
                        <div className="classSubject">
                            <p className="title">Students</p>
                            <ul >
                                {selectedClassData[0].students.map((student: InitialInfo) => (<li>
                                    <p>{student.fullname}</p>
                                    <p>{selectedSubject ? selectedSubject.name : null}</p>
                                    {/* <p>{selectedSubject && subjectData && subjectData.marks && subjectData.marks[0].student.fullname === student.fullname && subjectData.marks[0].subject.name === selectedSubject.name ? subjectData.marks[0].mark : null}</p> */}
                                    {selectedSubject && subjectData && subjectData.marks && subjectData.marks.map(object => object.student.fullname === student.fullname && object.subject.name === selectedSubject.name ? <p>{object.mark}</p> : null)}

                                    <form className="marks_form" onSubmit={(e) => {
                                        e.preventDefault()
                                        const formData = {
                                            mark: Number(e.target.mark.value),
                                            teacher: currentUser.email,
                                            student: student.email,
                                            name: selectedSubject?.name
                                        }
                                        postAMark(formData, formData.name)
                                        console.log(`lastdata`, subjectData)
                                        e.target.mark.value = ""

                                    }}>
                                        <input type="number" name="mark" />
                                        <button>Set</button>
                                    </form>
                                </li>))}
                            </ul>

                        </div>
                    </main> :
                    <div className="message"><h1 className="selectChild">Select a class.</h1></div>
                }</>
                : <h1>Loading</h1>}
        </div>
    )
}
