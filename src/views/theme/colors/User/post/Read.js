import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteUserAction,
  getUsersAction,
} from "src/store/actions/UserActions";
import userInstance from "src/services/userInstance";

export default function Read(props) {
  const dispatch = useDispatch();
  const [apiData, setApiData] = useState([]);

  useEffect(async () => {
    await userInstance.get("crud").then((getData) => setApiData(getData.data));
  }, []);

  
  const onDelete = (id) => {
    dispatch(deleteUserAction(id, props.history));
  };

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>TEXTINPUT</Table.HeaderCell>
            <Table.HeaderCell>TEXTAREA</Table.HeaderCell>
            <Table.HeaderCell>RADIOGROUP</Table.HeaderCell>
            <Table.HeaderCell>SELECT</Table.HeaderCell>
            <Table.HeaderCell>CHECKBOXGROUP</Table.HeaderCell>
            <Table.HeaderCell>MYFILE</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {apiData.map((data) => {
            return (
              <Table.Row key={data.id}>
                <Table.Cell>{data.id}</Table.Cell>
                <Table.Cell>{data.textInput}</Table.Cell>
                <Table.Cell>{data.textarea}</Table.Cell>
                <Table.Cell>{data.radioGroup}</Table.Cell>
                <Table.Cell>{data.select}</Table.Cell>
                <Table.Cell>{data.checkboxGroup}</Table.Cell>
                <Table.Cell>{data.myfile}</Table.Cell>

                <Table.Cell>
                  <Link to={`/theme/post/update/${data.id}`}>
                    <Button
                      color="green"
                      
                    >
                      Update
                    </Button>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Button color="red" onClick={() => onDelete(data.id)}>
                    Delete
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button color="blue">
                    <NavLink to={`/theme/post/view/${data.id}`}>View</NavLink>
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
