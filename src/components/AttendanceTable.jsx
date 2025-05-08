import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { getNextDays } from '../utils/dateFunctions';

const AttendanceTable = () => {
    const [dates, setDates] = useState([]);
    const [users, setUsers] = useState([]);
    const [attendanceData, setAttendanceData] = useState({});
    const [showAttendee, setShowAttendee] = useState([]);

    useEffect(() => {
        const fetchDates = getNextDays();
        console.log(fetchDates);
        setDates(fetchDates);

        const fetchUsers = async () => {
            const usersCollection = await getDocs(collection(db, 'users'));
            const usersList = usersCollection.docs.map(doc => doc.data());
            console.log(usersList);
            setUsers(usersList);
            setShowAttendee(usersList.map(user => user.id)); // Initialize showAttendee with all user IDs
        };

        fetchUsers();
    }, []);

    const handleChangeAttendee = (e, userId) => {
        e.preventDefault();
        console.log(showAttendee.filter(id => id == userId));
        setShowAttendee(prev => {
            if (prev.includes(userId)) {
                return prev.filter(id => id == userId);
            } else {
                return [...prev, userId];
            }
        });
    };

    const handleAttendanceChange = (date, userId, value) => {
        setAttendanceData(prevData => ({
            ...prevData,
            [date]: {
                ...prevData[date],
                [userId]: value
            }
        }));
    };

    const saveAttendance = async () => {
        const batch = writeBatch(db);
        for (const date in attendanceData) {
            const dateRef = doc(db, 'dates', date);
            batch.set(dateRef, { attendance: attendanceData[date] }, { merge: true });
        }
        await batch.commit();
        console.log("Attendance saved successfully!");
    };

    return (
        <div>
            <h1>Sraz skenerek</h1>
            {showAttendee.length < 4 && (
                <button onClick={() => setShowAttendee(users.map(user => user.id))}>
                    <span>Ukaž všechny skenerky</span>
                </button>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Datum</th>
                        {users
                            .filter(user => showAttendee.includes(user.id))
                            .map((user, index) => (
                                <th
                                    key={index}
                                    onClick={(e) => handleChangeAttendee(e, user.id)}
                                    className='cursor-pointer'
                                >{user.name}
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {dates.map((date, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td>{date.friday}</td>
                                {users
                                    .filter(user => showAttendee.includes(user.id))
                                    .map((user, userIndex) => (
                                        <td key={userIndex}>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name={`friday-${date.friday}-${user.id}-yes`}
                                                    value="yes"
                                                    checked={attendanceData[date.friday]?.[user.id] === 'yes'}
                                                    onChange={() => handleAttendanceChange(date.friday, user.id, 'yes')}
                                                /> Ano
                                                <input
                                                    type="radio"
                                                    name={`friday-${date.friday}-${user.id}-no`}
                                                    value="no"
                                                    checked={attendanceData[date.friday]?.[user.id] === 'no'}
                                                    onChange={() => handleAttendanceChange(date.friday, user.id, 'no')}
                                                /> Ne
                                                <input
                                                    type="radio"
                                                    name={`friday-${date.friday}-${user.id}-maybe`}
                                                    value="maybe"
                                                    checked={attendanceData[date.friday]?.[user.id] === 'maybe'}
                                                    onChange={() => handleAttendanceChange(date.friday, user.id, 'maybe')}
                                                /> Možná
                                            </div>
                                        </td>
                                    ))}
                            </tr>
                            <tr>
                                <td>{date.saturday}</td>
                                {users
                                    .filter(user => showAttendee.includes(user.id))
                                    .map((user, userIndex) => (
                                        <td key={userIndex}>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name={`saturday-${date.saturday}-${user.id}-yes`}
                                                    value="yes"
                                                    checked={attendanceData[date.saturday]?.[user.id] === 'yes'}
                                                    onChange={() => handleAttendanceChange(date.saturday, user.id, 'yes')}
                                                /> Ano
                                                <input
                                                    type="radio"
                                                    name={`saturday-${date.saturday}-${user.id}-no`}
                                                    value="no"
                                                    checked={attendanceData[date.saturday]?.[user.id] === 'no'}
                                                    onChange={() => handleAttendanceChange(date.saturday, user.id, 'no')}
                                                /> Ne
                                                <input
                                                    type="radio"
                                                    name={`saturday-${date.saturday}-${user.id}-maybe`}
                                                    value="maybe"
                                                    checked={attendanceData[date.saturday]?.[user.id] === 'maybe'}
                                                    onChange={() => handleAttendanceChange(date.saturday, user.id, 'maybe')}
                                                /> Možná
                                            </div>
                                        </td>
                                    ))}
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <button onClick={saveAttendance}>Uložit termíny</button>
        </div>
    );
};

export default AttendanceTable;
