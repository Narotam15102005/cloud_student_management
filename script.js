/* =====================================================
   EDUCloud STUDENT MANAGEMENT SYSTEM
===================================================== */


/* =====================================================
   INITIAL SAMPLE DATA
===================================================== */

const defaultStudents = [

    {
        name: "Arun Kumar",
        roll: "23CS101",
        email: "arun@example.com",
        department: "CSE",
        attendance: 92,
        cgpa: 8.7
    },

    {
        name: "Priya Sharma",
        roll: "23CS102",
        email: "priya@example.com",
        department: "CSE",
        attendance: 88,
        cgpa: 9.1
    },

    {
        name: "Rahul Raj",
        roll: "23EC105",
        email: "rahul@example.com",
        department: "ECE",
        attendance: 79,
        cgpa: 7.8
    },

    {
        name: "Sneha Devi",
        roll: "23EE108",
        email: "sneha@example.com",
        department: "EEE",
        attendance: 95,
        cgpa: 9.3
    },

    {
        name: "Vignesh S",
        roll: "23ME112",
        email: "vignesh@example.com",
        department: "MECH",
        attendance: 74,
        cgpa: 7.2
    }

];


/* =====================================================
   LOAD STUDENTS
===================================================== */

let students =
    JSON.parse(
        localStorage.getItem("eduCloudStudents")
    );


if (!students) {

    students = defaultStudents;

    saveStudents();

}


/* =====================================================
   SAVE STUDENTS
===================================================== */

function saveStudents() {

    localStorage.setItem(
        "eduCloudStudents",
        JSON.stringify(students)
    );

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderStudents();

        updateDashboard();

        renderAnalytics();

    }
);


/* =====================================================
   OPEN ADD STUDENT MODAL
===================================================== */

function openStudentModal() {

    document.getElementById(
        "studentModal"
    ).classList.add("show");


    document.getElementById(
        "studentForm"
    ).reset();


    document.getElementById(
        "editIndex"
    ).value = "-1";


    document.getElementById(
        "modalTitle"
    ).textContent =
        "Add New Student";


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE STUDENT MODAL
===================================================== */

function closeStudentModal() {

    document.getElementById(
        "studentModal"
    ).classList.remove("show");


    document.body.style.overflow =
        "auto";

}


/* =====================================================
   SAVE STUDENT
===================================================== */

function saveStudent(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "studentName"
        ).value.trim();


    const roll =
        document.getElementById(
            "rollNumber"
        ).value.trim();


    const email =
        document.getElementById(
            "email"
        ).value.trim();


    const department =
        document.getElementById(
            "department"
        ).value;


    const attendance =
        Number(
            document.getElementById(
                "attendance"
            ).value
        );


    const cgpa =
        Number(
            document.getElementById(
                "cgpa"
            ).value
        );


    const editIndex =
        Number(
            document.getElementById(
                "editIndex"
            ).value
        );


    const student = {

        name,

        roll,

        email,

        department,

        attendance,

        cgpa

    };


    if (editIndex === -1) {

        students.push(student);

    } else {

        students[editIndex] =
            student;

    }


    saveStudents();


    renderStudents();

    updateDashboard();

    renderAnalytics();


    closeStudentModal();


    alert(
        editIndex === -1
            ? "🎓 Student added successfully!"
            : "✅ Student updated successfully!"
    );

}


/* =====================================================
   RENDER STUDENTS
===================================================== */

function renderStudents() {

    const table =
        document.getElementById(
            "studentTable"
        );


    const empty =
        document.getElementById(
            "emptyState"
        );


    const search =
        document.getElementById(
            "searchInput"
        ).value
            .toLowerCase()
            .trim();


    const department =
        document.getElementById(
            "departmentFilter"
        ).value;


    const filtered =
        students.filter(
            function(student) {

                const matchesSearch =

                    student.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    student.roll
                        .toLowerCase()
                        .includes(search)

                    ||

                    student.email
                        .toLowerCase()
                        .includes(search);


                const matchesDepartment =

                    department === "all"

                    ||

                    student.department ===
                    department;


                return (
                    matchesSearch &&
                    matchesDepartment
                );

            }
        );


    table.innerHTML = "";


    if (filtered.length === 0) {

        empty.style.display =
            "block";

        return;

    }


    empty.style.display =
        "none";


    filtered.forEach(
        function(student) {

            const actualIndex =
                students.indexOf(student);


            let attendanceClass =
                "good";


            if (student.attendance < 75) {

                attendanceClass =
                    "low";

            } else if (
                student.attendance < 85
            ) {

                attendanceClass =
                    "average";

            }


            const statusClass =
                student.attendance >= 75
                    ? "active"
                    : "warning";


            const statusText =
                student.attendance >= 75
                    ? "Active"
                    : "Low Attendance";


            const initials =
                student.name
                    .split(" ")
                    .map(
                        word =>
                            word[0]
                    )
                    .join("")
                    .substring(0, 2)
                    .toUpperCase();


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>

                    <div class="student-cell">

                        <div class="student-avatar">
                            ${initials}
                        </div>

                        <div>

                            <span class="student-name">
                                ${student.name}
                            </span>

                            <span class="student-email">
                                ${student.email}
                            </span>

                        </div>

                    </div>

                </td>


                <td>
                    ${student.roll}
                </td>


                <td>

                    <span class="department-badge">
                        ${student.department}
                    </span>

                </td>


                <td>

                    <span class="attendance ${attendanceClass}">
                        ${student.attendance}%
                    </span>

                </td>


                <td>

                    <strong>
                        ${student.cgpa.toFixed(1)}
                    </strong>

                </td>


                <td>

                    <span class="status ${statusClass}">
                        ${statusText}
                    </span>

                </td>


                <td>

                    <div class="actions">


                        <button
                            class="action-btn"
                            title="View"
                            onclick="viewStudent(${actualIndex})">

                            👁️

                        </button>


                        <button
                            class="action-btn"
                            title="Edit"
                            onclick="editStudent(${actualIndex})">

                            ✏️

                        </button>


                        <button
                            class="action-btn delete-btn"
                            title="Delete"
                            onclick="deleteStudent(${actualIndex})">

                            🗑️

                        </button>


                    </div>

                </td>

            `;


            table.appendChild(row);

        }
    );

}


/* =====================================================
   EDIT STUDENT
===================================================== */

function editStudent(index) {

    const student =
        students[index];


    document.getElementById(
        "studentName"
    ).value =
        student.name;


    document.getElementById(
        "rollNumber"
    ).value =
        student.roll;


    document.getElementById(
        "email"
    ).value =
        student.email;


    document.getElementById(
        "department"
    ).value =
        student.department;


    document.getElementById(
        "attendance"
    ).value =
        student.attendance;


    document.getElementById(
        "cgpa"
    ).value =
        student.cgpa;


    document.getElementById(
        "editIndex"
    ).value =
        index;


    document.getElementById(
        "modalTitle"
    ).textContent =
        "Edit Student";


    document.getElementById(
        "studentModal"
    ).classList.add("show");


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   DELETE STUDENT
===================================================== */

function deleteStudent(index) {

    const student =
        students[index];


    const confirmed =
        confirm(
            `Delete ${student.name} from student records?`
        );


    if (!confirmed) {

        return;

    }


    students.splice(
        index,
        1
    );


    saveStudents();


    renderStudents();

    updateDashboard();

    renderAnalytics();


    alert(
        "Student record deleted."
    );

}


/* =====================================================
   VIEW STUDENT
===================================================== */

function viewStudent(index) {

    const student =
        students[index];


    const initials =
        student.name
            .split(" ")
            .map(
                word =>
                    word[0]
            )
            .join("")
            .substring(0, 2)
            .toUpperCase();


    const details =
        document.getElementById(
            "studentDetails"
        );


    details.innerHTML = `

        <div class="details-profile">

            <div class="details-avatar">
                ${initials}
            </div>

            <h2>
                ${student.name}
            </h2>

            <p>
                ${student.roll} • ${student.department}
            </p>

        </div>


        <div class="details-grid">


            <div class="detail-box">

                <span>
                    Email
                </span>

                <strong>
                    ${student.email}
                </strong>

            </div>


            <div class="detail-box">

                <span>
                    Department
                </span>

                <strong>
                    ${student.department}
                </strong>

            </div>


            <div class="detail-box">

                <span>
                    Attendance
                </span>

                <strong>
                    ${student.attendance}%
                </strong>

            </div>


            <div class="detail-box">

                <span>
                    CGPA
                </span>

                <strong>
                    ${student.cgpa.toFixed(1)}
                </strong>

            </div>


            <div class="detail-box">

                <span>
                    Academic Status
                </span>

                <strong>
                    ${
                        student.attendance >= 75
                            ? "Active"
                            : "Low Attendance"
                    }
                </strong>

            </div>


            <div class="detail-box">

                <span>
                    Student ID
                </span>

                <strong>
                    ${student.roll}
                </strong>

            </div>


        </div>

    `;


    document.getElementById(
        "detailsModal"
    ).classList.add("show");


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE DETAILS
===================================================== */

function closeDetails() {

    document.getElementById(
        "detailsModal"
    ).classList.remove("show");


    document.body.style.overflow =
        "auto";

}


/* =====================================================
   DASHBOARD STATISTICS
===================================================== */

function updateDashboard() {

    const total =
        students.length;


    document.getElementById(
        "totalStudents"
    ).textContent =
        total;


    const departments =
        new Set(
            students.map(
                student =>
                    student.department
            )
        );


    document.getElementById(
        "totalDepartments"
    ).textContent =
        departments.size;


    if (total === 0) {

        document.getElementById(
            "averageAttendance"
        ).textContent =
            "0%";


        document.getElementById(
            "averageCGPA"
        ).textContent =
            "0.0";

        return;

    }


    const attendance =
        students.reduce(
            (
                sum,
                student
            ) =>
                sum +
                Number(
                    student.attendance
                ),
            0
        ) / total;


    const cgpa =
        students.reduce(
            (
                sum,
                student
            ) =>
                sum +
                Number(
                    student.cgpa
                ),
            0
        ) / total;


    document.getElementById(
        "averageAttendance"
    ).textContent =
        Math.round(
            attendance
        ) + "%";


    document.getElementById(
        "averageCGPA"
    ).textContent =
        cgpa.toFixed(1);


    document.getElementById(
        "attendanceValue"
    ).textContent =
        Math.round(
            attendance
        ) + "%";


    document.getElementById(
        "cgpaValue"
    ).textContent =
        cgpa.toFixed(1);


    document.getElementById(
        "attendanceProgress"
    ).style.width =
        attendance + "%";


    document.getElementById(
        "cgpaProgress"
    ).style.width =
        (cgpa / 10 * 100) + "%";

}


/* =====================================================
   ANALYTICS
===================================================== */

function renderAnalytics() {

    const chart =
        document.getElementById(
            "departmentChart"
        );


    const departments = {

        CSE: 0,

        ECE: 0,

        EEE: 0,

        MECH: 0,

        CIVIL: 0

    };


    students.forEach(
        function(student) {

            if (
                departments[
                    student.department
                ] !== undefined
            ) {

                departments[
                    student.department
                ]++;

            }

        }
    );


    const maximum =
        Math.max(
            ...Object.values(
                departments
            ),
            1
        );


    chart.innerHTML = "";


    Object.entries(
        departments
    ).forEach(
        function([
            name,
            count
        ]) {

            const height =
                (count / maximum) *
                150;


            chart.innerHTML += `

                <div class="chart-column">

                    <div
                        class="chart-bar"
                        style="height:${Math.max(height,5)}px"
                        title="${count} students">

                    </div>

                    <span class="chart-label">
                        ${name}
                    </span>

                </div>

            `;

        }
    );

}


/* =====================================================
   EXPORT STUDENTS
===================================================== */

function exportStudents() {

    if (students.length === 0) {

        alert(
            "No student records to export."
        );

        return;

    }


    let csv =
        "Name,Roll Number,Email,Department,Attendance,CGPA\n";


    students.forEach(
        function(student) {

            csv +=
                `"${student.name}",` +
                `"${student.roll}",` +
                `"${student.email}",` +
                `"${student.department}",` +
                `${student.attendance},` +
                `${student.cgpa}\n`;

        }
    );


    const blob =
        new Blob(
            [csv],
            {
                type:
                    "text/csv"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "student_records.csv";


    link.click();


    URL.revokeObjectURL(
        url
    );

}


/* =====================================================
   DARK MODE
===================================================== */

function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );


    const dark =
        document.body.classList.contains(
            "dark"
        );


    localStorage.setItem(
        "eduCloudDarkMode",
        dark
    );

}


if (
    localStorage.getItem(
        "eduCloudDarkMode"
    ) === "true"
) {

    document.body.classList.add(
        "dark"
    );

}


/* =====================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
    "click",
    function(event) {

        const studentModal =
            document.getElementById(
                "studentModal"
            );


        const detailsModal =
            document.getElementById(
                "detailsModal"
            );


        if (
            event.target ===
            studentModal
        ) {

            closeStudentModal();

        }


        if (
            event.target ===
            detailsModal
        ) {

            closeDetails();

        }

    }
);


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "Escape"
        ) {

            closeStudentModal();

            closeDetails();

        }

    }
);


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "🎓 EduCloud Student Management System loaded."
);

console.log(
    "☁️ Cloud-ready architecture initialized."
);
