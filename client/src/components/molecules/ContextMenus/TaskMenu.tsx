import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useAppDispatch } from "../../../app/hooks";

import { setWorkingTasks, WorkingTasksInterface } from "../../../features/user/userSlice";

import Button from '../../atoms/Button';

interface ITaskMenu {
    teamId: string | undefined;
    projectId: string | undefined;
    kanbanId: string | undefined;
    taskId: string | undefined;
    tasks: WorkingTasksInterface[];
}

const setWorkingStatusMutation = gql`
    mutation setWorkingStatus($teamId: String!, $projectId: String!, $kanbanId: String!, $taskId: String!) {
        setWorkingStatus(teamId: $teamId, projectId: $projectId, kanbanId: $kanbanId, taskId: $taskId) {
            id
			name
			stage
			projectName
        }
    }
`

const TaskMenu = ({ teamId, projectId, kanbanId, taskId, tasks }: ITaskMenu) => {
    const dispatch = useAppDispatch();
    const [ isAlreadyWorking, setIsAlreadyWorking ] = useState<boolean | null>(null);
    const [ setWorkingStatus, {loading } ] = useMutation(setWorkingStatusMutation, {
        onCompleted: data => {
            alert('done');
            dispatch(setWorkingTasks(data.setWorkingStatus));
        }
    });

    const handleSetWorkingStatusClick = () => {
        if (!loading) {
            setWorkingStatus({
                variables: {
                    teamId,
                    projectId,
                    kanbanId,
                    taskId
                }
            })
        }
    }

    useEffect(() => {
        const foundTask = tasks.find(task => task.id === taskId);

        setIsAlreadyWorking(Boolean(foundTask));
    }, [taskId, tasks]);

    if (isAlreadyWorking === null) return <></>

    return (
        <>
            <Button size="small" onClick={handleSetWorkingStatusClick} text={isAlreadyWorking ? "I'm not working on it" : "I'm working on it"} />
        </>
    );
};

export default TaskMenu;