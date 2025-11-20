import {
    List,
    DataTable,
    BulkDeleteButton,
    Edit,
    SimpleForm, TextInput, Create
} from "react-admin";

const UserBulkActions = () => (
    <BulkDeleteButton mutationMode="pessimistic" />
);

export const GenresList = () => (
    <List>
        <DataTable rowClick="edit" bulkActionButtons={<UserBulkActions />}>
            <DataTable.Col source="id" />
            <DataTable.Col source="name" />
            <DataTable.Col source="trackCount" />
        </DataTable>
    </List>
);

export const GenresEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const GenresCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);