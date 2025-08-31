import {Admin, LoginWithEmail, Resource} from "react-admin";
import {dataProvider} from "@/app/dataProvider";
import {UsersList} from "@/app/resources/users";
import {SongsList} from "@/app/resources/songs";
import {GenresList} from "@/app/resources/genres";
import {CommentsList} from "@/app/resources/comments";
import {AnalyticsList} from "@/app/resources/analytics";
import {ReportsList} from "@/app/resources/reports";
import {authProvider} from "@/app/authProvider";

export default function AdminApp() {
    return (
        <Admin loginPage={LoginWithEmail} authProvider={authProvider} dataProvider={dataProvider}>
            <Resource name="users" list={UsersList}/>
            {/*Error here ^^^*/}



            {/*// not implemented yet*/}
            {/*<Resource name="songs" list={SongsList} />*/}
            {/*<Resource name="genres" list={GenresList} />*/}
            {/*<Resource name="comments" list={CommentsList} />*/}
            {/*<Resource name="analytics" list={AnalyticsList} />*/}
            {/*<Resource name="reports" list={ReportsList} />*/}
        </Admin>
    );
}