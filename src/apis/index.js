import shortid from 'shortid';

const listPeople = () => {
    try {
        const people = (localStorage.getItem('people'));
        return JSON.parse(people || '[]');
    } catch (e) {
        return [];
    }
}
const savePeople = (peopleItem) => {
    if (!peopleItem.id) {
        peopleItem.id = shortid.generate();
    }
    const people = listPeople();
    const [found] = people.filter(peopleInList => peopleInList.id === peopleItem.id);
    if (!found) {
        people.push(peopleItem);
        localStorage.setItem('people', JSON.stringify(people));
        return;
    }
    const newPeople = listPeople().map((peopleInList) => {
        if (peopleInList.id === peopleItem.id) {
            return peopleItem;
        }
        return peopleInList;
    });
    localStorage.setItem('people', JSON.stringify(newPeople));
}
const deletePeople = (peopleItemId) => {
    const people = listPeople();
    const peopleFiltered = people.filter(peopleInList => peopleInList.id !== peopleItemId);
    localStorage.setItem('people', JSON.stringify(peopleFiltered));
}
export default {
    savePeople,
    listPeople,
    deletePeople,
}