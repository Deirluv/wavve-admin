import {Admin, LoginWithEmail, Resource} from "react-admin";
import {dataProvider} from "@/app/dataProvider";
import {UsersCreate, UsersEdit, UsersList} from "@/app/resources/users";
import {TracksList, TracksEdit, TracksCreate} from "@/app/resources/tracks";
import {GenresList, GenresEdit, GenresCreate} from "@/app/resources/genres";
import {authProvider} from "@/app/authProvider";

export default function AdminApp() {
    return (
        <Admin loginPage={LoginWithEmail} authProvider={authProvider} dataProvider={dataProvider}>
            <Resource name="users" list={UsersList} edit={UsersEdit} create={UsersCreate}/>
            <Resource name="tracks" list={TracksList} edit={TracksEdit} create={TracksCreate}/>
            <Resource name="genres" list={GenresList} edit={GenresEdit} create={GenresCreate}/>
        </Admin>
    );
}