function WeatherIncident(props)
{
    console.log(props.sortedIncident.childNodes)

    props.sortedIncident.childNodes.forEach(element => {
        console.log(element.innerHTML)
    });
    

    return (
        <p> {"hello"}</p>
    )
}

export default WeatherIncident;