import { gql, useQuery, useSubscription } from "@apollo/client";
import { FunctionComponent, useState } from "react";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";

interface ListUsersProps {

}

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      email
      fullName
    }
  }
`;

const NEW_USER = gql`
  subscription NewUser {
    newUser {
        id
        email
        fullName
    }
  }
`;

const COLUMNS = [
    {
        label: 'ID',
        key: 'id',
        keyIndex: 'id',
    },
    {
        label: 'Email',
        key: 'email',
        keyIndex: 'email',
    },
    {
        label: 'Full Name',
        key: 'fullName',
        keyIndex: 'fullName',
    },
];

const ListUsers: FunctionComponent<ListUsersProps> = () => {
    const { loading, error, data } = useQuery(GET_USERS);
    
    let newUser: any = null;
    let aggregatedData = [...data.getUsers];
    {
        const { data } = useSubscription(
            NEW_USER,
        );
        
        newUser = data?.newUser;
        if (newUser) {
            aggregatedData = [...aggregatedData, newUser];
        }
    }

    const [columns] = useState(COLUMNS);
    const navigate = useNavigate();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div>
            <h1>Users</h1>
            <button className="btn" onClick={() => navigate("/create-user")}>Create User</button>
            <Table columns={columns} data={aggregatedData} />
        </div>
    );
}

export default ListUsers;