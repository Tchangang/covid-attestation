import React from "react";

const DetailLine = ({
    label,
    content,
                    }) => (
    <div className={"peopleDetailsLine"}>
        <div className={"peopleDetailsLabel"}>{label}</div>
        <div className={"peopleDetailsContent"}>{content}</div>
    </div>
);

export default ({
                    firstname,
                    lastname,
                    birthDate,
                    birthPlace,
                    address,
                    postalCode,
                    city,
                    onEdit,
                    onDelete,
                    onCancel
                }) => (
    <div className="peopleDetails">
        <button className="back" onClick={onCancel}>
            Retour à l'accueil
        </button>
        <div className={"peopleDetailsLineContainer"}>
            <DetailLine label={'Nom et prénom(s)'} content={`${firstname} ${lastname}`} />
            <DetailLine label={'Date de naissance'} content={`${birthDate}`} />
            <DetailLine label={'Lieu de naissance'} content={`${birthPlace}`} />
            <DetailLine label={'Adresse'} content={`${address}, ${city}, ${postalCode}`} />
        </div>
        <button className="edit" onClick={onEdit} style={{ marginRight: 20 }}>
            Modifier
        </button>
        <button className="delete" onClick={onDelete}>
            Supprimer
        </button>
    </div>
);
