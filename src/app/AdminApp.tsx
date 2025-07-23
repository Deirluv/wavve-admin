import {Admin, Resource} from "react-admin";
import {dataProvider} from "@/app/dataProvider";
import {ToDoList} from "@/app/resources/todos";

export default function AdminApp() {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource name="todos" list={ToDoList} />
            <Resource name="posts" list={ToDoList} />
        </Admin>
    );
}