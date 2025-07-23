import { List, DataTable, EmailField } from "react-admin";

export const ToDoList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="userId" />
            <DataTable.Col source="id" />
            <DataTable.Col source="title" />
            <DataTable.Col source="completed" />
        </DataTable>
    </List>
);