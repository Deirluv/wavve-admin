import {Admin, Resource} from "react-admin";
import {dataProvider} from "@/app/dataProvider";
import {UsersCreate, UsersEdit, UsersList} from "@/app/resources/users";
import {SongsList} from "@/app/resources/songs";
import {GenresList} from "@/app/resources/genres";
import {CommentsList} from "@/app/resources/comments";
import {AnalyticsList} from "@/app/resources/analytics";
import {ReportsList} from "@/app/resources/reports";

export default function AdminApp() {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource name="users" list={UsersList} edit={UsersEdit} create={UsersCreate} />
            <Resource name="songs" list={SongsList} />
            <Resource name="genres" list={GenresList} />
            <Resource name="comments" list={CommentsList} />
            <Resource name="analytics" list={AnalyticsList} />
            <Resource name="reports" list={ReportsList} />
        </Admin>
    );
}