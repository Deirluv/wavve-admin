import {
    List,
    DataTable,
    BulkDeleteButton,
    Edit,
    SimpleForm,
    TextInput,
    UrlField,
    Create,
    FileInput,
    ReferenceInput,
    SelectInput,
    NumberInput,
    FileField,
    NumberField,
    ReferenceField,
    TextField,
    ImageField
} from "react-admin";

const UserBulkActions = () => (
    <BulkDeleteButton mutationMode="pessimistic" />
);

const GenreReferenceInput = () => (
    <ReferenceInput
        source="genreId"
        reference="genres"
        label="Genre"
    >
        <SelectInput optionText="name" />
    </ReferenceInput>
);

export const TracksList = () => (
    <List>
        <DataTable rowClick="edit" bulkActionButtons={<UserBulkActions />}>
            <DataTable.Col source="id" />
            <DataTable.Col source="title" />
            <DataTable.Col source="description" />
            <DataTable.Col source="duration" label="Duration (s)" />
            <DataTable.Col label="Genre">
                <ReferenceField
                    source="genreId"
                    reference="genres"
                    label="Genre"
                >
                    <TextField source="name" />
                </ReferenceField>
            </DataTable.Col>
            <DataTable.Col source="fileUrl" label="File Url" />
            <DataTable.Col label="Preview">
                <ImageField source="previewUrl" title="Preview" />
            </DataTable.Col>
        </DataTable>
    </List>
);

export const TracksEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" />

            <GenreReferenceInput />
        </SimpleForm>
    </Edit>
);


export const TracksCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" />
            <NumberInput source="duration" />

            <GenreReferenceInput />

            <FileInput source="File" label="Track File (Required)">
                <FileField source="src" title="filename" />
            </FileInput>

            <FileInput source="Preview" label="Preview Image (Optional)">
                <FileField source="src" title="filename" />
            </FileInput>
        </SimpleForm>
    </Create>
);