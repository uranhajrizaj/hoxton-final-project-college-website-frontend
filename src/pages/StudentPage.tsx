import { useNavigate } from "react-router-dom";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import "../pagesStyle/student-parent.css"
import { useStore } from "../State/Store";
import { Subject } from "../State/Types";

export function Student() {
    const navigate = useNavigate()
    const currentUser = useStore(state => state.currentUser)
    const signOutUser = useStore(state => state.signOutUser)
    const setErrors = useStore(state => state.setErrors)
    const currentUserData = useStore(state => state.currentUserData)

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
                    {currentUser.role === "student" ? <div className="news">
                        <p className="title">News</p>
                        <ul className="information">
                            <li>
                                <p>Math</p>
                                <p className="description">We are going to have test </p>
                            </li>
                            <li>
                                <p>Java</p>
                                <p className="description">We are not going to do test this week</p>
                            </li>
                        </ul>
                    </div> :
                        <div className="childrens">
                            <ul>
                                <li></li>
                            </ul>
                        </div>

                    }
                </div>
                <main >
                    <div className="main-header">
                        <h1>Class: {currentUserData[0].class.name}</h1>
                        <LineChart width={500} height={300} data={currentUserData[0].stduentFromTeacherMark}>
                            <XAxis dataKey="subject.name" />
                            <YAxis />
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            {/* <Line type="monotone" dataKey="Subject.name" stroke="#8884d8" name="Subject" /> */}
                            <Line type="monotone" dataKey="mark" stroke="#FF5858 " />
                        </LineChart>
                    </div>
                    <div className="classSubject">
                        <p className="title">Subjects</p>
                        <ul>
                            {currentUserData[0].stduentFromTeacherMark.map((object: Subject) => (<li>
                                <p>{object.subject.name}</p>
                                <p>{object.teacher.fullname}</p>
                                <p>{object.mark}</p>

                            </li>))}
                        </ul>
                    </div>

                </main>
            </> : <h1>Loading</h1>}

        </div>
    )
}