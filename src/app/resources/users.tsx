import { List, DataTable, Edit, SimpleForm, TextInput, Create, ImageField, EditButton, ImageInput, PasswordInput, BulkDeleteButton } from "react-admin";

const UserBulkActions = () => (
    <BulkDeleteButton mutationMode="pessimistic" />
);

export const UsersList = () => (
    <List>
        <DataTable rowClick="edit" bulkActionButtons={<UserBulkActions />}>
            <DataTable.Col source="id"/>
            <DataTable.Col source="userName" />
            <DataTable.Col source="email" />
            <DataTable.Col label="Avatar">
                <ImageField source="avatarUrl" title="Avatar" />
            </DataTable.Col>
            <DataTable.Col source="bio" />
        </DataTable>
    </List>
);

export const UsersEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="userName" />
            <TextInput source="bio" />
            <ImageInput source="avatarUrl" />
        </SimpleForm>
    </Edit>
);

export const UsersCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="email" />
            <TextInput source="userName" />
            <PasswordInput source="password" />
            <PasswordInput source="confirmPassword" />
        </SimpleForm>
    </Create>
);