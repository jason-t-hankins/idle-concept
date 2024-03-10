function Container() {
    var petName = 'jj';//getParameterByName('name');
    document.title = petName;

    const [talk, setTalk] = useState("successfully logged in, " + petName + " Welcome!");

    const newTalk = (from, message) => {
    setTalk(talk + '\n' + from + ': ' + message)
    }

    const getTalk = () => {
    return talk
    }
}