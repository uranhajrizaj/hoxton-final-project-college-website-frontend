import { grid } from "@mui/system";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import "../pagesStyle/student-parent.css"
import { useStore } from "../State/Store";
import { Children, Subject } from "../State/Types";

export function Parent() {
    const navigate = useNavigate()

    const currentUser = useStore(state => state.currentUser)
    const currentUserData = useStore(state => state.currentUserData)

    const signOutUser = useStore(state => state.signOutUser)

    const setErrors = useStore(state => state.setErrors)

    const selectedPerson = useStore(state => state.selectedPerson)
    const setSelectedperson = useStore(state => state.setSelectedPerson)

    const selectedPersonData = useStore(state => state.selectedPersonData)
    const getDataForselectedPerson = useStore(state => state.getDataForselectedPerson)
    console.log(selectedPerson)
    console.log(selectedPersonData)

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
                        <p className="title">Childrens</p>
                        <ul className="information">
                            {currentUserData[0].childrens.map((children: Children) => <li onClick={() => {
                                setSelectedperson(children)
                                getDataForselectedPerson(selectedPerson?.email!)
                            }}>{children.fullname}</li>)}
                        </ul>
                    </div>
                </div>
                {selectedPerson &&selectedPersonData.length!==0 ?
                    <main >
                        <div className="main-header">
                            <div style={{display:"grid"}}>
                            <h1>Class: {selectedPersonData[0].class.name}</h1>
                            <h1>Student name: {selectedPersonData[0].fullname}</h1>
                            </div>
                            <LineChart width={500} height={300} data={selectedPersonData[0].stduentFromTeacherMark}>
                                <XAxis dataKey="subject.name" />
                                <YAxis />
                                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                <Line type="monotone" dataKey="Subject.name" stroke="#8884d8" name="Subject" />
                                <Line type="monotone" dataKey="mark" stroke="#FF5858 " />
                            </LineChart>
                        </div>
                        <div className="classSubject">
                            <p className="title">Subjects</p>
                            <ul>
                                {selectedPersonData?selectedPersonData[0].stduentFromTeacherMark.map((object: Subject) => (<li>
                                    <p>{object.subject.name}</p>
                                    <p>{object.teacher.fullname}</p>
                                    <p>{object.mark}</p>
                                </li>)) : <p>Loading</p>}
                            </ul>
                        </div>
                    </main> :
                    <div className="message"><h1 className="selectChild">Select a child to see the result.</h1></div>
                }
            </> : <h1>Loading</h1>}

        </div>
    )
}