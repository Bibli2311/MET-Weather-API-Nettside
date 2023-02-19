function WeatherIncident(props)
{
    let pTags = []
    //convert props.sortedIncidents into an array
    let apiData = Array.from(props.sortedIncident.childNodes)

    apiData.forEach((htmlElement) => 
    {
        if (htmlElement.innerHTML != undefined)
        {
            pTags.push(htmlElement.innerHTML)
        }
    })

    let htmlList = pTags.map((text, index) =>
        {
            return <p key={index}>{text}</p>
        })

    return (
        <>
        {htmlList}</>
    )
}

export default WeatherIncident;