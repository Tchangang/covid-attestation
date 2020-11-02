import getDateAndHour from "./getDateAndHour";

export default ({
                    firstname,
                    lastname,
                    birthDate,
                    birthPlace,
                    address,
                    city,
                    postalCode,
                    date,
                    hour,
                    motif,
}) => `Cree le: ${getDateAndHour().date} a ${getDateAndHour().date};\n Nom: ${lastname};\n Prenom: ${firstname};\n Naissance: ${birthDate} a ${birthPlace};\n Adresse: ${address} ${postalCode} ${city};\n Sortie: ${date} a ${hour};\n Motifs: ${motif}`
