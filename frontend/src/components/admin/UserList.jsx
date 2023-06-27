import ReportedUser from "../User/ReportedUser";

const UserList = ({ data }) => {


    function sorting({ sort }) {
        switch (sort) {
            case 'number-of-reports':
                users.sort(sortMethods.descending);
                break;
            case "type1":
                const UsersType1 = reports.filter((users) => users.tag === "type1");
                setReports(UsersType1);
                break;
            case "type2":
                    const UsersType2 = reports.filter((users) => users.tag === "type2");
                    setReports(UsersType2);
                    break;
        }

    }

    const sortMethods = {
        none: { method: (a, b) => null },
        descending: { method: (a, b) => (a > b ? -1 : 1) }
    }



    return (
        <div style={{ padding: "20px", background: "#ADD8E6" }}>
            <h3>Reported Users</h3>
            <div>
                <select name="sort">
                    <option value="number-of-reports">Number of reports</option>
                    <option value="example1">example1</option>
                    <option value="example2">example2</option>
                    <option value="example3">example3</option>
                </select>
            </div>

            {data.map(
                (entry) => <ReportedUser />
            )}
        </div>
    );
}

export default UserList;