import React, { useState } from 'react';
import shortid from 'shortid';
import PeopleDetails from "./PeopleDetails";

const PeopleItem = ({
    people,
    onClick,
}) => (
    <div role="presentation" className="peopleItemInList" onClick={onClick}>
        <div className={"name"}>{people.firstname} {people.lastname}</div>
        <div className={"address"}>{people.address}</div>
    </div>
)
export default ({
    list,
    onEdit,
    onDelete,
}) => {
    const [details, setDetails] = useState(null);
    return (
        <>
        {
            details ? (
                <PeopleDetails
                    onCancel={() => setDetails(null)}
                    onEdit={() => onEdit(details)}
                    onDelete={() => onDelete(details)}
                    {...details}
                />
            ) : (
                <div className="peopleListContainer">
                    {
                        list.map(people => (
                           <PeopleItem key={shortid.generate()} people={people} onClick={() => setDetails(people)} />
                        ))
                    }
                </div>
            )
        }
        </>
    )
}